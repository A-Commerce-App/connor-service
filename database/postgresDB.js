const { Client } = require('pg');
const client = new Client({
  database: 'products'
});

client.connect();

const readAll = async (id) => {
  try {
    let results = await client.query('SELECT * FROM product WHERE id = $1', [id]);
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