/**
 * Created by Architruc on 20/04/2015.
 */
"use strict";

import _ from 'underscore';

angular.module('accountService', ['accountDao'])
    .factory('accountService', function (accountDao) {

        var defaultAccount = {
            enableFriends: true
        };

        function saveEnableFriends(username, enableFriends) {
            //console.log("saveEnableFriends username:", username, "enableFriends:", enableFriends);
            if (username) {
                return accountDao.upsertAccount(username, {username: username, enableFriends: enableFriends}).then(null, function(err) {
                    console.error("Error while upserting Account: ", err.stack || err);
                });
            } else {
                return accountDao.insertAccount(_.extend({}, defaultAccount, {username: username, enableFriends: enableFriends}));
            }
        }

        //function areFriendsEnabled(id) {
        //    if (id) {
        //        return accountDao.areFriendsEnabled(id);
        //    } else {
        //        return defaultFriendsStored;
        //    }
        //}

        function getAccount(username) {
            var account = accountDao.getAccount(username);
            account.$promise = account.$promise.then(function(foundAccount) {
                if (foundAccount) {
                    return foundAccount;
                }
                defaultAccount.username = username;
                _.extend(account, defaultAccount);
                return account;
            //}).then(function(foundAccount) {
            //    console.log("foundAccount:", foundAccount);
            //    console.log("account:", account);
            //    _.extend(account, foundAccount);
            //    console.log("account:", account);
            //    return account;
            }).then(null, function(error) {
                console.error('Error while getting the account:', error.stack || error);
            });
            return account;
        }

        return {
            saveEnableFriends: saveEnableFriends,
            getAccount: getAccount
        };
    });