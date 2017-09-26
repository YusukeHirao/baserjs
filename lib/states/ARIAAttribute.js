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
    'aria-pressed': 'tristate',
    'aria-expanded': 'optionalBoolean',
    'aria-selected': 'optionalBoolean',
    'aria-activedescendant': 'idReference',
};
var defaultValues = {
    'aria-atomic': false,
    'aria-busy': false,
    'aria-controls': [],
    'aria-describedby': [],
    'aria-disabled': false,
    'aria-dropeffect': new Set(['none']),
    'aria-flowto': [],
    'aria-grabbed': undefined,
    'aria-haspopup': false,
    'aria-hidden': false,
    'aria-invalid': false,
    'aria-label': '',
    'aria-labelledby': [],
    'aria-live': 'off',
    'aria-owns': [],
    'aria-relevant': new Set(['additions', 'text']),
    'aria-pressed': undefined,
    'aria-expanded': undefined,
    'aria-selected': undefined,
    'aria-activedescendant': '',
};
var optimizer = {
    boolean: function (v) {
        return v === 'true' ? true : v === 'false' ? false : !!v;
    },
    tristate: function (v) {
        if (v === 'mixed') {
            return v;
        }
        return optimizer.boolean(v);
    },
    optionalBoolean: function (v) {
        if (v == null) {
            return;
        }
        return optimizer.boolean(v);
    },
    idReference: function (v) {
        return optimizer.string(v);
    },
    idReferenceList: function (v) {
        if (Array.isArray(v)) {
            return v.map(function (i) { return optimizer.idReference(i); });
        }
        return optimizer.idReference(v).split(/\s+/g).map(function (i) { return optimizer.idReference(i); });
    },
    string: function (v) {
        return ("" + v).trim();
    },
    ariaDropeffectTokenList: function (v) {
        if (v instanceof Set) {
            v = Array.from(v).slice();
        }
        var a = Array.isArray(v) ? v : ("" + v).split(/\s+/g);
        var list = ['copy', 'move', 'link', 'execute', 'popup', 'none'];
        var values = a.map(function (val) { return list.includes("" + val) ? "" + val : ''; }).filter(function (val) { return val; });
        return new Set(values);
    },
    ariaInvalidToken: function (v) {
        switch (v) {
            case 'grammar':
            case 'spelling':
                return v;
        }
        return !!v;
    },
    ariaLiveToken: function (v) {
        switch (v) {
            case 'polite':
            case 'assertive':
                return v;
        }
        return 'off';
    },
    ariaRelevantTokenList: function (v) {
        if (v instanceof Set) {
            v = Array.from(v).slice();
        }
        var a = Array.isArray(v) ? v : ("" + v).split(/\s+/g);
        var list = ['additions', 'removals', 'text', 'all'];
        var values = a.map(function (val) { return list.includes("" + val) ? "" + val : ''; }).filter(function (val) { return val; });
        return new Set(values);
    },
};
var ARIAAttribute = /** @class */ (function () {
    function ARIAAttribute(owner, attrName) {
        this._owner = owner;
        this._name = attrName;
        this.set(this._owner.getAttr(this._name) || defaultValues[this._name]);
    }
    ARIAAttribute.prototype.set = function (value) {
        this._value = this.optimize(value);
        var attrValue = this.toString();
        if (attrValue === '') {
            this._owner.removeAttr(this._name);
        }
        else {
            this._owner.setAttr(this._name, attrValue);
        }
    };
    ARIAAttribute.prototype.get = function () {
        return this._value;
    };
    ARIAAttribute.prototype.optimize = function (value) {
        return optimizer[relation[this._name]](value);
    };
    ARIAAttribute.prototype.toString = function () {
        var v = this._value;
        if (v instanceof Set) {
            v = Array.from(v).slice();
        }
        if (Array.isArray(v)) {
            return v.join(' ');
        }
        if (v == null) {
            return '';
        }
        return "" + v;
    };
    return ARIAAttribute;
}());
exports.default = ARIAAttribute;
