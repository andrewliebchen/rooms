import { Mongo } from 'meteor/mongo';

export const Rooms = new Mongo.Collection('rooms');

Meteor.startup(() => {
  if (Rooms.find({}).fetch().length === 0) {
    console.log('Adding default room');
    Meteor.call('createRoom', {
      name: 'Default Room',
      createdAt: Date.now(),
      createdBy: null,
    });
  }
});

Meteor.methods({
  createRoom(params) {
    return Rooms.insert({
      name: params.name,
      createdAt: params.createdAt,
      createdBy: params.createdBy,
    });
  },

  destroyRoom(id) {
    Rooms.remove(id);
  }
});
