const writeJson = require('write-json');
const faker =require('faker');
const path = require('path');

const jsonData = () => {
  let records = [];
  for (let i = 0; i < 1000; i++) {
    let record = {};
    record.name = faker.random.word();
    record.rating = Math.floor(Math.random() * Math.floor(11));
    record.numRatings = faker.random.number();
    record.prime = faker.random.boolean();
    record.price = faker.commerce.price();
    record.image1 = faker.image.imageUrl();
    record.image2 = faker.image.imageUrl();
    record.image3 = faker.image.imageUrl();
    records.push(record);
  }
  return records;
};

writeJson(__dirname + '/data.json', jsonData(), function(err) {
  if (err) {
    console.log(err);
  }
});
