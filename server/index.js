const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express()
const port = 8080

const { ESLint } = require("eslint");
const fs = require('fs');
const StreamZip = require('node-stream-zip');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/upload', async (req, res) => {
  const file = req.files.file;
  const filename = file.name;

  const fileLocation = `${'testFiles/'}${filename}`;

  if (!fs.existsSync('extracted')) {
    fs.mkdirSync('extracted');
  }

  file.mv(fileLocation, async (err) => {
    const eslint = new ESLint();

    // const eslint = new ESLint();
    // const results = await eslint.lintFiles(["testFiles/**/*.js"])
    // const formatter = await eslint.loadFormatter("stylish");

    // await new Promise(resolve => setTimeout(resolve, 5000));
    // const zip = new StreamZip({file: fileLocation, storeEntries: true});
    // try {
    //   console.log(`doing it for ${fileLocation}`)
    //   const count = await zip.extract(null, './extracted');
    // } catch (e) {
    //   console.log("ERror")
    //   console.log(e)
    // }

    var AdmZip = require("adm-zip");

// reading archives
    var zip = new AdmZip(fileLocation);
    // var zipEntries = zip.getEntries(); // an array of ZipEntry records
    zip.extractAllTo('./extracted', /*overwrite*/ true);

    const results = await eslint.lintFiles(["./extracted/**/*.js"]);

    results.forEach(result => {
      console.log(result.messages)
    })

    // console.log(results);

    // 4. Output it.
    // const resultText = formatter.format(results);
    // console.log(JSON.stringify(resultText))
    console.log("WOPRKED GREAT@@R@")
  });

  res.send("worked :)")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
