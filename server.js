const https = require('https');

const title = 'fry bread';
const author = 'Kevin Noble Maillard';

https.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}`, (response) => {
  let data = '';
  response.on('data', (chunk) => {
    data += chunk;
  })
  response.on('end', () => {
    const obj = JSON.parse(data)
    const isbn = obj.items[0].volumeInfo.industryIdentifiers[0].identifier
    const thumbNail = obj.items[0].volumeInfo.imageLinks.thumbnail
    const buyLink = obj.items[0].saleInfo.buyLink
    const viewLink = obj.items[0].volumeInfo.previewLink
    console.log(`Title: ${title} \r\n Author: ${author} \r\n ISBN: ${isbn} \r\n image: ${thumbNail} \r\n buy: ${buyLink}`);
    // console.log(obj.items[0]);
  })
})
.on('error', (error) => {
  console.log(error);
})