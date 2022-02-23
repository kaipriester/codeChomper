const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require('body-parser');
const AdmZip = require("adm-zip");
const { ESLint } = require("eslint");
const fs = require('fs');
const fsExtra = require('fs-extra');

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

//make a folder called extracted
  if (!fs.existsSync('extracted')) {
    fs.mkdirSync('extracted');
  }
  
//extract files into this folder
  file.mv(fileLocation, async (err) => {
    
    /*watch out grace is working here lol*/
    const zip = new AdmZip(fileLocation);
    zip.extractAllTo('./extracted', true);

    //setup ESLINT and run them on all the files in this folder.
    const eslint = new ESLint();
    const results = await eslint.lintFiles(["./extracted/**/*.js"]);

    //const responseData = results.map(result => ({ filePath: result.filePath.replace("/Users/pabloestrada/Desktop/JSAnalyze/server/extracted/", ""), errorCount: result.errorCount, messages: result.messages }))
    const responseData = results.map(result => ({ filePath: result.filePath.substring(result.filePath.lastIndexOf("/")+1), errorCount: result.errorCount, messages: result.messages }))
    fsExtra.emptyDirSync('./extracted');
    res.json(responseData)

    // TODO: figure out what to do with the errors - Aaron has claimed this
    console.log(results);

  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
