const fs = require('fs')

const stream = fs.createWriteStream(`database/postgres/products.csv`)

const createProducts = (i) => {
  const product_id = i;
  return `${product_id}\n`
}

const startWriting = (writeStream, encoding, done) => {
  let i = 10000001;
  writing()

  function writing(){
    let canWrite = true;
    do {
      i--;
      let products = createProducts(i)
      if(i === 1){
        writeStream.write(products, encoding, done);
      }else{
        canWrite = writeStream.write(products, encoding);
      }
    } while (i > 1 && canWrite)
    if (i > 1) {
      writeStream.once('drain', writing);
    }
  }

}

stream.write(`product_id\n`, 'utf-8')

startWriting(stream, 'utf-8', () => {
  stream.end()
})

