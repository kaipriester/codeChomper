const express = require("express");
const fileupload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express()
const port = 8080

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

app.post('/upload', (req, res) => {
  const file = req.files.file;
  const filename = file.name;

  console.log(file)

  res.send("worked :)")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
