DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

\c products;

CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name TEXT,
  related JSON
);