const { Router } = require('express');

// route controllers
const checkToken = require('../controllers/checkToken');
const getMailFromDB = require('../controllers/getMailFromDB');
const getNewMail = require('../controllers/getNewMail');

// route middleware
const verifyTokenMiddleware = require('../controllers/middleware/verifyToken');

const secureRoutes = Router();

/*
** validation middleware
*/
secureRoutes.use(verifyTokenMiddleware);


/*
** START ROUTES
*/
// check if token has been verified 
secureRoutes.get('/checkToken', checkToken);

// get mail already indexed in database
secureRoutes.get('/mail', getMailFromDB);

// check for new mail and index it in db
secureRoutes.get('/newMail', getNewMail);


module.exports = secureRoutes;