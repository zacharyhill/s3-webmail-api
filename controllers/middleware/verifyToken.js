const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  /*
  ** this allows us to send in our token via a header called "x-access-token"
  ** or in the url in the form of "?token=${token}", now we can access the token
  ** anywhere in our app by calling "process.env.TOKEN"
  */
    const token = req.headers['token'] || req.query.token;
    process.env.TOKEN = token;

    console.log('token: ', req.headers['token']);
  
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
  };