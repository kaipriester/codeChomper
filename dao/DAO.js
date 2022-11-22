const { PYErrorList } = require("../models/PYErrorTypes.js");

const User = require("../models/User.js").Model;
const Student = require("../models/Student.js").Model;
const ZipFile = require("../models/ZipFile.js").Model;
const File = require("../models/File.js").Model;
const Error = require("../models/JSError.js").Model;
const ErrorList = require("../models/ErrorTypes.js").ErrorList;
const PYError = require("../models/PYError.js").Model;


exports.getUser = async (username) =>
{
	return User.findOne({ Username: username, googleId: null, facebookId: null }).exec();
};

exports.getStudent = async (id) => {
	return Student.find();
};

exports.findFacebookUser = async (id) => {
	return User.findOne({facebookId: id});
};

exports.findGoogleUser = async (id) => {
	return User.findOne({googleId: id});
};

exports.getUserById = async (id) => {
	return User.findById(id);
};

exports.addFacebookUser = async (id, name) => {
	return await User.create({ Username: name, facebookId: id, Admin: false });
};

exports.addGoogleUser = async (id, name) => {
	return await User.create({ Username: name, googleId: id, Admin: false });
};

exports.getFile = async (id) => {
	return File.find()
		.lean()
			.populate({
				path: "Errors", 
				model: "Error"
			});
};

exports.addUser = async (Username, Hash, Admin) =>
{
	if (Admin)
	{
		return await User.create({ Username: Username, Hash: Hash, Admin: true });
	}
	else
	{
		return await User.create({ Username: Username, Hash: Hash, Admin: false });
	}
};
exports.addStudent = async (Name, ZipFolderID) => {
	return await Student.create({ Name, ZipFolderID, Files: [] });
};
exports.addZipFile = async (Name, Date, Owner, FileCount) => {
	return await ZipFile.create({ Name, Date, Owner, FileCount });
};

exports.addError = async (
	ErrorType,
	RuleID,
	Severity,
	Message,
	Line,
	Column,
	NodeType,
	MessageId,
	EndLine,
	EndColumn
) => {
	const error = await Error.create({
		ErrorType,
		Severity,
		Message,
		Line,
		Column,
		NodeType,
		MessageId,
		EndLine,
		EndColumn
	});
	return error._id;
};

exports.addPYError = async (
	ErrorType,
	Severity,
	Filename,
	Message,
	Confidence,
	SeverityText,
	CweLink,
	LineNumber,
	LineRange,
	TestName,
	TestID
) => {
	const PYerror = await PYError.create({
		ErrorType,
		Severity,
		Filename,
		Message,
		Confidence,
		SeverityText,
		CweLink,
		LineNumber,
		LineRange,
		TestName,
		TestID
	});
	return PYerror._id;
};


exports.addFile = async (
	Name,
	ErrorCount,
	FatalErrorCount,
	WarningCount,
	FixableErrorCount,
	FixableWarningCount,
	Source,
	Errors,
	PyErrors,
	SeverityScore,
	isPyFile
) => {
	return await File.create({
		Name,
		ErrorCount,
		FatalErrorCount,
		WarningCount,
		FixableErrorCount,
		FixableWarningCount,
		Source,
		Errors,
		PyErrors,
		SeverityScore,
		isPyFile
	});
};

exports.addFileToStudent = async (StudentId, FileID) => {
	// (await ZipFile.findById(StudentId)).Files.push(FileID).save();

	return await Student.updateOne(
		{ _id: StudentId },
		{
			$push: {
				Files: FileID,
			}
		}
	);
};
exports.addStudentsToZipFile = async (ZipFileId, Students) => {
	//https://docs.mongodb.com/mongodb-shell/crud/update/
	return await ZipFile.updateOne(
		{ _id: ZipFileId },
		{
			$set: {
				Students: Students,
			}
		}
	);
};

exports.updateZipFile = async (ZipFileID, ErrorCount, SeverityScore) => {
	await ZipFile.findById(ZipFileID).updateOne({ ErrorCount, SeverityScore });
};

exports.updateStudent = async (StudentID, SeverityScore) => {
	await Student.findById(StudentID).updateOne({ SeverityScore });
};

exports.getZipFile = async (id) => {
	const zipFile = await ZipFile.findById(id)
		.lean()
		.populate({
			path: "Students",
			populate: {
				path: "Files",
				model: "File",
				populate: [
					{ path: "Errors", model: "Error" }, 
					{ path: "PyErrors", model: "PYError" }
				]
			}
		});

	zipFile.Students.forEach((student, i) => {
		student.Files.forEach((file, j) => {
			if (file.Errors) {
				file.Errors.forEach((error, k) => {
					const updatedError = {
						ErrorType: ErrorList[error["ErrorType"]],
						Line: error.Line,
						Column: error.Column,
						NodeType: error.NodeType,
						MessageId: error.MessageId,
						EndLine: error.EndLine,
						EndColumn: error.EndColumn,
					};
					zipFile.Students[i].Files[j].Errors[k] = updatedError;
				});
			}
			if (file.PyErrors) {
				file.PyErrors.forEach((error, k) => {
					const updatedError = {
						ErrorType: PYErrorList[error["ErrorType"]],
						Line: error.LineNumber,
						Message: error.Message
					};
					zipFile.Students[i].Files[j].PyErrors[k] = updatedError;
				});
			}
		});
	});
	return zipFile;
};

exports.getZipFileRaw = async (id) => {
	return (await ZipFile.findById(id)
		.lean()
		.populate({
			path: "Students",
			populate: {
				path: "Files",
				model: "File",
				populate: { path: "Errors", model: "Error" },
			}
		}));
};

exports.getZipFiles = async (owner) =>
{
	if (owner)
	{
		return await ZipFile.find({Owner: owner}).exec();
	}
	else
	{
		return await ZipFile.find({}).exec();
	}
};
exports.getAllStudentFiles = async () => {
	return await Student.find({}).exec();
};
exports.deleteZipFolder= async (zipFolderID) => {
	console.log("database deleter here!");

	//const zFile = await ZipFile.findById(zipFolderID);
	//console.log(zFile);
		const zipFile = await ZipFile.findById(zipFolderID).lean().populate({
		path: "Students",
		populate: {
			path: "Files",
			model: "File",
			populate: { 
				path: "Errors", 
				model: "Error" ,

				path: "PyErrors",
				model: "PYError"
			},
		}
	});
	zipFile.Students.forEach((student, i) => {
		student.Files.forEach((file, j) => {
			if(file.isPyFile){
				file.PyErrors.forEach((err, k) => {
					PYError.deleteOne({id: err._id}).exec();
				});
			}
			else{
				file.Errors.forEach((error, k) => {
               	 	Error.deleteOne({id: error._id}).exec();
				});
			}
			File.deleteOne({id: file._id}).exec();
		});
		Student.deleteOne({id: student._id}).exec();
	});
	ZipFile.deleteOne({id: zipFile._id}).exec();	
	console.log("database deleter: I deleted everything I am out Peace")
};
exports.clearDatabase= async () => {
	ZipFile.deleteMany({}, callback)
	Student.deleteMany({}, callback)
	File.deleteMany({}, callback)
	Error.deleteMany({}, callback)
};