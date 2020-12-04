const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const db = require('../database/database.js');

app.get('/api/relatedProducts/:id', (req, res) => {
  async function handleRequest() {
    try {
      const data = await db.readAll();
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

app.post('/api/relatedProducts/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  async function handleRequest() {
    try {
      const data = await db.save(id, body);
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

app.patch('/api/relatedProducts/', (req, res) => {
  const { body } = req;
  async function handleRequest() {
    try {
      const result = await db.update(body);
      res.status(200).send(result);
    }
    catch(err) {
      console.log(err.message);
      res.header(400);
      res.send(err.message);
    }
  }
});

app.delete('/api/relatedProducts/', (req, res) => {
  const { body } = req;
  async function handleRequest() {
    try {
      const result = await db.delete(body);
      res.status(200).send(result);
    }
    catch(err) {
      console.log(err.message);
      res.header(400);
      res.send(err.message);
    }
  }
});


let port = 3003;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
})
