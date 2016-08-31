"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaserElement_1 = require('../BaserElement');

var BaserElementCollection = function () {
    // public static each (elementList: HTMLCollection): BaserElementCollection {
    // 	const baserElList: BaserElement[] = [];
    // 	for (let i: number = 0, l: number = elementList.length; i < l; i++) {
    // 		baserElList.push(new BaserElement(elementList[i] as HTMLElement));
    // 	}
    // 	return new BaserElementCollection(baserElList);
    // }
    function BaserElementCollection(nodeList) {
        _classCallCheck(this, BaserElementCollection);

        this._nodeList = [];
        for (var i = 0, l = nodeList.length; i < l; i++) {
            var el = nodeList.item(i);
            var baserEl = new BaserElement_1.default(el);
            this._nodeList.push(baserEl);
        }
    }

    _createClass(BaserElementCollection, [{
        key: Symbol.iterator,
        value: function value() {
            return this._nodeList.values();
        }
    }]);

    return BaserElementCollection;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaserElementCollection;