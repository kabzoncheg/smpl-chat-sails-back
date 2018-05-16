var uuid = require('node-uuid');

module.exports = {

  signup: function(req, res) {
    if (_.isUndefined(req.param('nickname'))) {
        return res.json({
          status: 'clientError',
          code: 400,
          body: {
            error: 'Nickname is required'
          }
        });
    }

    if (req.param('nickname').length > 30) {
      return res.json({
        status: 'clientError',
        code: 400,
        body: {
          error: 'Nickname must be less than 30 characters'
        }
      });
    }

    if (!_.isString(req.param('nickname')) || req.param('nickname').match(/[^a-z0-9]/i)) {
      return res.json({
        status: 'clientError',
        code: 400,
        body: {
          error: 'Invalid nickname: must consist of numbers and letters only.'
        }
      });
    }

    if (req.session.userId) {
     User.findOne({uuid: req.session.userId}).exec(function foundUser(err, user) {
        if (err) return res.negotiate(err);
        if (user) {
          return res.json({
            status: 'success',
            code: 200,
            body: {
              uuid: req.session.userId,
              nickname: user.nickname,
              error: null
            }
          });
        }
        req.session.userId = null;
        sails.log.verbose('Session refers to a user who no longer exists.');
      });
    } else {

      var user_uuid = function () {
        return uuid.v4();
      };

      var options = {
        uuid: user_uuid(),
        nickname: req.param('nickname')
      };

      User.create(options).exec(function (err, createdUser) {
        if (err) {
          if (err.invalidAttributes && err.invalidAttributes.nickname && err.invalidAttributes.nickname[0] && err.invalidAttributes.nickname[0].rule === 'unique') {
            return res.json({
              status: 'clientError',
              code: 409,
              body: {
                error: 'Nickname is already taken by another user, please try again.'
              }
            });
          }
          return res.negotiate(err);
        }

        req.session.userId = createdUser.uuid;
        return res.json({
          status: 'success',
          code: 201,
          body: {
            uuid: req.session.userId,
            nickname: createdUser.nickname,
            error: null
          }
        });
      });
    }
  },


  checkLogin: function (req, res) {
    if (req.session.userId) {
      User.findOne({uuid: req.session.userId}).exec(function foundUser(err, user) {
        if (err) return res.negotiate(err);
        if (user) {
          return res.json({
            status: 'success',
            code: 200,
            body: {
              uuid: req.session.userId,
              nickname: user.nickname,
              error: null
            }
          });
        }
        req.session.userId = null;
        sails.log.verbose('Session refers to a user who no longer exists.');
      });
    } else {
      return res.json({
        status: 'success',
        code: 200,
        body: {
          session: null,
          error: null
        }
      });
    }
  },


  logout: function (req, res) {
    if (!req.session.userId) return res.json({
      status: 'success',
      code: 200,
      body: {
        msg: 'Session does not exist!',
        error: null
      }
    });

    User.find({uuid: req.session.userId}).exec(function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        req.session.userId = null;
        return res.json({
          status: 'success',
          code: 200,
          body: {
            msg: 'Session refers to a user who no longer exists. Session cleared',
            error: null
          }
        });
      }

      User.destroy({uuid: req.session.userId}).exec(function (err, usersDestroyed) {
        if (err) {
          sails.log.verbose('Cannot delete a user who no longer exists.');
        }
        req.session.userId = null;
        return res.json({
          status: 'success',
          code: 200,
          body: {
            msg: 'Session cleared',
            error: null
          }
        });
      });
    });
  }
};
