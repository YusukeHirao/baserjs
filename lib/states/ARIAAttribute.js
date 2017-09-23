"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var relation = {
    'aria-atomic': 'boolean',
    'aria-busy': 'boolean',
};
var defaultValues = {
    'aria-atomic': 'false',
    'aria-busy': 'false',
};
var optimizer = {
    boolean: function (v) {
        return v === 'true' ? v : 'false';
    },
};
var ARIAAttribute = /** @class */ (function () {
    function ARIAAttribute(owner, attrName) {
        this._owner = owner;
        this._name = attrName;
        this._value = defaultValues[this._name];
    }
    ARIAAttribute.prototype.set = function (value) {
        var a = optimizer[relation[this._name]](value);
    };
    ARIAAttribute.prototype.get = function () {
        return this._value;
    };
    ARIAAttribute.prototype._getValueFromDOMElement = function () {
        var raw = this._owner.getAttr(this._name);
    };
    return ARIAAttribute;
}());
exports.default = ARIAAttribute;
