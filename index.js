require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const bcrypt = require("bcrypt");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const AdmZip = require("adm-zip");
const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");
const { ESLint } = require("eslint");
const database = require("./database/database.js");
const DAO = require("./dao/DAO.js");
const convertErrorIDToType = require("./models/ErrorTypes.js").convertRuleIDToErrorType;
const ErrorTypes = require("./models/ErrorTypes.js").ErrorList;
const ErrorTypeDetail = require("./models/ErrorTypes.js");

const app = express();
const port = process.env.PORT;
const reactPort = 3000;
const origin = new RegExp(("^https?://[0-9a-z+\\-*/=~_#@$&%()[\\]',;.?!]+:" + reactPort + "$"), "i");
const saltRounds = 12;

const corsOptions = {
	origin: origin,
	optionsSuccessStatus: 200,
	credentials: true
};

const Bandit = require("./bandit/pythonShell.js");

app.use(cors(corsOptions));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	store: mongoStore.create({
		mongoUrl: database.uri,
		mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
		crypto: { secret: process.env.SESSION_STORE_SECRET},
		autoRemove: "native",
		ttl: (60 * 60 * 24 * 7)})
	})
);
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "client", "build")));

database.connect();

(async () =>
{
	const user = await DAO.getUser(process.env.MASTER_USERNAME);
	if (!user)
	{
		const salt = await bcrypt.genSalt(saltRounds);
		const hash = await bcrypt.hash(process.env.MASTER_PASSWORD, salt);
		await DAO.addUser(process.env.MASTER_USERNAME, hash);
		console.log("Registered master account.");
	}
	delete process.env.MASTER_USERNAME;
	delete process.env.MASTER_PASSWORD;
})();

//takes the string of the filepath from canvas and extracts the students name from it
function getStudentIDFromRelPath(target, map) {
	var cut = target.indexOf("_");
	var cut2 = target.indexOf(path.sep);
	if (cut == -1) {
		cut = target.indexOf(path.sep);
	} else if (cut2 == -1) {
		cut = target.indexOf("_");
	} else {
		cut = Math.min(cut, cut2);
	}
	return map.get(target.substring(0, cut));
}

//@param if count is -1 then we will not factor in a dynamic quantity into the severity score
//This function calculates the severity score, we get the 3 largest severity score values average them out and give it a 75% weight, we further give a 25% weight to quantity of Errors/total elements
function getSeverityScore(severityScores, count) {
	severityScores = severityScores.filter((num) => num != 0);
	severityScores.sort();
	severityScores.reverse();
	a = 1;
	b = 1;
	c = 1;
	if (severityScores.length > 0) {
		a = Math.max(severityScores[0], a);
	}
	if (severityScores.length > 1) {
		b = Math.max(severityScores[1], b);
	}
	if (severityScores.length > 2) {
		c = Math.max(severityScores[2], c);
	}
	b = a;
	c = a;
	if (count != -1) {
		quantity = 20 * (severityScores.length / count);
		return Math.ceil(
			//may be length or size or both who knows until we test //TODO TEST THIS
			((a + b + c) / 3) * 0.75 + severityScores.length * 0.25
		);
	}
	quantity = severityScores.length + 1;
	if (quantity > 10) {
		quantity = 10;
	}
	return Math.ceil(((a + b + c) / 3) * 0.75 + quantity * 0.25);
}

function getSeverityScoreStudent(severityScores, count) {
	severityScores = severityScores.filter((num) => num != 0);
	severityScores.sort();
	severityScores.reverse();
	a = 1;
	b = 1;
	c = 1;
	if (severityScores.length > 0) {
		a = Math.max(severityScores[0], a);
	}
	if (severityScores.length > 1) {
		b = Math.max(severityScores[1], b);
	}
	if (severityScores.length > 2) {
		c = Math.max(severityScores[2], c);
	}
	if (count != -1) {
		quantity = 20 * (severityScores.length / count);
		return Math.ceil(
			//may be length or size or both who knows until we test //TODO TEST THIS
			((a + b + c) / 3) * 0.75 + severityScores.length * 0.25
		);
	}
	quantity = severityScores.length + 1;
	if (quantity > 10) {
		quantity = 10;
	}
	return Math.ceil(((a + b + c) / 3) * 0.75 + quantity * 0.25);
}

function throughDirectory(__dirname) {
	function* walkSync(dir) {
		const files = fs.readdirSync(dir, { withFileTypes: true });
		for (const file of files) {
			if (file.isDirectory()) {
				yield* walkSync(path.join(dir, file.name));
			} else {
				yield path.join(dir, file.name);
			}
		}
	}

	const files = [];
	for (const filePath of walkSync(__dirname)) {
		files.push(filePath);
	}
	return files.filter((file) => path.extname(file) !== ".zip");
}

function median(values) {
	if (values.length === 0) throw new Error("No inputs");

	values.sort(function (a, b) {
		return a - b;
	});

	var half = Math.floor(values.length / 2);

	if (values.length % 2) return values[half];

	return (values[half - 1] + values[half]) / 2.0;
}
app.delete("/deleteZipFolder", async (req, res) => {
	console.log("I am deleting")
	if (!req.session.loggedIn) {
		res.json(false);
		return;
	}
	console.log(`Deleting:Password confirmed, id is ${req.query.id}`)
	DAO.deleteZipFolder(req.query.id);
	console.log("Deleting:I am done deleting")
});

app.delete("/deleteAll", async (req, res) => {
    console.log("DELET ALL")
	if (!req.session.loggedIn) {
		res.json(false);
		return;
	}
	DAO.clearDatabase();

});
//This function is performed when someone uploads a zipfolder to our backend
app.post("/upload", async (req, res) => {
	if (!req.session.loggedIn) {
		res.status(200).json(false);
		return;
	}
	const zipFile = req.files.file;
	const zipFileName = zipFile.name;

	// submitted file must be a zip or error is thrown
	if (zipFileName.substring(zipFileName.length - 4) !== ".zip") {
		return res.status(400).json("Error: Not a zip file");
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
			console.log(
				`$$$$$$$####### current username ${currentStudentName} for ${file}`
			);
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
				console.log(`     - unzipping ^^^ ${file}`);
				const innerZipFileExtractor = new AdmZip("./extracted/" + file);
				innerZipFileExtractor.extractAllTo(
					"./extracted/" + file.substring(0, file.indexOf("_")),
					true
				);
				fsExtra.remove("./extracted/" + file);
			}
		});

		const hasPyFiles = (element) => {
			if(path.extname(element) == ".py") return true;
			else return false;
		}

		if(fileNamesInZipFolder.some(hasPyFiles)){
			// there is at least 1 py file in the zipfile uploaded
			console.log("inside .py only code section");
			
			let mytest = await Bandit.runBandit("./extracted/", true);
			console.log("my childs output is: ");
			console.log(mytest);

			//clear out the dir
			fsExtra.emptyDirSync("./extracted");
			res.json({});
		}
else{
		// Setup ESLINT and run them on all the files in this folder.
		const eslint = new ESLint();
		const results = await eslint.lintFiles(["./extracted/**/*.js"]);

		// fileNamesInZipFolder
		console.log(throughDirectory("./extracted"));
		console.log(results.map((result) => getRelativePath(result.filePath)));
		const zipFileRecord = await DAO.addZipFile(
			zipFileName,
			new Date(),
			results.length
		);

		// This map is used to link student IDs with student names
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

		// This map is used to keep the scores of each student in an array
		const listOfSeverityScoreFilesOwnedByStudents = new Map();
		studentIDsByName.forEach((value, key) => {
			listOfSeverityScoreFilesOwnedByStudents.set(value, []);
		});

		//Go tThrough ESlint detected errors
		await Promise.all(
			results.map(async (result) => {
				const relativePath = getRelativePath(result.filePath);
				const severityScores = [];

				//add Errors to database
				const errors = await Promise.all(
					result.messages.map((message) => {
						const currentErrorType = convertErrorIDToType(
							message.ruleId
						);
						console.log(
							`error ${JSON.stringify(
								ErrorTypes[currentErrorType]
							)} for ${relativePath}`
						);
						severityScores.push(
							ErrorTypes[currentErrorType]["Severity"]
						);
						return DAO.addError(
							currentErrorType,
							message.ruleId,
							message.severity,
							message.message,
							message.line,
							message.column,
							message.nodeType,
							message.messageId,
							message.endLine,
							message.endColumn
						);
					})
				);

				//TODO TEST THIS FUNCTION
				//gets the severity score of current file
				console.log(`severity scoresssssss (( ${severityScores}  )) `);
				const fileSeverity = getSeverityScore(severityScores, -1);
				console.log(`***** ${fileSeverity}`);

				//Stores file on the database
				const fileRecord = await DAO.addFile(
					relativePath,
					result.errorCount,
					result.fatalErrorCount,
					result.warningCount,
					result.fixableErrorCount,
					result.fixableWarningCount,
					result.source,
					errors,
					fileSeverity
				);

				//Gets the current student
				const currentStudentID = getStudentIDFromRelPath(
					relativePath,
					studentIDsByName
				);

				//adding files severity scores to the student so we can calculate the students severity score
				listOfSeverityScoreFilesOwnedByStudents
					.get(currentStudentID)
					.push(fileSeverity);
				console.log(listOfSeverityScoreFilesOwnedByStudents);
				DAO.addFileToStudent(currentStudentID, fileRecord._id);
			})
		); //Out of ESLINT Loop

		//add the list of the students to the zip file on database
		await DAO.addStudentsToZipFile(
			zipFileRecord._id,
			Array.from(studentIDsByName.values())
		);

		//Where we store the results to then further calculate the classes severity score
		const ListOfStudentSeverityScores = [];
		console.log(`listOfSeverityScoreFilesOwnedByStudents`);
		console.log(listOfSeverityScoreFilesOwnedByStudents);
		//go through students and calculate and add their severity scores
		for (const [
			key,
			value,
		] of listOfSeverityScoreFilesOwnedByStudents.entries(
			listOfSeverityScoreFilesOwnedByStudents
		)) {
			temp = getSeverityScore(value);
			//let average = value.reduce((a, b) => a + b) / value.length;
			ListOfStudentSeverityScores.push(temp);
			await DAO.updateStudent(key, temp);
		}

		ListOfStudentSeverityScores.sort();
		for (
			i = 0;
			i < Math.ceil(ListOfStudentSeverityScores.length / 8);
			i++
		) {
			ListOfStudentSeverityScores.push(
				ListOfStudentSeverityScores[
					Math.floor(ListOfStudentSeverityScores.length / 2)
				]
			);
		}

		let average = Math.ceil(
			ListOfStudentSeverityScores.reduce((a, b) => a + b) /
				ListOfStudentSeverityScores.length
		);
		//adds the error count and severity score
		await DAO.updateZipFile(zipFileRecord._id, results.length, average);

		// const responseData = results.map((result) => ({
		// 	filePath: result.filePath.substring(
		// 		result.filePath.lastIndexOf("/") + 1
		// 	),
		// 	errorCount: result.errorCount,
		// 	messages: result.messages,
		// }));

		fsExtra.emptyDirSync("./extracted");
		res.status(200).json(true);
}
	});
});

// overview page- return all uploaded zip files
app.get("/overview/zipfiles", async (req, res) => {
	if (!req.session.loggedIn) {
		res.json(false);
		return;
	}
	const response = {
		graphData: {}, //TODO
		zipFileData: await DAO.getAllZipFiles(),
	};
	res.json(response);

	// also return information to build graphs- GRACE working on it!!
	// grace has ~ideas~

	// return: zip file name, date uploaded, number of files, detections, security scores
});

app.post("/login", async (req, res) =>
{
	if (!req.session.loggedIn && req.body.username && req.body.password)
	{
		const user = await DAO.getUser(req.body.username);
		if (user)
		{
			bcrypt.compare(req.body.password, user.Hash, (err, result) =>
			{
				if (err)
				{
					console.log(err);
					res.status(500).json(false);
				}
				else
				{
					if (result)
					{
						req.session.loggedIn = true;
						res.status(200).json(true);
					}
					else
					{
						res.status(200).json(false);
					}
				}
			});
		}
		else
		{
			res.status(200).json(false);
		}
	}
	else
	{
		res.status(400).json(false);
	}
});

app.post("/signup", async (req, res) =>
{
	if (req.body.username && req.body.password && /^[a-zA-Z0-9]+$/.test(req.body.username) && /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(req.body.password))
	{
		const user = await DAO.getUser(req.body.username);
		if (user)
		{
			res.status(409).json(false);
		}
		else
		{
			const salt = await bcrypt.genSalt(saltRounds);
			const hash = await bcrypt.hash(req.body.password, salt);
			await DAO.addUser(req.body.username, hash);
			req.session.loggedIn = true;
			res.status(200).json(true);
		}
	}
	else
	{
		console.log(req.body);
		res.status(400).json(false);
	}
});

app.post("/logout", (req, res) =>
{
	if (req.session.loggedIn)
	{
		req.session.destroy();
		res.status(200).send();
	}
	else
	{
		res.status(400).send();
	}
});

// overview page- view more data fom invidual zip files
app.get("/studentfiles", async (req, res) => {
	if (!req.session.loggedIn) {
		res.json(false);
		return;
	}
	res.json(await DAO.getZipFile(req.query.id));
});

app.get("/ErrorTypes", async (req, res) => {
	res.json(ErrorTypeDetail.ReturnErrorTypeInformation(req.query.id));
});

app.get("/ErrorTypesNum", async (req, res) => {
	res.json(ErrorTypeDetail.getErrorTypesNum());
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

const getRelativePath = (absolutePath) => {
	const extractedFolderName = ("extracted" + path.sep);
	return absolutePath.substring(
		absolutePath.indexOf(extractedFolderName) + extractedFolderName.length
	);
};
