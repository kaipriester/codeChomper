const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	Username: { type: String, index: { unique: true } },
	Hash: String,
	Admin: Boolean
});

exports.Model = mongoose.model("User", Schema);