const mongoose = require("mongoose");

const mongoDB = process.env.DB_HOST;

mongoose.connect(mongoDB);

console.log('successfully conected to db');

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  password: String,
  chat: Array
});

const user = mongoose.model("person", UserSchema);

const ChatSchema = new Schema({
  chat: Object
});

const chat = mongoose.model("chats", ChatSchema);

// user.create({name:"Tony", pass:"12345"},(err, doc) => {
//   console.log(doc)
// });

// user.find({}, (err, doc) => {
//   console.log(doc)
// })

module.exports = {
  mongoose,
  user,
  chat
};