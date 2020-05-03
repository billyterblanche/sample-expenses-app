const User = require("../models/user.model.js");

module.exports.register = (req, res) => {
    const user = new User(req.body.username);
    user.setPassword(req.body.password);
    user.save(() => {
      res.status(200)
      .json();
    });
  };
  
  module.exports.login = (req, res) => {
    const user = new User(req.body.username);
    user.get(req.body.password, (user) => {
      if (user) {
        const token = user.generateJwt();
        res.status(200)
        .json({
          username: req.body.username,
          token: token
        });
      } else {
        res.status(401)
        .json({ message: 'We could not find an entry with the details supplied.' });
      }
    });
  };