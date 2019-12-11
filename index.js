require("dotenv").config();
const db = require("./db");

const asyn = require("./async");

const express = require("express");

const app = express();

const port = process.env.PORT;

const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const { check, validationResult } = require('express-validator');

app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/src`));

app.post('/signin', [

  check('username').isEmail(),

  check('password').isLength({ min: 5 })
],async (req, res) => {

  const errors = validationResult(req);
  console.log(errors)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
  let result = await checkUserExistanse(req.body)
        console.log("result = " + result)
        if (result.length === 0) {
          createNewUser(req.body);
          return res.send({
            res: req.body
          })
        }
        else {
          return res.json({response : "user already exists"});
        }
  };
});

let createNewUser = async(currentUser) => {
  console.log(currentUser)
  const newUser = new db.user(currentUser);
  newUser.save({newUser}, (err, data) => {
   return console.log("created new user:" + data)
  });
};

function checkUserExistanse(currentUser) {
  console.log(currentUser.username)
  return new Promise(resolve => {
    db.user.find({username : currentUser.username}, (err, data) => {
      console.log(data)
      resolve(data) 
    });
  });
};

app.get('/', (req, res) => {
  res.send('welcome to api');
});


// const session = require("./controllers/session");

// const auth = require("./controllers/authentication");

// const favorites = require("./methods/history.favorites");

app.listen(port);
