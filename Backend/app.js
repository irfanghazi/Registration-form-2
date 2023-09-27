const dotenv = require("dotenv");
const express = require('express')
const cors = require('cors');

require("./connection/config");
require('./controller/dataController')
const userRouter = require("./routes/userRoutes");
const app = express()
app.use(cors())
app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept","Content-disposition"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requeted-With, Content-Type, Accept,Content-disposition, Authorization, RBR"
        );
        res.header("Access-Control-Expose-Headers", "Token");
        
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
        
        if (req.method === "OPTIONS") {
          return res.status(200).end();
        }
        
        next();
      });

const port = process.env.PORT || 8080

app.use("/user", userRouter);


app.listen(port, () => {
    console.log(`Server is connected to port ${port}`)
})