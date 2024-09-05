const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;
console.log(process.env);
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
