const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require('body-parser');
const AdmZip = require("adm-zip");
const { ESLint } = require("eslint");
const fs = require('fs');

const app = express()
const port = 8080

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/upload', async (req, res) => {
  const file = req.files.file;
  const filename = file.name;

  const fileLocation = `${'testFiles/'}${filename}`;

  if (!fs.existsSync('extracted')) {
    fs.mkdirSync('extracted');
  }

  file.mv(fileLocation, async (err) => {
    const zip = new AdmZip(fileLocation);
    zip.extractAllTo('./extracted', true);

    const eslint = new ESLint();
    const results = await eslint.lintFiles(["./extracted/**/*.js"]);
    // TODO: replacing the file path with a static path (/Users/pabloestrada/filename.js -> filename.js)
    const responseData = results.map(result => ({ filePath: result.filePath.replace("/Users/pabloestrada/Desktop/JSAnalyze/server/extracted/", ""), errorCount: result.errorCount, messages: result.messages }))

    // TODO: delete extracted folder
    res.json(responseData)
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
