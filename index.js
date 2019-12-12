require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const verify = require("./controllers/verify");
const auth = require("./controllers/auth");
const asyn = require("./async");
const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/src`));

app.post(
  "/signup",
  [check("username").isEmail(), check("password").isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const result = await auth.checkUserExistanse(req.body);
    console.log(`result = ${result}`);
    if (result.length === 0) {
      auth.createNewUser(req.body);
      return jwt.sign({ user: req.body }, "secretkey", (err, token) => {
        res.json({
          token
        });
      });
    }
    return res.json({ response: "user already exists" });
  }
);

app.post("/message", verify.verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "successfully",
        authData
      });
    }
  });
});

app.get("/", (req, res) => {
  res.send("welcome to api");
});

// const session = require("./controllers/session");

// const auth = require("./controllers/authentication");

// const favorites = require("./methods/history.favorites");

app.listen(port);
