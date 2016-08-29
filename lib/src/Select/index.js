"use strict";

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// import BaserElement from './BaserElement';
var FormElement_1 = require('../FormElement');
/**
 * セレクトボックスの拡張クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
var Select = function (_super) {
    __extends(Select, _super);
    function Select() {
        _super.apply(this, arguments);
    }
    return Select;
}(FormElement_1["default"]);
exports.__esModule = true;
exports["default"] = Select;