const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const sql = require('./db');
const JwtSecret = require('../../environments/secrets.js');

class User {
  constructor(username) {
    this.id = null;
    this.username = username;
    this.hash = null;
    this.salt = crypto.randomBytes(16).toString('hex');
  }

  save(callback) {
    const statement = 'INSERT INTO users (email, password_hash, salt) VALUES (?, ?, ?)';
    const parameters = [this.username, this.hash, this.salt];

    sql.query(statement, parameters, (err, result) => {
        if (err) {
            throw err;
        }

        this.id = result.insertId;
        callback.call(this);
    });
  };

  get(password, callback) {
    const statement = 'SELECT id, password_hash, salt FROM users WHERE email = ?';
    const parameters = [this.username];
    sql.query(statement, parameters, (err, result) => {
        if (err) {
            throw err;
        }

        if (result.length == 0) {
          callback.call(this, null);
          return;
        }

        var entry = result[0];
        this.salt = entry.salt;
        this.hash = entry.password_hash;
        if (!this.validPassword(password)) {
          callback.call(this, null);
          return;
        }

        this.id = entry.id;
        callback.call(this, this);
    });
  };
  
  setPassword(password) {
    this.hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex');
  };

  validPassword(password) {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex');
    return this.hash === hash;
  };

  generateJwt() {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 1);
  
    return jwt.sign(
      {
        sub: this.id,
        username: this.username,
        exp: parseInt(expiry.getTime() / 1000)
      },
      JwtSecret.secret
    );
  };
}

module.exports = User;