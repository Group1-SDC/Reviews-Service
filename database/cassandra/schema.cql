DROP KEYSPACE IF EXISTS reviews;

CREATE KEYSPACE reviews
    WITH REPLICATION = {
        'class' : 'SimpleStrategy',
        'replication_factor' : 1
    } ;

USE reviews;

DROP TABLE IF EXISTS reviews.product;

CREATE TABLE product (
  product_id INT,
  reviews list <text>,
  PRIMARY KEY(product_id)
);

-- * LOAD DATA * --

COPY product (product_id, reviews) FROM '/Users/marissa/Desktop/SDC/customer-reviews/database/cassandra/reviews.csv ' WITH DELIMITER='|' AND HEADER=TRUE AND CHUNKSIZE=1;

-- * API QUERY * --
SELECT reviews FROM product WHERE product_id = 1;

-- * RUN THIS FILE * --
-- npm run cassandraDB

