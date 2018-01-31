const { Router } = require('express');

// route controllers
const changeReadStatus = require('../controllers/changeReadStatus');
const checkToken = require('../controllers/checkToken');
const getMailFromDB = require('../controllers/getMailFromDB');
const getNewMail = require('../controllers/getNewMail');

// route middleware
const verifyTokenMiddleware = require('../controllers/middleware/verifyToken');

const secureRoutes = Router();

secureRoutes.use(verifyTokenMiddleware);


/*
** GET ROUTES
*/
// check if token has been verified 
secureRoutes.get('/checkToken', checkToken);
// get mail already indexed in database
secureRoutes.get('/mail', getMailFromDB);
// check for new mail and index it in db
secureRoutes.get('/newMail', getNewMail);
// // get attachment
// secureRoutes.get('/attachment', );

/*
** PATCH ROUTES
*/
// mark as read/unread
secureRoutes.patch('/changeReadStatus/:read', changeReadStatus);

/*
** POST ROUTES
*/
// // send mail
// secureRoutes.post('/mail', );
// // upload attachment
// secureRoutes.post('/attachment', );

/*
** DELETE ROUTES
*/
// // delete mail from db
// secureRoutes.delete('/delete', );


module.exports = secureRoutes;