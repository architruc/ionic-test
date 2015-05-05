/**
 * Created by Architruc on 20/04/2015.
 */
"use strict";


angular.module('messageDao', ['db']).factory("messageDao", function(db) {

    function all() {
        return db.findAll('Message');
    }

    function findById(id) {
        return db.findById(id, 'Message');
    }

    function remove(id) {
        return db.query('DELETE FROM Message WHERE id = ?', [id]);
    }

    function insert(message) {
        return db.insert(message, 'Message');
    }

    return {
        all: all,
        findById: findById,
        remove: remove,
        insert: insert
    };
});