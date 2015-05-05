"use strict";

import Message from './../model/Message.js';
import _ from 'underscore';
//import './dao/db.js';

angular.module('chatService', ['messageDao'])

    .factory('Chats', function (messageDao) {
        //console.log(messageDao);
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [];

        //var chats = [
        //    new Message('Ben Sparrow', 'You on your way?', '/img/Ben Sparrow.png'),
        //    new Message('Max Lynx', 'Hey, it\'s me', '/img/Max Lynx.jpg'),
        //    new Message('Andrew Jostlin', 'Did you get the ice cream?', '/img/Andrew Jostlin.jpeg'),
        //    new Message('Adam Bradleyson', 'I should buy a boat', '/img/Adam Bradleyson.jpeg'),
        //    new Message('Perry Governor', 'Look at my mukluks!', '/img/Perry Governor.jpeg')
        //];
        //_.each(chats, function(chat) {
        //    messageDao.insert(chat).then(null, function(error) {
        //        console.error("Error while inserting:", error);
        //    });
        //});

        return {
            all: function () {
                chats = messageDao.all();
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
                messageDao.remove(chat.id);
            },
            get: function (chatId) {
                return messageDao.findById(chatId);
                //for (var i = 0; i < chats.length; i++) {
                //    if (chats[i].id === parseInt(chatId)) {
                //        return chats[i];
                //    }
                //}
                //return null;
            },
            add: function(message) {
                message = new Message(message);
                chats.push(message);
                messageDao.insert(message).then(null, function(error) {
                    console.error("Error while inserting:", error);
                });
            }
        };
    });