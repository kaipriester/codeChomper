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
	Errors: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Error",
		},
	],
});

exports.Model = mongoose.model("File", Schema);
