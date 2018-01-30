const jwt = require('jsonwebtoken');
const Mail = require('../models/mail');
const { Router } = require('express');

const secureRoutes = Router();

/*
** validation middleware
**
** this middleware will be run BEFORE our route logic is hit below
** it will of course only run on routes defined with "serverRoutes" variable
*/
secureRoutes.use((req, res, next) => {
/*
** this allows us to send in our token via a header called "x-access-token"
** or in the url in the form of "?token=${token}", now we can access the token
** anywhere in our app by calling "process.env.TOKEN"
*/
  const token = req.headers['x-access-token'] || req.query.token;
  process.env.TOKEN = token;

  /*
  ** checks if token exists and if it has been signed as expected
  ** i.e. it verifies token, or sends status 403 with error message in JSON
  */
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (!err) {
        // decode gives you the value of the object the JWT token was signed with
        next();
      }
      else {
        res.status(403).json({ error: "invalid token" });
      }
    });
  }
  else {
    res.status(403).json({ error: 'please send a token' });
  }
});


secureRoutes.get('/protected', (req, res) => {
  /*
  ** this will only be reached if our middleware calls
  ** the next() argument - as it does when the token is
  ** set and verified
  */
  res.json({
    message: 'successfully verified token',
  });
});

// gets mail already indexed in database
secureRoutes.get('/mail', async (req, res) => {
  try {
    const allMail = await Mail.find({});
    res.json(allMail);
  } catch(err) {
    next(err); // pass onto next middleware function
  }
});

module.exports = secureRoutes;