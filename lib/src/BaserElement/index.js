"use strict";

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var String_1 = require('../Util/String');
var EventDispatcher_1 = require('../EventDispatcher');
var EnumElementClassNameCase_1 = require('./EnumElementClassNameCase');
var EnumClassNameSeparatorForBEM_1 = require('./EnumClassNameSeparatorForBEM');
var HYPHEN = '-';
var DOUBLE_HYPHEN = '--';
var UNDERSCORE = '_';
var DOUBLE_UNDERSCORE = '__';
var elementizedMap = new WeakMap();
/**
 * DOM要素の抽象クラス
 *
 * DOM要素操作に関するjQueryのメソッドは極力ここに集約したい
 * 脱jQueryの際にこのクラスを改修するだけで済むようにする
 *
 * @version 1.0.0
 * @since 0.0.1
 *
 */
var BaserElement = function (_super) {
    __extends(BaserElement, _super);
    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * TODO: クラス名のつき方の規則をきちんと決める
     *
     * @version 1.0.0
     * @since 0.0.1
     * @param $el 管理するDOM要素
     *
     */
    function BaserElement(el) {
        _super.call(this);
        /**
         * 管理するDOM要素のname属性値
         *
         * @version 0.0.1
         * @since 0.0.1
         *
         */
        this.name = '';
        /**
         *
         */
        this._elementized = false;
        this.el = el;
        // 既にbaserJSのエレメント化している場合
        if (this._isElementized()) {
            if ('console' in window) {
                console.warn('This element is elementized of baserJS.');
            }
            this._elementized = true;
            return;
        }
        this._elementize();
        // ID・nameの抽出 & 生成
        var id = el.id || String_1["default"].UID();
        var name = el.getAttribute('name') || '';
        el.id = id;
        this.id = id;
        this.name = name;
        // 共通クラスの付加
        this.addClass(BaserElement.classNameElementCommon);
    }
    /**
     *
     */
    BaserElement.createElement = function (options, attr, style) {
        var el = document.createElement(options.tagName);
        if (options.text) {
            var text = document.createTextNode(options.text);
            el.appendChild(text);
        }
        return el;
    };
    /**
     * BEMベースでクラス名文字列を生成する
     *
     * @version 0.9.0
     * @since 0.1.0
     * @param blockName ブロック名
     * @param elementName 要素名
     * @param modifierName 状態名
     * @return 生成されたクラス名
     *
     */
    BaserElement.createClassName = function (blockNames, elementNames, modifierName) {
        if (elementNames === void 0) {
            elementNames = '';
        }
        if (modifierName === void 0) {
            modifierName = '';
        }
        var className = '';
        var prefix;
        var separator = '';
        var elementSeparator = '';
        var modifierSeparator = '';
        switch (BaserElement.classNameDefaultCase) {
            case EnumElementClassNameCase_1["default"].HYPHEN_DELIMITED:
                {
                    separator = HYPHEN;
                    blockNames = String_1["default"].hyphenDelimited(blockNames);
                    elementNames = String_1["default"].hyphenDelimited(elementNames);
                    modifierName = String_1["default"].hyphenDelimited(modifierName);
                }
                break;
            case EnumElementClassNameCase_1["default"].SNAKE_CASE:
                {
                    separator = UNDERSCORE;
                    blockNames = String_1["default"].snakeCase(blockNames);
                    elementNames = String_1["default"].snakeCase(elementNames);
                    modifierName = String_1["default"].snakeCase(modifierName);
                }
                break;
            case EnumElementClassNameCase_1["default"].CAMEL_CASE:
                {
                    separator = '';
                    blockNames = String_1["default"].camelCase(blockNames, true);
                    elementNames = String_1["default"].camelCase(elementNames);
                    modifierName = String_1["default"].camelCase(modifierName);
                }
                break;
            default:
                {}
        }
        switch (BaserElement.classNameDefaultSeparatorForElement) {
            case EnumClassNameSeparatorForBEM_1["default"].HYPHEN:
                {
                    elementSeparator = HYPHEN;
                }
                break;
            case EnumClassNameSeparatorForBEM_1["default"].DOUBLE_HYPHEN:
                {
                    elementSeparator = DOUBLE_HYPHEN;
                }
                break;
            case EnumClassNameSeparatorForBEM_1["default"].UNDERSCORE:
                {
                    elementSeparator = UNDERSCORE;
                }
                break;
            case EnumClassNameSeparatorForBEM_1["default"].DOUBLE_UNDERSCORE:
                {
                    elementSeparator = DOUBLE_UNDERSCORE;
                }
                break;
            case EnumClassNameSeparatorForBEM_1["default"].CAMEL_CASE:
                {
                    elementSeparator = '';
                }
                break;
            default:
                {}
        }
        switch (BaserElement.classNameDefaultSeparatorForModifier) {
            case EnumClassNameSeparatorForBEM_1["default"].HYPHEN:
                {
                    modifierSeparator = HYPHEN;
                }
                break;
            case EnumClassNameSeparatorForBEM_1["default"].DOUBLE_HYPHEN:
                {
                    modifierSeparator = DOUBLE_HYPHEN;
                }
                break;
            case EnumClassNameSeparatorForBEM_1["default"].UNDERSCORE:
                {
                    modifierSeparator = UNDERSCORE;
                }
                break;
            case EnumClassNameSeparatorForBEM_1["default"].DOUBLE_UNDERSCORE:
                {
                    modifierSeparator = DOUBLE_UNDERSCORE;
                }
                break;
            case EnumClassNameSeparatorForBEM_1["default"].CAMEL_CASE:
                {
                    modifierSeparator = '';
                }
                break;
            default:
                {}
        }
        if (BaserElement.classNameDefaultPrefix) {
            prefix = BaserElement.classNameDefaultPrefix;
            prefix = prefix.replace(/^[^a-z_-]/i, '').replace(/[^a-z0-9_-]+/ig, '').replace(/^--+/, '-');
            className += prefix;
        }
        className += separator + blockNames;
        if (elementNames) {
            className += elementSeparator + elementNames;
        }
        if (modifierName) {
            className += modifierSeparator + modifierName;
        }
        return className;
    };
    /**
     * 要素の属性の真偽を判定する
     *
     * DOM APIの標準で判定できるものはそれで判断
     * 値なし属性の場合は存在すれば真
     * 値あり属性の場合は偽相等の文字列でなければ全て真とする
     * ただし値なし属性の場合は値が空文字列のため、偽相等の文字列の例外とする
     *
     * @version 0.10.0
     * @since 0.2.0
     * @param elem 対象のDOM要素
     * @param attrName 確認したい属性名
     * @return 結果
     *
     */
    BaserElement.getBoolAttr = function (elem, attrName) {
        // DOM APIの標準で判定できるものはそれで判断
        if (elem[attrName] === true) {
            return true;
        }
        var attr = elem.attributes.getNamedItem(attrName);
        if (attr) {
            var value = attr.value;
            if (value === '') {
                // 値なし属性の場合は存在すれば真
                return true;
            } else {
                return !String_1["default"].isFalsy(value);
            }
        } else {
            // 属性がない場合は偽
            return false;
        }
    };
    /**
     * クラス名を付加する
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.1.0
     * @param elem 対象のDOM要素
     * @param blockName ブロック名
     * @param elementName 要素名
     * @param modifierName 状態名
     *
     */
    BaserElement.addClass = function (elem, blockNames, elementNames, modifierName) {
        if (elementNames === void 0) {
            elementNames = '';
        }
        if (modifierName === void 0) {
            modifierName = '';
        }
        var $elem = $(elem);
        var className = BaserElement.createClassName(blockNames, elementNames, modifierName);
        $elem.addClass(className);
    };
    /**
     * クラス名を取り除く
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.1.0
     * @param elem 対象のDOM要素
     * @param blockName ブロック名
     * @param elementName 要素名
     * @param modifierName 状態名
     *
     */
    BaserElement.removeClass = function (elem, blockNames, elementNames, modifierName) {
        if (elementNames === void 0) {
            elementNames = '';
        }
        if (modifierName === void 0) {
            modifierName = '';
        }
        var $elem = $(elem);
        var className = BaserElement.createClassName(blockNames, elementNames, modifierName);
        $elem.removeClass(className);
    };
    /**
     * CSSプロパティをDOM要素から取り除く
     *
     * @version 1.0.0
     * @since 0.2.2
     * @param elem 対象のDOM要素
     * @param propName 取り除くCSSプロパティ
     *
     */
    BaserElement.removeCSSProp = function (elem, propName) {
        var style = elem.style;
        if (style) {
            style.removeProperty(propName);
        }
    };
    BaserElement.css = function (elem, styles) {
        $(elem).css(styles);
    };
    /**
     * クラス名を付加する
     *
     * @version 0.9.0
     * @since 0.1.0
     *
     */
    BaserElement.prototype.addClass = function (blockNames, elementNames, modifierName) {
        if (elementNames === void 0) {
            elementNames = '';
        }
        if (modifierName === void 0) {
            modifierName = '';
        }
        BaserElement.addClass(this.el, blockNames, elementNames, modifierName);
    };
    /**
     * 要素の属性の真偽を判定する
     *
     * `BaserElement.getBoolAttr` のインスタンスメソッド版
     *
     * @version 0.9.0
     * @since 0.2.0
     *
     */
    BaserElement.prototype.getBoolAttr = function (attrName) {
        return BaserElement.getBoolAttr(this.el, attrName);
    };
    /**
     * オプションとdata属性の値、属性の値をマージする
     *
     * use: jQuery
     *
     * TODO: テストを書く
     * TODO: サブクラスに反映させる
     *
     * @version 1.0.0
     * @since 0.8.0
     *
     */
    BaserElement.prototype.mergeOptions = function (defaultOptions, options) {
        var attrs = {};
        var dataAttrs = {};
        for (var optName in defaultOptions) {
            if (defaultOptions.hasOwnProperty(optName)) {
                // 属性はidとclassは除外する
                switch (optName) {
                    case 'id':
                    case 'class':
                        break;
                    default:
                        {
                            attrs[optName] = this.attr(optName);
                        }
                }
                dataAttrs[optName] = this.data(optName);
            }
        }
        return $.extend({}, defaultOptions, options, dataAttrs, attrs);
    };
    BaserElement.prototype.attr = function (key, value) {
        if (value === undefined) {
            return $(this.el).attr(key);
        } else {
            $(this.el).attr(key, value);
        }
    };
    BaserElement.prototype.data = function (key, value) {
        if (value === undefined) {
            return $(this.el).data(key);
        } else {
            $(this.el).data(key, value);
        }
    };
    /**
     *
     */
    BaserElement.prototype.closest = function (selector) {
        return $(this.el).closest(selector)[0];
    };
    BaserElement.prototype.val = function (value) {
        return $(this.el).val(value);
    };
    BaserElement.prototype.prop = function (key, value) {
        if (value === undefined) {
            return $(this.el).prop(key);
        } else {
            $(this.el).prop(key, value);
        }
    };
    /**
     *
     */
    BaserElement.prototype.wrap = function (wrapper) {
        $(this.el).wrap(wrapper);
    };
    /**
     * 既にbaserJSのエレメント化しているかどうか確認する
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    BaserElement.prototype._isElementized = function () {
        return this.__isElementized(BaserElement);
    };
    /**
     * baserJSのエレメント化したフラグを登録する
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    BaserElement.prototype._elementize = function () {
        this.__elementize(BaserElement);
    };
    /**
     * 既にbaserJSのエレメント化しているかどうか確認する
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    BaserElement.prototype.__isElementized = function (constructor /* Class */) {
        if (elementizedMap.has(this.el)) {
            var constructorList = elementizedMap.get(this.el);
            return constructorList.has(constructor._name);
        }
        return false;
    };
    /**
     * baserJSのエレメント化したフラグを登録する
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    BaserElement.prototype.__elementize = function (constructor /* Class */) {
        var constructorList;
        if (elementizedMap.has(this.el)) {
            constructorList = elementizedMap.get(this.el);
        } else {
            constructorList = new Set();
        }
        constructorList.add(constructor._name);
        elementizedMap.set(this.el, constructorList);
        console.log(constructor._name);
    };
    /**
     * クラス名のデフォルトのプレフィックス
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    BaserElement.classNameDefaultPrefix = '-bc';
    /**
     * インスタンスに付加するデフォルトのクラス名
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    BaserElement.classNameElementCommon = 'element';
    /**
     * クラス名のデフォルトの単語繋ぎの形式
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    BaserElement.classNameDefaultCase = EnumElementClassNameCase_1["default"].HYPHEN_DELIMITED;
    /**
     * BEMのエレメントのクラス名の繋ぎ文字
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    BaserElement.classNameDefaultSeparatorForElement = EnumClassNameSeparatorForBEM_1["default"].DOUBLE_UNDERSCORE;
    /**
     * BEMのモディファイアのクラス名の繋ぎ文字
     *
     * @version 0.1.0
     * @since 0.1.0
     *
     */
    BaserElement.classNameDefaultSeparatorForModifier = EnumClassNameSeparatorForBEM_1["default"].DOUBLE_HYPHEN;
    /**
     * クラス名
     */
    BaserElement._name = Symbol('BaserElement');
    return BaserElement;
}(EventDispatcher_1["default"]);
exports.__esModule = true;
exports["default"] = BaserElement;