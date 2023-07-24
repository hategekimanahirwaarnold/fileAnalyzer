var express = require('express');
var cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const multer = require('multer');

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //define destination folder where files will be stored
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    //define how files will be named.
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
})

app.post('/api/fileanalyse', upload.single('upfile'), (req, res)=> {
  if (!req.file) {
    return res.status(400).json({error: "No file uploaded!"});
  };
  //if file uploaded, access the file's details
   console.log('File uploaded successfully:', req.file);
   let received = req.file;
  res.status(200).json({ name: received.originalname, type: received.mimetype, size: received.size});
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
