DROP DATABASE IF EXISTS relatedproducts;

CREATE DATABASE relatedproducts;

\c relatedproducts;

CREATE TABLE product (
  id BIGSERIAL PRIMARY KEY,
  pageId INT,
  name VARCHAR(200),
  rating INT,
  numRatings INT,
  prime BOOLEAN,
  price DECIMAL,
  images TEXT[]
);