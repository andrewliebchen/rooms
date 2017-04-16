import { Mongo } from 'meteor/mongo';

export const Rooms = new Mongo.Collection('rooms');

Meteor.methods({
  createRoom(params) {
    return Rooms.insert({
      name: params.name,
      createdAt: params.createdAt,
      createdBy: params.createdBy,
    });
  }
});
