const fs = require('fs');
const faker = require('faker');

const stream = fs.createWriteStream(`database/cassandra/reviews.csv`);

const getRadomInt = (num) => Math.floor(Math.random() * Math.floor(num)) + 1;
const stars = ['one_stars', 'two_stars', 'three_stars', 'four_stars', 'five_stars'];
const levels = ['first', 'second', 'third', 'fourth', 'fifth'];
const categories = ['shoes', 'clothes'];

let reviewCount = 1

const createReviews = (i) => {
  const num_of_reviews = getRadomInt(15) - 1;
  const product_id = i;
  const reviews = []

  for (let j=0; j < num_of_reviews; j++) {
    const review_id = reviewCount;
    const customer_name = faker.name.findName();
    const star_rating = stars[getRadomInt(5) - 1];
    const comfort = levels[getRadomInt(5) - 1];
    const quality = levels[getRadomInt(5) - 1];
    const create_date = faker.date.past();
    const comment = faker.lorem.sentences();
    const category = categories[getRadomInt(2) - 1];
    const fitness = levels[getRadomInt(5) - 1];
    const helpful = getRadomInt(20);
    const unhelpful = getRadomInt(20);
    const name = faker.name.findName();

    const review = {
      category: category,
      comfort: comfort,
      comment: comment,
      create_date: create_date,
      customer_name: customer_name,
      fitness: fitness,
      helpful: helpful,
      quality: quality,
      review_id: review_id,
      star_rating: star_rating,
      unhelpful: unhelpful
    }

    var strReview = JSON.stringify(review)

    reviewCount++;
    reviews.push(`${strReview}`);
  }

  return `${product_id}|[${reviews}]\n`;
}

const startWriting = (writeStream, encoding, done) => {
  let i = 10000001;
  writing();

  function writing(){
    let canWrite = true;

    do {
      i--;
      if (i === 1) {
        writeStream.write(createReviews(i), encoding, done);
      } else {
        canWrite = writeStream.write(createReviews(i), encoding);
      }
    } while(i > 1 && canWrite)
    if (i > 1) {
      writeStream.once('drain', writing);
    }
  }

}



stream.write(`product_id|reviews\n`, 'utf-8');

startWriting(stream, 'utf-8', () => {
  stream.end();
})