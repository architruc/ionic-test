/**
 * Created by Architruc on 20/04/2015.
 */
"use strict";

import _ from 'underscore';

//var lastId = 0;
var defaultName = 'Ben Sparrow';
var defaultFace = '/img/Ben Sparrow.png';

export default class Message {
    constructor (name, lastText, face) {
        var oneArg = arguments.length === 1;
        if (oneArg && _.isObject(name)) {
            var oldMessage = name;
            //this.id = oldMessage.id || lastId++;
            this.name = oldMessage.name || defaultName;
            this.lastText = oldMessage.lastText;
            this.face = oldMessage.face || defaultFace;
        } else {
            if (oneArg) {
                lastText = name;
                name = undefined;
            }
            //this.id = lastId++;
            this.name = name || defaultName;
            this.lastText = lastText;
            this.face = face || defaultFace;
        }
    }
    toString() {
        return '(' + this.name + ': ' + this.lastText + ')';
    }
}