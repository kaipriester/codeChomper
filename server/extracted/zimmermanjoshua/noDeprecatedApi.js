/*eslint node/no-deprecated-api: "error" */

var fs = require("fs");
fs.exists("./foo.js", function() {}); /*ERROR: 'fs.exists' was deprecated since v4. Use 'fs.stat()' or 'fs.access()' instead.*/

// Also, it can report the following patterns.
var exists = require("fs").exists;    /*ERROR: 'fs.exists' was deprecated since v4. Use 'fs.stat()' or 'fs.access()' instead.*/
const {exists} = require("fs");       /*ERROR: 'fs.exists' was deprecated since v4. Use 'fs.stat()' or 'fs.access()' instead.*/


// And other deprecated API below.