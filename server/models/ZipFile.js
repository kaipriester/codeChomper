const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	Name: String,
	Date: Date,
	ErrorCount: Number,
	SeverityScore: Number,
	FileCount: Number,
	Student: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Student",
		},
	],
});

exports.Model = mongoose.model("ZipFolder", Schema);
