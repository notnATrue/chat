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
};

function checkPwd(user) {
    // console.log(user)
    return new Promise((resolve) => {
      db.user.findOne({username: user.username}, (err, data) => {
        if (err) throw err;
        if (data && user.password === data.password) {
          resolve(data)
        } else {
          resolve("some error")
        }
      })
    })
  }

module.exports = {
  createNewUser,
  checkUserExistanse,
  checkPwd
};
