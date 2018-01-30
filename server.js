const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const apiRoutes = require('./routes/api');
const secureApiRoutes = require('./routes/secureApi');

/*
** set config options
*/
const dbName = 'Mail'; // default for now, setup config for this later
const PORT = process.env.PORT || 3000;
process.env.SECRET_KEY = 'my_secret_key';

/*
** initialize app and connect to db
*/
const app = express();
mongoose.connect('mongodb://localhost/' + dbName);

/*
** for parsing incoming request bodies
** available under 'req.body'
*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
** setup routes
*/
app.use('/api', apiRoutes);
app.use('/secure-api', secureApiRoutes);

/*
** start server
*/
const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}!`);
});

/*
** close db connection when server stops
*/
process.on( 'SIGTERM', () => {
  server.close( () => {
    mongoose.connection.close();
    console.log('closed db connection');
  });
});
