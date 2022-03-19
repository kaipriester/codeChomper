const Student = require("../models/Student.js").Model;
const ZipFile = require("../models/ZipFile.js").Model;
const File = require("../models/File.js").Model;
const Error = require("../models/Error.js").Model;

exports.getStudent = async (id) => {
	return Student.find();
};
exports.getZipFile = async (id) => {
	return ZipFile.find();
};
exports.getFile = async (id) => {
	return File.find();
};
exports.addStudent = async (Name, ZipFolderID) => {
	return await Student.create({ Name, ZipFolderID, Files: [] })._id;
};
exports.addZipFile = async (Name, Date, FileCount) => {
	return await ZipFile.create({ Name, Date, FileCount });
};

exports.addError = async (
	ErrorType,
	RuleId,
	Severity,
	Message,
	Line,
	Column,
	NodeType,
	MessageId,
	EndLine,
	EndColumn
) => {
	return await Error.create({
		ErrorType,
		RuleId,
		Severity,
		Message,
		Line,
		Column,
		NodeType,
		MessageId,
		EndLine,
		EndColumn,
	})._id;
};

exports.addFile = async (
	Name,
	ErrorCount,
	FatalErrorCount,
	WarningCount,
	FixableErrorCount,
	FixableWarningCount,
	Source,
	Errors
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
	})._id;
};

exports.addFileToStudent = async (StudentId, FileID) => {
	// (await ZipFile.findById(StudentId)).Files.push(FileID).save();

	return await ZipFile.updateOne(
		{ _id: { StudentId } },
		{
			$push: {
				Files: { FileID },
			},
		}
	);
};
exports.addStudentsToZipFile = async (ZipFileId, Students) => {
	//https://docs.mongodb.com/mongodb-shell/crud/update/
	return await ZipFile.updateOne(
		{ _id: { ZipFileId } },
		{
			$set: {
				Students: { Students },
			},
		}
	);
};
exports.getAllZipFiles = async () => {
	return ZipFile.find({});
};
