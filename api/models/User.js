/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  migrate: 'drop',

  attributes: {

      uuid: {
        type: 'string',
        primaryKey: 'true',
        required: 'true',
        unique: 'true'
      },

      nickname: {
        type: 'string',
        required: 'true',
        unique: 'true',
        size: 30
      },

      messages: {
        collection: 'chat',
        via: 'sender'
      }
  }
};

