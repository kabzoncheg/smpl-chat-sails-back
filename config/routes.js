module.exports.routes = {

  'PUT /user/signup': 'UserController.signup',
  'GET /user/logout': 'UserController.logout',
  'PUT /user/check': 'UserController.checkLogin',

  'GET /chat/populate': 'ChatController.populate',
  'PUT /chat/join': 'ChatController.joinChat',
  'PUT /chat/chat': 'ChatController.chat',
  'POST /chat/keepalive': 'ChatController.keepalive',
};
