const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	Name: String,
	ErrorCount: Number,
	FatalErrorCount: Number,
	WarningCount: Number,
	FixableErrorCount: Number,
	FixableWarningCount: Number,
	Source: String,
	SeverityScore: Number,
	ParentZipFileId: mongoose.Schema.Types.ObjectId,
	Errors: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Error",
		},
	],
	PyErrors: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "PYError",
		},
	],
	isPyFile: Boolean
});

exports.Model = mongoose.model("File", Schema);
