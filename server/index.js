require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
require('newrelic');

const app = express();
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('../database/postgresDB.js');

app.get('/api/relatedProducts/:id', (req, res) => {
  const { id } = req.params;
  async function handleRequest() {
    try {
      const data = await db.readAll(id);
      res.status(200).send(data.rows[0].related);
    }
    catch(err) {
      console.log(err.message);
      res.header(400);
      res.send(err.message);
    }
  }
  handleRequest();
});

app.post('/api/relatedProducts/', (req, res) => {
  const { body } = req;
  async function handleRequest() {
    try {
      const data = await db.save(body);
      res.status(200).send(data);
    }
    catch(err) {
      console.log(err.message);
      res.header(400);
      res.send(err.message);
    }
  }
  handleRequest();
});

app.patch('/api/relatedProducts/:id', (req, res) => {
  const { body } = req;
  const { id } = req.params;
  async function handleRequest() {
    try {
      const result = await db.update(body, id);
      res.status(200).send(result);
    }
    catch(err) {
      console.log(err.message);
      res.header(400);
      res.send(err.message);
    }
  }
  handleRequest();
});

app.delete('/api/relatedProducts/:id', (req, res) => {
  const { id } = req.params;
  async function handleRequest() {
    try {
      const result = await db.remove(id);
      res.status(200).send(result);
    }
    catch(err) {
      console.log(err.message);
      res.header(400);
      res.send(err.message);
    }
  }
  handleRequest();
});

let port = 3003;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
