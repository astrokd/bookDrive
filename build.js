// require('dotenv').config();
const fs = require('fs');
const https = require('https');

const bookList = require('./data/ChildrensBooks.json')

let bookText = '<!DOCTYPE html>\r\n'

for (const prop in bookList) {
  const title = prop;
  const author = bookList[prop].Author;
  const lang = bookList[prop].Language;
  if (lang === 'english') {
    
    https.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+inauthor:${author}`, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    })
    response.on('end', () => {
      const obj = JSON.parse(data);
      const thumbNail = obj.items[0].volumeInfo.imageLinks.thumbnail;
      const viewLink = obj.items[0].volumeInfo.previewLink;
      const book = `<div class="book"> \r\n <p>${title}<br>by ${author}</p>\r\n<img src="${thumbNail}" width="200" height="200">\r\n<a href="${viewLink}">Book link</a>\r\n</div>\r\n`;
      bookText += book
      console.log(book);
    })
  })
  .on('error', (error) => {
    console.log(error);
  })
    console.log('finished');
  }
}

fs.writeFile('booklist.txt', bookText, (err) => {
  // throws an error, you could also catch it here
  if (err) throw err;

  // success case, the file was saved
  console.log('list saved!');
});



