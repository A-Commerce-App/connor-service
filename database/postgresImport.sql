\c products;
COPY product (name, related) FROM '/Volumes/Seagate Backup Plus Drive/relatedProducts.csv' csv quote '^' delimiter '|';