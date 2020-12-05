const faker = require('faker');
const someObject = require('./data.json');
const fs = require('fs');

generateProducts = (pageId) => {
  let records = [];
  for (let i = 0; i < 7; i++) {
    let randomIndex = Math.floor(Math.random() * 999);
    let record = someObject[randomIndex];
    record.pageId = pageId;
    records.push(record);
  }
  return records;
};

const reviewsStream = fs.createWriteStream(__dirname + '/data.csv', {flags: 'a'});

function addDataToCSV(writer, encoding, callback) {
  let i = 10000000;
  function write() {
    let ok = true;
    do {
      i -= 1;
      let string = '';
      let records = generateProducts(i);
      records.forEach((record) => {
        const { pageId, name, rating, numRatings, prime, price, images } = record;
        string += `${pageId}, ${name}, ${rating}, ${numRatings}, ${prime}, ${price}, "{${images[0]}, ${images[1]}, ${images[2]}}"\n`;
      });
      if (i === 0) {
        writer.write(string, encoding, callback);
      } else {
        ok = writer.write(string, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
write();
}
addDataToCSV(reviewsStream, 'utf-8', () => {
  reviewsStream.end();
});