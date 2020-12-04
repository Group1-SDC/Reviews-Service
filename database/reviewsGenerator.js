const fs = require('fs');
const faker = require('faker');

const stream = fs.createWriteStream(`reviews.csv`);

const getRadomInt = (num) => Math.floor(Math.random() * Math.floor(num)) + 1;
const stars = ['one_stars', 'two_stars', 'three_stars', 'four_stars', 'five_stars'];
const levels = ['first', 'second', 'third', 'fourth', 'fifth'];
const categories = ['shoes', 'clothes'];

const createReviews = (i) => {
  const product_id = i;
  const customer_id = getRadomInt(750000);
  const star_rating = stars[getRadomInt(5) - 1];
  const comfort = levels[getRadomInt(5) - 1];
  const quality = levels[getRadomInt(5) - 1];
  const create_date = faker.date.past();
  const comment = faker.lorem.sentences();
  const category = categories[getRadomInt(2) - 1];
  const fitness = levels[getRadomInt(5) - 1];
  const helpful = getRadomInt(20);
  const unhelpful = getRadomInt(20);

  return `${product_id}, ${customer_id}, ${star_rating}, ${comfort}, ${quality}, ${create_date}, ${comment}, ${category}, ${fitness}, ${helpful}, ${unhelpful}\n`;
}

const startWriting = (writeStream, encoding, done) => {
  let i = 10000000;
  const num_of_reviews = getRadomInt(20) - 1;
  writing();

  function writing(){
    let canWrite = true;
    do {
      i--;
      if (i === 0) {
        for (let j=0; j < num_of_reviews; j++) {
          canWrite = writeStream.write(createReviews(i), encoding);
        }
        writeStream.write(createReviews(i), encoding, done);
      } else {
        for (let k=0; k < num_of_reviews; k++) {
          canWrite = writeStream.write(createReviews(i), encoding);
        }
      }
    } while(i > 0 && canWrite)
    if (i > 0) {
      writeStream.once('drain', writing);
    }
  }

}

stream.write(`product_id,customer_id,star_rating,comfort,quality,create_date,comment,category,fitness,helpful,unhelpful\n`, 'utf-8');

startWriting(stream, 'utf-8', () => {
  stream.end();
})

