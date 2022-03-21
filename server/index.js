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

function getStudentIDFromRelPath(path, map) {
	var cut = path.indexOf("_");
	var cut2 = path.indexOf("/");
	if (cut == -1) {
		cut = path.indexOf("/");
	} else if (cut2 == -1) {
		cut = path.indexOf("_");
	} else {
		cut = Math.min(cut, cut2);
	}
	return map.get(path.substring(0, cut));
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
			new Date(),
			results.length
		);

		const studentIDsByName = new Map();
		await Promise.all(
			[...studentNames].map(async (studentName) =>
				studentIDsByName.set(
					studentName,
					(
						await DAO.addStudent(studentName, zipFileRecord._id)
					)._id
				)
			)
		);

		results.forEach(async (result) => {
			const relativePath = getRelativePath(result.filePath);

			const errors = await Promise.all(
				result.messages.map((message) =>
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
				)
			);
			const fileRecord = await DAO.addFile(
				relativePath,
				result.errorCount,
				result.fatalErrorCount,
				result.warningCount,
				result.fixableErrorCount,
				result.fixableWarningCount,
				result.source,
				errors
			);
			DAO.addFileToStudent(
				getStudentIDFromRelPath(relativePath, studentIDsByName),
				fileRecord._id
			);
		});

		await DAO.addStudentsToZipFile(
			zipFileRecord._id,
			Array.from(studentIDsByName.values())
		);
		await DAO.updateZipFile(zipFileRecord._id, results.length, 2);

		const responseData = results.map((result) => ({
			filePath: result.filePath.substring(
				result.filePath.lastIndexOf("/") + 1
			),
			errorCount: result.errorCount,
			messages: result.messages,
		}));

		fsExtra.emptyDirSync("./extracted");
		res.json(responseData);
	});
});

// overview page- return all uploaded zip files
app.get("/overview/zipfiles", async (req, res) => {
	const response = {
		graphData: {}, //TODO
		zipFileData: await DAO.getAllZipFiles(),
	};
	res.json(response);

	// also return information to build graphs- GRACE working on it!!
	// grace has ~ideas~

	// return: zip file name, date uploaded, number of files, detections, security scores
});

// overview page- view more data fom invidual zip files
app.get("/studentfiles", async (req, res) => {
	res.json(await DAO.getZipFile(req.query.id));
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

const getRelativePath = (absolutePath) => {
	const extractedFolderName = "extracted/";
	return absolutePath.substring(
		absolutePath.indexOf(extractedFolderName) + extractedFolderName.length
	);
};
