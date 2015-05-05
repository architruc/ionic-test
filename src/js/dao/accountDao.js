/**
 * Created by Architruc on 20/04/2015.
 */
"use strict";

angular.module('accountDao', ['db'])
    .factory('accountDao', function (db) {

        //function updateEnableFriends(id, enableFriends) {
        //    if (id) {
        //        db.upsert('enableFriends');
        //    } else {
        //        db.insert({enableFriends: enableFriends}, 'Account');
        //    }
        //}

        function upsertAccount(username, account) {
            return db.upsertByFieldName('username', username, account, 'Account');
        }

        function insertAccount(account) {
            return db.insert(account, 'Account');
        }

        function checkBooleans(result) {
            result.$promise = result.$promise.then(function() {
                result.enableFriends = result.enableFriends !== 0; // int to boolean
                return result;
            });
            return result;
        }

        function getAccount(username) {
            return checkBooleans(db.findOneByFieldName("username", username, 'Account'));
        }

        return {
            upsertAccount: upsertAccount,
            insertAccount: insertAccount,
            getAccount: getAccount
        };
    });