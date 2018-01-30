const { Router } = require('express');

const checkToken = require('../controllers/checkToken');
const getMailFromDB = require('../controllers/getMailFromDB');
const getNewMail = require('../controllers/getNewMail');

const verifyTokenMiddleware = require('../controllers/middleware/verifyToken');

const secureRoutes = Router();

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
secureRoutes.get('/newMail', getNewMail);

module.exports = secureRoutes;