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
  const res1 =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2 =  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([res1, res2]);
    
  const imgs = all.map(res => res.body.message);
 await  writeFilePro(`${__dirname}/dog-img.txt`, imgs.join('\n'));
  console.log("File written");
  }catch(err){
  
    throw err;
  }
  return "done";
}

(async () => {
  try{
    await getDogPic().then(data => console.log(data));
  }catch(err){
    console.log(err);
  }
})()
/*
getDogPic().then(x => {
  console.log(x);
  console.log("finished")
}).catch(err => {
  console.log("error");
})
*/