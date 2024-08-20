const fs = require('fs');

const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject("I coudnt find that file");
      }else {
        resolve(data);
      }
      
    })
  })
}

const writeFilePro= (file, data) =>{
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if(err) reject("i couldnt write that file");
      resolve("File written")
    })
  })
}

const getDogPic = async () => {
  try{
  const data = await readFilePro(`${__dirname}/dog.txt`);
  console.log(`Breed: ${data}`)
  const response = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  console.log(response.body.message);
 await  writeFilePro(`${__dirname}/dog-img.txt`, response.body.message);
  console.log("File written");
  }catch(err){
    console.log(err);
  }
  
}

getDogPic()