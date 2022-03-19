const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const AdmZip = require("adm-zip");
const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");
const { ESLint } = require("eslint");

const database = require("./Database/Database.js");
const DAO = require("./dao/DAO.js");
const convertErrorIDToType =
	require("./models/ErrorTypes.js").convertRuleIDToErrorType;

const app = express();
const port = 8080;

const corsOptions = {
	origin: "*",
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

database.connect();

function getStudentIDFromRelPath(path) {
	var cut = path.indexOf("_");
	if (cut != -1) {
		cut = cut > path.indexOf("/") ? path.indexOf("/") : path.indexOf(">");
	} else {
		cut = path.indexOf("/");
	}

	return path.substring(0, cut);
}

app.post("/upload", async (req, res) => {
	const zipFile = req.files.file;
	const zipFileName = zipFile.name;

	// submitted file must be a zip or error is thrown
	if (String(zipFile.mimetype) != "application/zip") {
		return res.status(400).json("Error: not zip file");
	}

	const fileLocation = `${"testFiles/"}${zipFileName}`;

	//make a folder called extracted
	if (!fs.existsSync("extracted")) {
		fs.mkdirSync("extracted");
	}

	//extract files into this folder
	zipFile.mv(fileLocation, async (err) => {
		// extract all student submissions from main zip file
		const zipExtractor = new AdmZip(fileLocation);
		zipExtractor.extractAllTo("./extracted", true);

		// extract from any nested zip files
		const fileNamesInZipFolder = fs.readdirSync("./extracted");
		const studentNames = new Set();

		console.log(fileNamesInZipFolder);
		fileNamesInZipFolder.forEach((file) => {
			const currentStudentName = file.substring(0, file.indexOf("_"));

			// Make sure its not empty before adding it to Hashset, The Set prevents repeats
			if (currentStudentName) {
				studentNames.add(currentStudentName);
			}

			console.log(
				`${currentStudentName} for file ${file} extension ${path.extname(
					file
				)}`
			);
			// Zip folders within the zip folder
			if (path.extname(file) == ".zip") {
				console.log(`     - unzipping ${file}`);
				const innerZipFileExtractor = new AdmZip("./extracted/" + file);
				innerZipFileExtractor.extractAllTo(
					"./extracted/" + file.substring(0, file.indexOf("_")),
					true
				);
				fsExtra.remove("./extracted/" + file);
			}
		});

		// Setup ESLINT and run them on all the files in this folder.
		const eslint = new ESLint();
		const results = await eslint.lintFiles(["./extracted/**/*.js"]);

		const zipFileRecord = await DAO.addZipFile(
			zipFileName,
			results.length,
			new Date()
		);

		// [1,2,3] => [10, 12, 13]
		// ['widlcomes', 'asdsad', '123'] => [12323, 12321, 123123]

		// map
		const studentIDsByName = new Map();
		studentNames.forEach((studentName) =>
			studentIDsByName.set(
				studentName,
				DAO.addStudent(studentName, zipFileRecord._id)
			)
		);

		console.log(studentNames);
		results.forEach((result) => {
			const relativePath = getRelativePath(result.filePath);

			const errors = result.messages.map((message) =>
				DAO.addError(
					convertErrorIDToType(message.ruleId),
					message.severity,
					message.message,
					message.line,
					message.column,
					message.nodeType,
					message.messageId,
					message.endLine,
					message.endColumn
				)
			);
			const file = DAO.addFile(
				relativePath,
				result.errorCount,
				result.fatalErrorCount,
				result.warningCount,
				result.fixableErrorCount,
				result.fixableWarningCount,
				result.source,
				errors
			);

			// getStudentObjectId(relativePath) // estradapablo/project/noCaller.js
			DAO.addFilesToStudent(
				getStudentIDFromRelPath(relativePath),
				file._id
			);
		});

		// console.log(JSON.stringify(results[0]));

		const responseData = results.map((result) => ({
			filePath: result.filePath.substring(
				result.filePath.lastIndexOf("/") + 1
			),
			errorCount: result.errorCount,
			messages: result.messages,
		}));

		// AARON INSERTS INTO DATABASE DAO.updateStudent(info);

		fsExtra.emptyDirSync("./extracted");
		res.json(responseData);
	});
});

// overview page- return all uploaded zip files
app.get("/overview/zipfiles", async (req, res) => {
	const response = {
		graphData: DAO.getAllZipFiles(),
		zipFileData: DAO.getAllZipFiles(),
	};
	return response;

	// also return information to build graphs- GRACE working on it!!
	// grace has ~ideas~

	// return: zip file name, date uploaded, number of files, detections, security scores
});

// overview page- view more data fom invidual zip files
app.get("/overview/studentfiles", async (req, res) => {});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

const getRelativePath = async (absolutePath) => {
	const extractedFolderName = "extracted/";
	return absolutePath.substring(
		absolutePath.indexOf(extractedFolderName) + extractedFolderName.length
	);
};
