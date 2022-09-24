const mongoose = require("mongoose");
require("dotenv").config();

if (!process.env.MONGODB_URI)
{
    console.log("Process terminating due to undefined MongoDB URI.");
    process.exit(1);
}

let uri = process.env.MONGODB_URI;

if (process.env.DB_NAME)
{
    uri = (uri.substring(0, (uri.split("/", 3).join("/").length + 1)) + process.env.DB_NAME + uri.substring(uri.indexOf("?")));
}console.log(uri);

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
		uri,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	);
};

exports.disconnect = () => {
	mongoose.disconnect();
};

exports.uri = uri;