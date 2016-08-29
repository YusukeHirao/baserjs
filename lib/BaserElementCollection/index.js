"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaserElement_1 = require('../BaserElement');

var BaserElementCollection = function () {
    function BaserElementCollection(nodeList) {
        _classCallCheck(this, BaserElementCollection);

        this.nodeList = nodeList;
    }

    _createClass(BaserElementCollection, [{
        key: Symbol.iterator,
        value: function value() {
            return this.nodeList.values();
        }
    }], [{
        key: "each",
        value: function each(elementList) {
            var baserElList = [];
            for (var i = 0, l = elementList.length; i < l; i++) {
                baserElList.push(new BaserElement_1.default(elementList[i]));
            }
            return new BaserElementCollection(baserElList);
        }
    }]);

    return BaserElementCollection;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaserElementCollection;