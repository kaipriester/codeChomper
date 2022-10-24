const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	ErrorType: Number,
	
});

exports.Model = mongoose.model("PYError", Schema);