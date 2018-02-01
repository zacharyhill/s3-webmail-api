var multer  = require('multer');
const { Router } = require('express');

// route controllers
const changeReadStatus = require('../controllers/changeReadStatus');
const checkToken = require('../controllers/checkToken');
const deleteFromDB = require('../controllers/deleteFromDB');
const downloadAttachment = require('../controllers/downloadAttachment');
const getMailFromDB = require('../controllers/getMailFromDB');
const getNewMail = require('../controllers/getNewMail');
const sendMail = require('../controllers/sendMail');
const uploadFile = require('../controllers/uploadFile');

// for file uploads
var upload = multer({ dest: 'data/uploads/' }); // set each user to have their own dir eventually

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
// download attachment
secureRoutes.get('/attachment/:file', downloadAttachment);

/*
** PATCH ROUTES
*/
// mark as read/unread
secureRoutes.patch('/changeReadStatus/:id/:read', changeReadStatus);

/*
** POST ROUTES
*/
// send mail
secureRoutes.post('/mail', sendMail);
// upload attachment
secureRoutes.post('/attachment', upload.single('file'), uploadFile);

/*
** DELETE ROUTES
*/
// delete mail from db
secureRoutes.delete('/mail/:id', deleteFromDB);


module.exports = secureRoutes;