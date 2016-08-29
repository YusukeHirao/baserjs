"use strict";

var BaserElement_1 = require('../BaserElement');
var BaserElementCollection = function () {
    function BaserElementCollection(nodeList) {
        this.nodeList = nodeList;
    }
    BaserElementCollection.each = function (elementList) {
        var baserElList = [];
        for (var i = 0, l = elementList.length; i < l; i++) {
            baserElList.push(new BaserElement_1["default"](elementList[i]));
        }
        return new BaserElementCollection(baserElList);
    };
    BaserElementCollection.prototype[Symbol.iterator] = function () {
        return this.nodeList.values();
    };
    return BaserElementCollection;
}();
exports.__esModule = true;
exports["default"] = BaserElementCollection;