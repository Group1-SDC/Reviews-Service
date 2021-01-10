const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: process.env.VAR2,
  database: 'reviews',
  password: process.env.VAR1,
  port: 5432,
});

pool.connect();

const fetchReviews = (product_id, cb) => {

  var queryStr = `SELECT * FROM review, customer WHERE review.customer_id = customer.customer_id AND review.product_id = ${product_id}`;

  pool
    .query(queryStr)
    .then((res) => {
      cb(res.rows);
    })
    .catch((err) => {
      console.error(err);
    });
};

const updateHelpful = (helpful, review_id, cb) => {

  var queryStr = `UPDATE review SET helpful = ${helpful} WHERE review_id = ${review_id}`
  pool
    .query(queryStr)
    .then((res) => {
      cb(res.rows);
    })
    .catch((err) => {
      console.error(err);
    });
};

const updateUnhelpful = (unhelpful, review_id, cb) => {

  var queryStr = `UPDATE review SET unhelpful = ${unhelpful} WHERE review_id = ${review_id}`
  pool
    .query(queryStr)
    .then((res) => {
      cb(res.rows);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = {
  fetchReviews,
  updateHelpful,
  updateUnhelpful

};
