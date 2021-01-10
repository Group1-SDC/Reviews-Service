const PORT = 3001;
const path = require('path');
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
const express = require('express');
const compression = require('compression');

const db = require('../database/index.js')

const newrelic = require('newrelic');


const app = express();
app.use(compression());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(morgan('dev'));
// app.use('/', express.static(path.resolve(__dirname, '../client/dist')));

// app.get('/loaderio-6ea2b205dcbb4c8918b074d7e863132d.txt', (req, res) => {
//   res.send('loaderio-6ea2b205dcbb4c8918b074d7e863132d')
// })

app.use('/:id', express.static(path.resolve(__dirname, '../client/dist')));

app.get('/api/reviews/:product_id', (req, res) => {

  db.fetchReviews(req.params.product_id, (results) => {
    res.send(results)
  })

});

app.put('/api/reviews/:review_id/helpful/:helpful_votes', (req, res) => {

  db.updateHelpful(req.params.helpful_votes,req.params.review_id, (results) => {
    res.send(results)
  })

});

app.put('/api/reviews/:review_id/unhelpful/:unhelpful_votes', (req, res) => {

  db.updateUnhelpful(req.params.unhelpful_votes,req.params.review_id, (results) => {
    res.send(results)
  })

});


app.listen(PORT, () => {
  console.log(`app is running on localhost:${PORT}`);
});
