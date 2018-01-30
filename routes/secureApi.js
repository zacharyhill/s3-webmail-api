const jwt = require('jsonwebtoken');
const Mail = require('../models/mail');
const { Router } = require('express');
const s3etm = require('s3-emails-to-mongo');

const getMailFromDB = require('../controllers/getMailFromDB');
const checkToken = require('../controllers/checkToken');

const verifyTokenMiddleware = require('../controllers/middleware/verifyToken');

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
secureRoutes.use(verifyTokenMiddleware);



/*
** START ROUTES
*/
// check if token has been verified 
secureRoutes.get('/checkToken', checkToken);

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