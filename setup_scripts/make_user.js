const mongoose = require('mongoose');

const dbName = 'Mail'; // default for now, setup config for this later
const User = require('../models/user');
mongoose.connect('mongodb://localhost/' + dbName);

const input = {
  username: process.argv[2],
  password: process.argv[3],
};

const newUser = new User(input);

newUser.save().then(() => {
  console.log('sucessfully saved user');
  mongoose.connection.close();
});