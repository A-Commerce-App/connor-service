const { Client } = require('pg');
const client = new Client({
  database: 'products',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_IP,
  port: 5432
});
const redisClient = require('./redisClient.js');

client.connect();

const readAll = async (id) => {
  try {
    let attempt = await redisClient.getAsync(id);
    if (attempt) {
      return JSON.parse(attempt);
    }
    let results = await client.query('SELECT * FROM product WHERE id = $1', [id]);
    await redisClient.setAsync(id, JSON.stringify(results));
    return results;
  }
  catch(err) {
    throw err;
  }
};

const save = async (body) => {
  const { name, related } = body;
  try {
    let results = await client.query('INSERT INTO product(name, related) VALUES($1, $2)', [name, JSON.stringify(related)]);
    return results
  }
  catch(err) {
    throw err;
  }
};

const update = async (body, id) => {
  try {
    let results = await client.query('UPDATE product SET related = $1 WHERE id = $2', [JSON.stringify(body), id]);
    return results;
  }
  catch(err) {
    throw err;
  }
};

const remove = async (id) => {
  try {
    let results = await client.query('DELETE FROM product WHERE id = $1', [id]);
    return results;
  }
  catch(err) {
    throw err;
  }
};

module.exports.readAll = readAll;
module.exports.save = save;
module.exports.update = update;
module.exports.remove = remove;
