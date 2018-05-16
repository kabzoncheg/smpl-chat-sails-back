/**
 * Chat.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  migrate: 'drop',

  attributes: {

    message: {
      type: 'string',
      required: 'true',
      size: 10000
    },

    guid: {
      type: 'string',
      required: 'true',
      size:60 //determine size later
    },

    sender: {
      model: 'user',
      required: 'true',
    },
  }
};

