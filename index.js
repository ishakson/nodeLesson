const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");



const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
dataObj.map(el => {
  el.slug = slugify(el.productName, { lower: true });
})


const server = http.createServer((req, res) => {

  const { pathname} = url.parse(req.url, true);

  if (pathname.includes("/overview") || pathname === "/") {
    res.writeHead(200,{
      "Content-type": "text/html",
    })
    const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardHtml);
    res.end(output);

  } else if (pathname.includes("/product")) {
    const slug = pathname.replace('/product/', '');
  if (!slug || slug === "/product") {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end('<h1>There is no product name at url</h1>');
    return;
  }

  res.writeHead(200, { 'Content-type': 'text/html' });
  const product = dataObj.find(element => element.slug === slug);

  
  const output = replaceTemplate(tempProduct, product);
  res.end(output);
  }else if(pathname.includes("/api")){

    res.writeHead(200, {
      "Content-type": "application/json",
      "my-own-header": "hello-world"
    });
    res.end(data);
    
  } else {
    res.writeHead(404, {
         "Content-type": "text/html" ,
         "my-own-header": "hello-world"});
    res.end("<h1>page not found</h1>");
  }
});
server.listen(8000, "127.0.0.1", () => {
  console.log("listening to requests on port 8000");
});
