const bcrypt = require('bcrypt');

function hashPassword(passwordToHash) {
  const saltRounds = 10;
  bcrypt.hash(passwordToHash, saltRounds, (err, hash) => {
    if (err) console.log(err);
    console.log(hash);
  });
}

hashPassword(process.argv[2]);