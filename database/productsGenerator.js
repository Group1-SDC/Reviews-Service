const fs = require('fs')
const faker = require('faker')

const stream = fs.createWriteStream(`products.csv`)

const createProducts = () => {
  const name = faker.commerce.productName()
  return `${name}\n`
}

const startWriting = (writeStream, encoding, done) => {
  let i = 10000000;
  function writing(){
    let canWrite = true
    do {
      i--
      let products = createProducts()
      if(i === 0){
        writeStream.write(products, encoding, done)
      }else{
        writeStream.write(products, encoding)
      }
    } while(i > 0 && canWrite)
    if(i > 0 && !canWrite){
      writeStream.once('drain', writing);
    }
  }
  writing()
}

stream.write(`name\n`, 'utf-8')

startWriting(stream, 'utf-8', () => {
  stream.end()
})

