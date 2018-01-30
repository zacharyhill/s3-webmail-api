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

// gets mail already indexed in database
secureRoutes.get('/mail', getMailFromDB);

// checks for new mail and indexes it in db
secureRoutes.get('/newMail', getNewMail);


module.exports = secureRoutes;