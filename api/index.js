const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8000;
const routerAPI = require("./routes");
require('dotenv').config();

const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/errorHandler");

app.use(express.json());

const whiteList = [process.env.FRONTEND_URL];
const options = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin) || !origin){
      callback(null, true);
    }else{
      callback(new Error("Access denied!"));
    }
  }
}
app.use(cors(options));

app.get('/api', (req, res) => {
  res.write('<h1 style="font-size:60px; font-weight:bold; text-align:center; text-transform:uppercase;">Home</h1>');
});

// routes function
routerAPI(app);

// use middlewares globally in all routes
app.use(boomErrorHandler);
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

