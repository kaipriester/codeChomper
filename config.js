// IMPORTANT: File must be renamed to 'config.js' after values have been entered.

let uri = 'mongodb+srv://Ryand:ZJSOI@cluster0.a37m6l0.mongodb.net/?retryWrites=true&w=majority';
const db_name = 'test'; // Leave falsy if the URI supplied already contains name of target database

const session_secret = 'abc'; // Key used to sign session ID cookies
const session_store_secret = 'def'; // Key used to encrypt session data

const master_username = 'a'; // Username for default admin account
const master_password = 'a'; // Password for default admin account

if (!uri)
{
    console.log("Process terminating due to undefined MongoDB URI.");
    process.exit(1);
}

if (db_name)
{
    uri = (uri.substring(0, uri.indexOf('?')) + db_name + uri.substring(uri.indexOf('?')));
}

exports.uri = uri;
exports.session_secret = session_secret;
exports.session_store_secret = session_store_secret;
exports.master_username = master_username;
exports.master_password = master_password;