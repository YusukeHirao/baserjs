"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var relation = {
    'aria-atomic': 'boolean',
    'aria-busy': 'boolean',
    'aria-controls': 'idReferenceList',
    'aria-describedby': 'idReferenceList',
    'aria-disabled': 'boolean',
    'aria-dropeffect': 'ariaDropeffectTokenList',
    'aria-flowto': 'idReferenceList',
    'aria-grabbed': 'optionalBoolean',
    'aria-haspopup': 'boolean',
    'aria-hidden': 'boolean',
    'aria-invalid': 'ariaInvalidToken',
    'aria-label': 'string',
    'aria-labelledby': 'idReferenceList',
    'aria-live': 'ariaLiveToken',
    'aria-owns': 'idReferenceList',
    'aria-relevant': 'ariaRelevantTokenList',
};
var defaultValues = {
    'aria-atomic': 'false',
    'aria-busy': 'false',
    'aria-controls': '',
    'aria-describedby': '',
    'aria-disabled': 'false',
    'aria-dropeffect': 'none',
    'aria-flowto': '',
    'aria-grabbed': undefined,
    'aria-haspopup': 'false',
    'aria-hidden': 'false',
    'aria-invalid': 'false',
    'aria-label': '',
    'aria-labelledby': '',
    'aria-live': 'off',
    'aria-owns': '',
    'aria-relevant': 'additions text',
};
var optimizer = {
    boolean: function (v) {
        return v === 'true' ? v : 'false';
    },
    // tristate: (v) => {
    // 	switch (v) {
    // 		case 'true':
    // 		case 'false':
    // 		case 'mixin': {
    // 			return v;
    // 		}
    // 		default: {
    // 			return 'false';
    // 		}
    // 	}
    // },
    optionalBoolean: function (v) {
        if (v == null) {
            return;
        }
        return optimizer.boolean(v);
    },
    idReferenceList: function (v) {
        return "" + v;
    },
    string: function (v) {
        return "" + v;
    },
    ariaDropeffectTokenList: function (v) {
        var list = ['copy', 'move', 'link', 'execute', 'popup', 'none'];
        var values = ("" + v).split(/\s+/).map(function (val) { return list.includes(val) ? val : ''; }).filter(function (val) { return val; });
        return values.join(' ');
    },
    ariaInvalidToken: function (v) {
        switch (v) {
            case 'grammar':
            case 'spelling':
            case 'true': {
                return v;
            }
            default: {
                return 'false';
            }
        }
    },
    ariaLiveToken: function (v) {
        switch (v) {
            case 'polite':
            case 'assertive': {
                return v;
            }
            default: {
                return 'off';
            }
        }
    },
    ariaRelevantTokenList: function (v) {
        var list = ['additions', 'removals', 'text', 'all'];
        var values = ("" + v).split(/\s+/).map(function (val) { return list.includes(val) ? val : ''; }).filter(function (val) { return val; });
        return values.join(' ');
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
