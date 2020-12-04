DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\c reviews;

CREATE TABLE IF NOT EXISTS customer (
  id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE IF NOT EXISTS product (
  id SERIAL PRIMARY KEY,
  name VARCHAR
);

DROP TABLE review;

CREATE TABLE IF NOT EXISTS review (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES product(id),
  customer_id INTEGER REFERENCES customer(id),
  star_rating VARCHAR,
  comfort VARCHAR,
  quality VARCHAR,
  create_date VARCHAR,
  comment VARCHAR,
  category VARCHAR,
  fitness VARCHAR,
  helpful VARCHAR,
  unhelpful VARCHAR
);