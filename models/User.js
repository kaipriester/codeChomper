const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	Username: { type: String, index: { unique: true } },
	Hash: String,
	Admin: Boolean,
	googleId: { required: false, type: String },
	facebookId: { required: false, type: String },
	githubId: { required: false, type: String }
});

exports.Model = mongoose.model("User", Schema);