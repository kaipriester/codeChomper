const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	ErrorType: Number,
	Severity: Number,
	FileName: String,
	Code: String,
	Confidence: String,
	Severity: String,
	CweLink: String,
	LineNumber: Number,
	LineRange: [Number],
	TestName: String,
	TestID: String
});

exports.Model = mongoose.model("PYError", Schema);