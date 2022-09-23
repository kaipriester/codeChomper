const mongoose = require("mongoose");
// const { uri } =  require("../config.js");

mongoose.connection.on("connected", () => {
	console.log(`Database connection open`);
});

mongoose.connection.on("error", (error) => {
	console.log(`Mongoose connection error: ${error}`);
});

mongoose.connection.on("disconnected", () => {
	console.log("Mongoose default connection disconnected");
});

process.on("SIGINT", (error, data) => {
	console.log(`Disconnected by ${error} ${data}`);
	mongoose.connection.close(() => {
		console.log(
			"Mongoose default connection disconnected through app termination"
		);
		process.exit(0);
	});
});

exports.connect = () => {
	mongoose.connect(
		process.env.MONGODB_URI,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	);
};

exports.disconnect = () => {
	mongoose.disconnect();
};