const mongoose = require('mongoose');
let faker = require('faker');
const db = require('./database.js');

console.log('seeding db ...');

// get images from S3, there are 20 named 0.jpg - 19.jpg
let numImgs = 20;
let s3Images = [];
for (var i = 0; i < numImgs; i++) {
  console.log('linking S3 Images');
  s3Images.push(`https://fec-related-items.s3-us-west-2.amazonaws.com/bars/${i}.jpg`);
}

//https://fec-related-items.s3-us-west-2.amazonaws.com/bars/${i}.jpg
//https://source.unsplash.com/random/800x600?${terms[i]}

let seedData = [];
for (var i = 0; i <= 100; i++) {
  var document = {};
  document.name = faker.name.findName();
  document.rating = Math.floor(Math.random() * Math.floor(11));
  document.numRatings = faker.random.number();
  document.prime = faker.random.boolean();
  document.price = faker.commerce.price();
  document.images = [];
  for (var j = 0; j < 3; j++){
    document.images.push(s3Images[Math.floor(Math.random() * numImgs)]);
  }
  seedData.push(document);
  console.log('document ', i, ' created');
}
//db.dropDatabase();
db.Product.insertMany(seedData).then(() => {
  mongoose.disconnect();
});

console.log('db seeded');

