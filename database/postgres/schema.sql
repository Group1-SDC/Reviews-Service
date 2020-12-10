
-- * DATABASE DROP ERROR * --
-- -- You cannot be connected to the database you are about to remove. Instead, connect to template1 or any other database.
-- \c template1;

-- DROP DATABASE IF EXISTS reviews;

-- CREATE DATABASE reviews;

-- \c reviews;

-- CREATE TABLE customer (
--   customer_id SERIAL PRIMARY KEY,
--   name VARCHAR
-- );

-- CREATE TABLE product (
--   product_id SERIAL PRIMARY KEY
-- );

-- CREATE TABLE review (
--   review_id SERIAL PRIMARY KEY,
--   category VARCHAR,
--   comfort VARCHAR,
--   comment VARCHAR,
--   create_date VARCHAR,
--   customer_id INTEGER REFERENCES customer(customer_id),
--   fitness VARCHAR,
--   helpful VARCHAR,
--   product_id INTEGER REFERENCES product(product_id),
--   quality VARCHAR,
--   star_rating VARCHAR,
--   unhelpful VARCHAR
-- );


-- * LOAD DATA * --

-- COPY customer(customer_id)
-- FROM '/Users/marissa/Desktop/SDC/customer-reviews/database/postgres/customers.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY product(product_id)
-- FROM '/Users/marissa/Desktop/SDC/customer-reviews/database/postgres/products.csv'
-- DELIMITER ','
-- CSV HEADER;

COPY review(review_id, category,comfort,comment,create_date,customer_id,fitness,helpful,product_id,quality,star_rating,unhelpful)
FROM '/Users/marissa/Desktop/SDC/customer-reviews/database/postgres/reviews.csv'
DELIMITER ','
CSV HEADER;

-- -- * INDEX DATA * --

-- CREATE INDEX PRODUCT_SORT ON REVIEW (PRODUCT_ID);

-- * RUN THIS FILE * --
-- npm run postgresDB

