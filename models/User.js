const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	Username: String,
	Hash: String
});

exports.Model = mongoose.model("User", Schema);