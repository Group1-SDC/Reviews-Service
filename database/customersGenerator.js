const fs = require('fs');
const faker = require('faker');

const stream = fs.createWriteStream(`customers.csv`);

const createCustomer = () => {
  const name = faker.name.findName();
  return `${name}\n`;
}

const startWriting = (writeStream, encoding, done) => {
  let i = 750000;
  writing();

  function writing() {
    let canWrite = true;
    do {
      i--;
      let customer = createCustomer()
      if (i === 0) {
        writeStream.write(customer, encoding, done);
      } else {
        canWrite = writeStream.write(customer, encoding);
      }
    } while (i > 0 && canWrite)
    if (i > 0) {
      writeStream.once('drain', writing);
    }
  }

}

stream.write(`name\n`, 'utf-8');

startWriting(stream, 'utf-8', () => {
  stream.end();
})

