"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var BaserElement = function (_EventDispatcher_1$de) {
    _inherits(BaserElement, _EventDispatcher_1$de);

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
        _classCallCheck(this, BaserElement);

        /**
         * 管理するDOM要素のname属性値
         *
         * @version 0.0.1
         * @since 0.0.1
         *
         */
        var _this = _possibleConstructorReturn(this, (BaserElement.__proto__ || Object.getPrototypeOf(BaserElement)).call(this));

        _this.name = '';
        /**
         *
         */
        _this._elementized = false;
        _this.el = el;
        // 既にbaserJSのエレメント化している場合
        if (_this._isElementized()) {
            if ('console' in window) {
                console.warn('This element is elementized of baserJS.');
            }
            _this._elementized = true;
            return _possibleConstructorReturn(_this);
        }
        _this._elementize();
        // ID・nameの抽出 & 生成
        var id = el.id || String_1.default.UID();
        var name = el.getAttribute('name') || '';
        el.id = id;
        _this.id = id;
        _this.name = name;
        // 共通クラスの付加
        _this.addClass(BaserElement.classNameElementCommon);
        return _this;
    }
    /**
     *
     */


    _createClass(BaserElement, [{
        key: 'addClass',

        /**
         * クラス名を付加する
         *
         * @version 0.9.0
         * @since 0.1.0
         *
         */
        value: function addClass(blockNames) {
            var elementNames = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
            var modifierName = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

            BaserElement.addClass(this.el, blockNames, elementNames, modifierName);
        }
        /**
         * 要素の属性の真偽を判定する
         *
         * `BaserElement.getBoolAttr` のインスタンスメソッド版
         *
         * @version 0.9.0
         * @since 0.2.0
         *
         */

    }, {
        key: 'getBoolAttr',
        value: function getBoolAttr(attrName) {
            return BaserElement.getBoolAttr(this.el, attrName);
        }
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

    }, {
        key: 'mergeOptions',
        value: function mergeOptions(defaultOptions, options) {
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
        }
    }, {
        key: 'attr',
        value: function attr(key, value) {
            if (value === undefined) {
                return $(this.el).attr(key);
            } else {
                $(this.el).attr(key, value);
            }
        }
    }, {
        key: 'data',
        value: function data(key, value) {
            if (value === undefined) {
                return $(this.el).data(key);
            } else {
                $(this.el).data(key, value);
            }
        }
        /**
         *
         */

    }, {
        key: 'closest',
        value: function closest(selector) {
            return $(this.el).closest(selector)[0];
        }
    }, {
        key: 'val',
        value: function val(value) {
            return $(this.el).val(value);
        }
    }, {
        key: 'prop',
        value: function prop(key, value) {
            if (value === undefined) {
                return $(this.el).prop(key);
            } else {
                $(this.el).prop(key, value);
            }
        }
        /**
         *
         */

    }, {
        key: 'wrap',
        value: function wrap(wrapper) {
            $(this.el).wrap(wrapper);
        }
        /**
         * 既にbaserJSのエレメント化しているかどうか確認する
         *
         * @version 1.0.0
         * @since 1.0.0
         */

    }, {
        key: '_isElementized',
        value: function _isElementized() {
            return this.__isElementized(BaserElement);
        }
        /**
         * baserJSのエレメント化したフラグを登録する
         *
         * @version 1.0.0
         * @since 1.0.0
         */

    }, {
        key: '_elementize',
        value: function _elementize() {
            this.__elementize(BaserElement);
        }
        /**
         * 既にbaserJSのエレメント化しているかどうか確認する
         *
         * @version 1.0.0
         * @since 1.0.0
         */

    }, {
        key: '__isElementized',
        value: function __isElementized(constructor /* Class */) {
            if (elementizedMap.has(this.el)) {
                var constructorList = elementizedMap.get(this.el);
                return constructorList.has(constructor._name);
            }
            return false;
        }
        /**
         * baserJSのエレメント化したフラグを登録する
         *
         * @version 1.0.0
         * @since 1.0.0
         */

    }, {
        key: '__elementize',
        value: function __elementize(constructor /* Class */) {
            var constructorList = void 0;
            if (elementizedMap.has(this.el)) {
                constructorList = elementizedMap.get(this.el);
            } else {
                constructorList = new Set();
            }
            constructorList.add(constructor._name);
            elementizedMap.set(this.el, constructorList);
            console.log(constructor._name);
        }
    }], [{
        key: 'createElement',
        value: function createElement(options, attr, style) {
            var el = document.createElement(options.tagName);
            if (options.text) {
                var text = document.createTextNode(options.text);
                el.appendChild(text);
            }
            return el;
        }
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

    }, {
        key: 'createClassName',
        value: function createClassName(blockNames) {
            var elementNames = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
            var modifierName = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

            var className = '';
            var prefix = void 0;
            var separator = '';
            var elementSeparator = '';
            var modifierSeparator = '';
            switch (BaserElement.classNameDefaultCase) {
                case EnumElementClassNameCase_1.default.HYPHEN_DELIMITED:
                    {
                        separator = HYPHEN;
                        blockNames = String_1.default.hyphenDelimited(blockNames);
                        elementNames = String_1.default.hyphenDelimited(elementNames);
                        modifierName = String_1.default.hyphenDelimited(modifierName);
                    }
                    break;
                case EnumElementClassNameCase_1.default.SNAKE_CASE:
                    {
                        separator = UNDERSCORE;
                        blockNames = String_1.default.snakeCase(blockNames);
                        elementNames = String_1.default.snakeCase(elementNames);
                        modifierName = String_1.default.snakeCase(modifierName);
                    }
                    break;
                case EnumElementClassNameCase_1.default.CAMEL_CASE:
                    {
                        separator = '';
                        blockNames = String_1.default.camelCase(blockNames, true);
                        elementNames = String_1.default.camelCase(elementNames);
                        modifierName = String_1.default.camelCase(modifierName);
                    }
                    break;
                default:
                    {}
            }
            switch (BaserElement.classNameDefaultSeparatorForElement) {
                case EnumClassNameSeparatorForBEM_1.default.HYPHEN:
                    {
                        elementSeparator = HYPHEN;
                    }
                    break;
                case EnumClassNameSeparatorForBEM_1.default.DOUBLE_HYPHEN:
                    {
                        elementSeparator = DOUBLE_HYPHEN;
                    }
                    break;
                case EnumClassNameSeparatorForBEM_1.default.UNDERSCORE:
                    {
                        elementSeparator = UNDERSCORE;
                    }
                    break;
                case EnumClassNameSeparatorForBEM_1.default.DOUBLE_UNDERSCORE:
                    {
                        elementSeparator = DOUBLE_UNDERSCORE;
                    }
                    break;
                case EnumClassNameSeparatorForBEM_1.default.CAMEL_CASE:
                    {
                        elementSeparator = '';
                    }
                    break;
                default:
                    {}
            }
            switch (BaserElement.classNameDefaultSeparatorForModifier) {
                case EnumClassNameSeparatorForBEM_1.default.HYPHEN:
                    {
                        modifierSeparator = HYPHEN;
                    }
                    break;
                case EnumClassNameSeparatorForBEM_1.default.DOUBLE_HYPHEN:
                    {
                        modifierSeparator = DOUBLE_HYPHEN;
                    }
                    break;
                case EnumClassNameSeparatorForBEM_1.default.UNDERSCORE:
                    {
                        modifierSeparator = UNDERSCORE;
                    }
                    break;
                case EnumClassNameSeparatorForBEM_1.default.DOUBLE_UNDERSCORE:
                    {
                        modifierSeparator = DOUBLE_UNDERSCORE;
                    }
                    break;
                case EnumClassNameSeparatorForBEM_1.default.CAMEL_CASE:
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
        }
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

    }, {
        key: 'getBoolAttr',
        value: function getBoolAttr(elem, attrName) {
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
                    return !String_1.default.isFalsy(value);
                }
            } else {
                // 属性がない場合は偽
                return false;
            }
        }
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

    }, {
        key: 'addClass',
        value: function addClass(elem, blockNames) {
            var elementNames = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
            var modifierName = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

            var $elem = $(elem);
            var className = BaserElement.createClassName(blockNames, elementNames, modifierName);
            $elem.addClass(className);
        }
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

    }, {
        key: 'removeClass',
        value: function removeClass(elem, blockNames) {
            var elementNames = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];
            var modifierName = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

            var $elem = $(elem);
            var className = BaserElement.createClassName(blockNames, elementNames, modifierName);
            $elem.removeClass(className);
        }
        /**
         * CSSプロパティをDOM要素から取り除く
         *
         * @version 1.0.0
         * @since 0.2.2
         * @param elem 対象のDOM要素
         * @param propName 取り除くCSSプロパティ
         *
         */

    }, {
        key: 'removeCSSProp',
        value: function removeCSSProp(elem, propName) {
            var style = elem.style;
            if (style) {
                style.removeProperty(propName);
            }
        }
    }, {
        key: 'css',
        value: function css(elem, styles) {
            $(elem).css(styles);
        }
    }]);

    return BaserElement;
}(EventDispatcher_1.default);
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
BaserElement.classNameDefaultCase = EnumElementClassNameCase_1.default.HYPHEN_DELIMITED;
/**
 * BEMのエレメントのクラス名の繋ぎ文字
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
BaserElement.classNameDefaultSeparatorForElement = EnumClassNameSeparatorForBEM_1.default.DOUBLE_UNDERSCORE;
/**
 * BEMのモディファイアのクラス名の繋ぎ文字
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
BaserElement.classNameDefaultSeparatorForModifier = EnumClassNameSeparatorForBEM_1.default.DOUBLE_HYPHEN;
/**
 * クラス名
 */
BaserElement._name = Symbol('BaserElement');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BaserElement;