const fs = require('fs');
const faker = require('faker');
const stream = fs.createWriteStream(`database/postgres/customers.csv`);

const createCustomer = (i) => {
  const customer_id = i;
  const name = faker.name.findName();
  return `${customer_id},${name}\n`;
}

const startWriting = (writeStream, encoding, done) => {
  let i = 750001;
  writing();

  function writing() {
    let canWrite = true;
    do {
      i--;
      let customer = createCustomer(i)
      if (i === 1) {
        writeStream.write(customer, encoding, done);
      } else {
        canWrite = writeStream.write(customer, encoding);
      }
    } while (i > 1 && canWrite)
    if (i > 1) {
      writeStream.once('drain', writing);
    }
  }

}

stream.write(`customer_id, name\n`, 'utf-8');

startWriting(stream, 'utf-8', () => {
  stream.end();
})

