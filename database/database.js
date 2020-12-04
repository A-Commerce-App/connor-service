
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/RelatedProducts', {useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected');
});


const productSchema = new mongoose.Schema({
  // pageId: Number,
  name:  String,
  rating: Number,
  numRatings: Number,
  prime: Boolean,
  price: Number,
  images: []
});

const Product = mongoose.model('product', productSchema);

const save = async (pageId, body) => {

  const { name, rating, numRatings, prime, price, images } = body;
  const newProduct = new Product({
    pageId,
    name,
    rating,
    numRatings,
    prime,
    price,
    images
  });

  try {
    await newProduct.save();
    return 'new product saved successfully';
  }
  catch(err) {
    throw err;
  }
};

const readAll = async () => {
  try {
    const data = await Product.find();
    return data;
  }
  catch(err) {
    throw err;
  }
};

const update = async (body) => {
  try {
    if (!body.productId) throw new Error('product id is required field');
    const { productId } = body;
    const updates = Object.keys(body);
    const product = await Product.find({_id: productId});
    updates.forEach((update) => product[update] = body[update]);
    return 'updated successfully';
  }
  catch(err) {
    throw err;
  }
};

const remove = async (body) => {
  try {
    const { productId } = body;
    if (!body.productId) throw new Error('product id is required field');
    await Product.deleteOne({_id: productId});
    return 'succesfully deleted product';
  }
  catch(err) {
    throw err;
  }
};


module.exports.Product = Product;
module.exports.readAll = readAll;
module.exports.save = save;
module.exports.update = update;
module.exports.remove = remove;
// module.exports = Product;
