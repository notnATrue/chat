const db = require("../db");

const createNewUser = async currentUser => {
  console.log(currentUser);
  const newUser = new db.user(currentUser);
  newUser.save({ newUser }, (err, data) => {
    return console.log(`created new user:${data}`);
  });
};

function checkUserExistanse(currentUser) {
  console.log(currentUser.username);
  return new Promise(resolve => {
    db.user.find({ username: currentUser.username }, (err, data) => {
      console.log(data);
      resolve(data);
    });
  });
}

module.exports = {
  createNewUser,
  checkUserExistanse
};
