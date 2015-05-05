/**
 * Created by Architruc on 19/04/2015.
 */
"use strict";

import _ from 'underscore';
import 'ngCordova';

angular.module('db', ['config', 'ngCordova']).factory("db", function ($q, DB_CONFIG, $cordovaSQLite) {
    //return window.openDatabase("ionic1", "1.0", "Ionic 1", 10*1024*1024);

    var self = this;
    self.db = null;

    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        //self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);
        //self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name});
        if (window.sqlitePlugin) {
            self.db = $cordovaSQLite.openDB(DB_CONFIG.name);
        } else {
            self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);
        }

        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];

            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });

            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query).then(function() {
                //console.log('Table ' + table.name + ' initialized');
            }, function(error) {
                console.error("Error while initializing the Table " + table.name + ":", error);
            });
        });
    };

    //function executeOneQuery(transaction, query, bindings) {
    //    var deferred = $q.defer();
    //    transaction.executeSql(query, bindings, function(transaction, result) {
    //        deferred.resolve(result);
    //    }, function(transaction, error) {
    //        deferred.reject(error);
    //    });
    //    return deferred.promise;
    //}

    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        //console.log("Query:", query, "bindings:", bindings);

        var deferred = $q.defer();
        //var promises = [];
        self.db.transaction(function(transaction) {
            //if (arguments.length === 1 && _.isArray(query)) {
            //    _.each(query, function(queryObj) {
            //        promises.push(executeOneQuery(transaction, queryObj.query, queryObj.bindings));
            //    })
            //} else {
                //promises.push(executeOneQuery(transaction, query, bindings));
                transaction.executeSql(query, bindings, function(transaction, result) {
                    deferred.resolve(result);
                }, function(transaction, error) {
                    deferred.reject(error);
                });
                //promises.push(deferred.promise);
            //}
        });

        //if (promises.length === 1) {
        //    return promises[0];
        //} else {
        //    return $q.all(promises);
        //}

        return deferred.promise;
    };

    self.fetchAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }

        return output;
    };

    self.fetch = function(result) {
        if (result && result.rows && result.rows.length > 0) {
            return result.rows.item(0);
        }
        //console.log("result:", result);
        // else return undefined
    };

    // Utility methods

    function objWithPromise(promise) {
        var resultObj = {$promise: promise.then(function(result) {
            _.extend(resultObj, self.fetch(result));
            //console.log("resultObj:", resultObj);
            return resultObj;
        })};
        return resultObj;
    }

    function arrayWithPromise(promise) {
        var resultArray = [];
        resultArray.$promise = promise.then(function(result) {
            for (var i = 0; i < result.rows.length; i++) {
                resultArray.push(result.rows.item(i));
            }
            return resultArray;
        });
        return resultArray;
    }

    self.findAll = function(table) {
        return arrayWithPromise(self.query('SELECT * FROM ' + table));
    };

    self.findById = function(id, table) {
        //return objWithPromise(self.query('SELECT * FROM ' + table + ' WHERE id = ?', [id]));
        return self.findOneByFieldName('id', id, table);
    };

    self.findOneByFieldName = function(fieldName, fieldValue, table) {
        return objWithPromise(self.query('SELECT * FROM ' + table + ' WHERE ' + fieldName + ' = ?', [fieldValue]));
    };

    self.insert = function(object, table, orIgnore) {
        var keys = _.keys(object).join(',');
        //var values = _.values(object);
        var values = _.map(object, function(value) { return booleanToInteger(value); });
        var valuesStr = _.map(values, function() {return '?'}).join(',');
        return self.query('INSERT' + (orIgnore === true ? ' OR IGNORE' : '') + ' INTO ' + table + ' (' + keys + ') VALUES (' + valuesStr + ')', values);
    };

    self.upsert = function(id, object, table) {
        return self.updateById(id, object, table).then(function() {
            return self.insert(object, table, true);
        });
    };

    self.upsertByFieldName = function(fieldName, fieldValue, object, table) {
        return self.updateByFieldName(fieldName, fieldValue, object, table).then(function() {
            return self.insert(object, table, true);
        });
    };

    self.updateById = function(id, object, table) {
        return self.updateByFieldName('id', id, object, table);
        //var args = [];
        //var newValues = _.map(object, function(value, key) {
        //    if (!_.isUndefined(value)) {
        //        args.push(value);
        //        return key + '=?';
        //    }
        //}).join(',');
        //args.push(id);
        //return self.query('UPDATE ' + table + ' SET ' + newValues + ' WHERE id = ?', args);
    };

    function booleanToInteger(boolean) {
        if (_.isBoolean(boolean)) {
            return boolean === true ? 1 : 0;
        } else {
            return boolean;
        }
    }

    self.updateByFieldName = function(fieldName, fieldValue, object, table) {
        var args = [];
        var newValues = _.map(object, function(value, key) {
            if (!_.isUndefined(value)) {
                args.push(booleanToInteger(value));
                return key + '=?';
            }
        }).join(',');
        args.push(fieldValue);
        return self.query('UPDATE ' + table + ' SET ' + newValues + ' WHERE ' + fieldName + ' = ?', args);
    };

    self.remove = function(id, table) {
        return self.query('DELETE FROM ? WHERE id = ?', [table, id]);
    };

    return self;
});