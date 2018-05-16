module.exports = {

  // TO DO Implement WS authentication!
  populate: function(req, res) {
    if (_.isUndefined(req.param('offset')) || !req.param('offset').match(/^\d+$/)) {
      return res.json({
        status: 'clientError',
        code: 400,
        body: {
          error: 'Integer offset is required'
        }
      });
    }

    var offset = req.param('offset');
    if (offset > 1000) {
      offset = 1000;
    }

    var dbQuery = Chat.find();
    dbQuery.limit(offset);
    dbQuery.exec(function foundUser(err, messages) {
      if (err) return res.negotiate(err);
      return res.json({
        status: 'success',
        code: 200,
        body: {
          messages: messages,
          error: null
        }
      });
    });
  },

  joinChat: function (req, res) {
    if (!req.isSocket) {
      return res.badRequest();
    }
    sails.sockets.join(req, 'chat');
    return res.ok();
  },

  chat: function (req, res) {
    if (!req.isSocket) {
      return res.badRequest();
    }

    Chat.create({
      message: req.body.message,
      sender: req.body.sender,
      guid: req.body.guid
    }).exec(function (err, createdMsg) {
      if (err) return res.negotiate(err);
      User.findOne({uuid: req.session.userId}).exec(function (err, foundUser) {
        if (err) return res.negotiate(err);
        if (!foundUser) return res.notFound;
        sails.sockets.broadcast('chat', 'message', req.body);
      })
    });
  },

  keepalive: function (req,res) {
    if (!req.isSocket) {
      return res.badRequest();
    }
    Chat.find({sender: req.session.userId}).exec(function foundUser(err, messages) {
      if (err) return res.negotiate(err);
      sails.sockets.broadcast('chat', 'keepalive', req.body);
    });

  }
};
