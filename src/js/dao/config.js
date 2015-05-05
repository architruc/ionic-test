/**
 * Created by Architruc on 20/04/2015.
 */
"use strict";

angular.module('config', [])
    .constant('DB_CONFIG', {
        name: 'DB',
        tables: [
            {
                name: 'Message',
                columns: [
                    {name: 'id', type: 'integer primary key'},// autoincrement
                    {name: 'name', type: 'text'},
                    {name: 'lastText', type: 'text'},
                    {name: 'face', type: 'text'}
                ]
            }, {
                name: 'Account',
                columns: [
                    {name: 'id', type: 'integer primary key'},// autoincrement
                    {name: 'username', type: 'text unique'},
                    {name: 'name', type: 'text'},
                    {name: 'enableFriends', type: 'boolean'}
                ]
            }
        ]
    });