const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { getFiles, buildDictionary, buildBoard } = require('./controllers/');

app.use(bodyParser.json());
app.get('/', getFiles, buildDictionary, buildBoard);

const PORT = process.env.PORT || 3000;
app.listen(PORT);


