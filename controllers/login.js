const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

async function authenticateUser(username, password) {
  const users = await User.find({ username });
  if (users.length) {
    const user = users[0];
    console.log('user password hash: ', user.password);
    const samePassword = await checkPassword(password, user.password);
    return samePassword;
  }
  else {
    const err = new Error('incorrect username');
    err.code = 403;
    throw err;
  }
}

async function checkPassword(password, hash) {
  const result =  await bcrypt.compare(password, hash);
  return result;
}

function getToken(user) {
  return jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: '1h',  // set to expire in 1 hour (defaults to never)
  });
}

async function login(req, res, next) {
  /*
  ** below we authenticate our user before sending them a token
  */
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  try {
    const authenticated = await authenticateUser(user.username, user.password);
    if (authenticated) {
      const token = getToken(user);
      res.json({ token });
    }
    else {
      const err = new Error('incorrect password');
      err.code = 403;
      throw err;
    }
  }
  catch(err) {
    if (err.code === 403) {
      res.status(403).json({
        message: 'invalid login'
      });
    }
    else {
      // pass error to next middleware function
      next(err);
    }
  }    
}

module.exports = login;