const fs = require('fs');
const superagent = require('superagent');
fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  if (err) return console.log(err);
  console.log(`Breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((response) => {
      console.log(response.body.message);

      fs.writeFile('dog-img.txt', response.body.message, (err) => {
        console.log('Random dog image saved to file.');
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
