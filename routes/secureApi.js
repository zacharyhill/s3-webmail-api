const jwt = require('jsonwebtoken');
const Mail = require('../models/mail');
const { Router } = require('express');
const s3etm = require('s3-emails-to-mongo');

const getMailFromDB = require('./getMailFromDB');
const verifyToken = require('./verifyToken');

const secureRoutes = Router();

// MAKE THIS PART DYNAMIC LATER
s3etm.configure({
  Bucket: 'zhillb-mail',
});

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



/*
** START ROUTES
*/
// check if token has been verified 
secureRoutes.get('/verifyToken', verifyToken);

// gets mail already indexed in database
secureRoutes.get('/mail', getMailFromDB);

// checks for new mail and indexes it in db
secureRoutes.get('/newMail', async (req, res) => {
  try {
    const newMail = await s3etm();
    res.json(newMail);
  } catch(err) {
    net(err);
  }
});

module.exports = secureRoutes;