/**!
* baserjs - v1.0.0-alpha
* revision: c922bffa8096f0ec21fbf04bac8bc81d3d673777
* update: 2016-08-29
* Author: baserCMS Users Community [https://github.com/baserproject/]
* Github: https://github.com/baserproject/baserjs
* License: Licensed under the MIT License
*/

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 110);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

var store      = __webpack_require__(39)('wks')
  , uid        = __webpack_require__(20)
  , Symbol     = __webpack_require__(1).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ },
/* 1 */
/***/ function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ },
/* 4 */
/***/ function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ },
/* 5 */
/***/ function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , hide      = __webpack_require__(10)
  , has       = __webpack_require__(4)
  , SRC       = __webpack_require__(20)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(5).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var String_1 = __webpack_require__(21);
var EventDispatcher_1 = __webpack_require__(15);
var EnumElementClassNameCase_1 = __webpack_require__(68);
var EnumClassNameSeparatorForBEM_1 = __webpack_require__(67);
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventDispatcher_1 = __webpack_require__(15);
var Locational_1 = __webpack_require__(73);
/**
 * ブラウザの情報を管理するクラス
 *
 * TODO: テストを書く（テストフレームワークの選定から）
 *
 * @version 0.9.0
 * @since 0.0.2
 *
 */

var Browser = function (_EventDispatcher_1$de) {
    _inherits(Browser, _EventDispatcher_1$de);

    /**
     * コンストラクタ
     *
     * @version 0.12.0
     * @since 0.0.2
     *
     */
    function Browser() {
        _classCallCheck(this, Browser);

        /**
         * リサイズイベントからリサイズエンドイベントまでのインターバル
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        var _this = _possibleConstructorReturn(this, (Browser.__proto__ || Object.getPrototypeOf(Browser)).call(this));

        _this.resizeEndInterval = 100;
        /**
         * スクロールイベントからスクロールエンドイベントまでのインターバル
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        _this.scrollEndInterval = 100;
        /**
         * 現在リサイズ中かどうか
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        _this.isResize = false;
        /**
         * 現在スクロール中かどうか
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        _this.isScroll = false;
        // リサイズイベント
        window.addEventListener('resize', _this._onResize.bind(_this), false);
        // スクロールイベント
        window.addEventListener('scroll', _this._onScroll.bind(_this), false);
        return _this;
    }

    _createClass(Browser, [{
        key: 'jumpTo',

        /**
         * ページ遷移する
         *
         * @version 0.12.0
         * @since 0.12.0
         *
         */
        value: function jumpTo(path) {
            var isBlank = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var href = void 0;
            if (typeof path === 'string') {
                href = path;
            } else {
                href = path.href;
            }
            if (!isBlank) {
                window.location.href = href;
            } else {
                window.open(href, undefined);
            }
        }
        /**
         * 現在のURLのパラメータをリンク先へ引き継がせる
         *
         * @version 0.12.0
         * @since 0.12.0
         *
         */

    }, {
        key: 'inheritParams',
        value: function inheritParams(targetParam) {
            var target = document.querySelectorAll('a[href], area[href]');
            var thisLocation = new Locational_1.default(location);
            if (!(targetParam in thisLocation.params)) {
                return;
            }
            var query = targetParam;
            var value = thisLocation.params[targetParam];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = target[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var elem = _step.value;

                    var targetElem = elem;
                    var loc = new Locational_1.default(targetElem);
                    if (thisLocation.host === loc.host) {
                        loc.addParam(query, value);
                        targetElem.href = loc.href;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: '_onResize',
        value: function _onResize() {
            var _this2 = this;

            if (!this.isResize) {
                this.trigger('resizestart');
            }
            this.isResize = true;
            this.trigger('resize');
            window.clearTimeout(this._resizeEndTimer);
            this._resizeEndTimer = window.setTimeout(function () {
                _this2.isResize = false;
                _this2.trigger('resize');
                _this2.trigger('resizeend');
            }, this.resizeEndInterval);
        }
    }, {
        key: '_onScroll',
        value: function _onScroll() {
            var _this3 = this;

            if (!this.isScroll) {
                this.trigger('scrollstart');
            }
            this.isScroll = true;
            this.trigger('scroll');
            window.clearTimeout(this._scrollEndTimer);
            this._scrollEndTimer = window.setTimeout(function () {
                _this3.isScroll = false;
                _this3.trigger('scroll');
                _this3.trigger('scrollend');
            }, this.resizeEndInterval);
        }
        /**
         * ユーザーエージェント情報を取得する
         *
         * @version 0.12.0
         * @since 0.12.0
         *
         */

    }, {
        key: '_getUA',
        value: function _getUA() {
            var ua = navigator.userAgent;
            var bua = {
                iOS: false,
                android: /android/i.test(ua),
                iPad: /ipad/i.test(ua),
                iPhone: /iphone/i.test(ua),
                iPod: /ipod/i.test(ua),
                safari: /safari/i.test(ua),
                chrome: /crios|chrome/i.test(ua),
                edge: /edge/i.test(ua),
                ie: /msie/.test(ua)
            };
            bua.iOS = bua.iPad || bua.iPhone || bua.iPod || false;
            if (bua.chrome) {
                bua.safari = false;
            }
            if (bua.edge) {
                bua.safari = false;
                bua.chrome = false;
            }
            return bua;
        }
    }, {
        key: 'width',
        get: function get() {
            return window.document.documentElement.clientWidth;
        }
    }, {
        key: 'height',
        get: function get() {
            return window.document.documentElement.clientWidth;
        }
    }, {
        key: 'scrollTop',
        set: function set(y) {
            window.scrollTo(this.scrollLeft, y);
        },
        get: function get() {
            return window.pageYOffset;
        }
    }, {
        key: 'scrollLeft',
        set: function set(x) {
            window.scrollTo(x, this.scrollTop);
        },
        get: function get() {
            return window.pageXOffset;
        }
        /**
         * デバイス・OS・ブラウザの情報
         *
         * @version 0.12.0
         * @since 0.12.0
         *
         */

    }, {
        key: 'spec',
        get: function get() {
            return {
                isTouchable: 'ontouchstart' in window,
                ua: this._getUA()
            };
        }
        /**
         * 参照するAPIのスキーム
         *
         * @version 0.12.0
         * @since 0.12.0
         *
         */

    }, {
        key: 'availableScheme',
        get: function get() {
            return (/https?:/i.test(location.protocol) ? '//' : 'http://'
            );
        }
    }], [{
        key: 'getBrowser',
        value: function getBrowser() {
            if (Browser._browser) {
                Browser._browser = new Browser();
            }
            return Browser._browser;
        }
    }]);

    return Browser;
}(EventDispatcher_1.default);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Browser;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(14)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(11)
  , createDesc = __webpack_require__(26);
module.exports = __webpack_require__(9) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(3)
  , IE8_DOM_DEFINE = __webpack_require__(50)
  , toPrimitive    = __webpack_require__(43)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(9) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(35)
  , defined = __webpack_require__(31);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(28);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ },
/* 14 */
/***/ function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DispatchEvent_1 = __webpack_require__(27);
var EventHandler_1 = __webpack_require__(70);
/**
 * イベントを検知してハンドラを発火させることができるクラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 * ```
 * let dispatcher = new EventDispatcher();
 *
 * dispatcher.on('event', (e) -> {
 * 	// handler
 * });
 *
 * dispatcher.trigger('event');
 * ```
 *
 */

var EventDispatcher = function () {
    /**
     * コンストラクタ
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    function EventDispatcher() {
        _classCallCheck(this, EventDispatcher);
    }
    // void

    /**
     * イベントハンドラを登録する
     *
     * @version 0.9.0
     * @since 0.0.10
     * @param type イベントのタイプ（複数可）
     * @param handler
     * @return インスタンス自身
     *
     */


    _createClass(EventDispatcher, [{
        key: 'on',
        value: function on(type, handler) {
            var types = void 0;
            if (typeof type === 'string') {
                types = type.split(/\s+/g);
            } else {
                types = type;
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = types[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _type = _step.value;

                    var eventHandler = new EventHandler_1.default(this, _type, handler);
                    EventDispatcher.eventHandlers[eventHandler.id] = eventHandler;
                    if (!EventDispatcher.types[_type]) {
                        EventDispatcher.types[_type] = [];
                    }
                    EventDispatcher.types[_type].push(eventHandler);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return this;
        }
        /**
         * イベントハンドラを削除する
         *
         * @version 0.9.0
         * @since 0.0.10
         * @param type イベントのタイプ（複数可）
         * @return インスタンス自身
         *
         */

    }, {
        key: 'off',
        value: function off(type) {
            if (!type) {
                return this;
            }
            var types = void 0;
            if (typeof type === 'string') {
                types = type.split(/\s+/g);
            } else {
                types = type;
            }
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = types[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _type2 = _step2.value;

                    delete EventDispatcher.types[_type2];
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return this;
        }
        /**
         * イベントハンドラを発火させる
         *
         * @version 0.9.0
         * @since 0.0.10
         * @param type イベントのタイプ
         * @param args イベントハンドラに渡す引数
         * @param context イベントハンドラのコンテキスト
         * @return インスタンス自身
         *
         */

    }, {
        key: 'trigger',
        value: function trigger(type) {
            var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
            var context = arguments[2];

            context = context || this;
            var typeName = void 0;
            var e = void 0;
            if (typeof type === 'string') {
                typeName = type;
                e = new DispatchEvent_1.default(type);
            } else {
                e = type;
                typeName = e.type;
            }
            if (EventDispatcher.types[typeName]) {
                // sliceをつかってオブジェクトのコピーを渡し参照を切る
                var handlers = EventDispatcher.types[typeName].slice();
                while (handlers.length) {
                    var eventHandler = handlers.shift();
                    if (eventHandler && eventHandler.context === this) {
                        var isCancel = eventHandler.fire(context, e, args);
                        if (isCancel) {
                            e.preventDefault();
                            e.stopImmediatePropagation();
                        }
                        // イベントの伝達抑制状態であればループ抜けて以降の処理を行わない
                        if (e.isImmediatePropagationStopped()) {
                            break;
                        }
                    }
                }
            }
            return this;
        }
    }]);

    return EventDispatcher;
}();
/**
 * イベント駆動できるクラス
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */


EventDispatcher.eventHandlers = {};
/**
 * イベント駆動できるクラス
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
EventDispatcher.types = {};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventDispatcher;

/***/ },
/* 16 */
/***/ function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ },
/* 17 */
/***/ function(module, exports) {

module.exports = {};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(57)
  , enumBugKeys = __webpack_require__(33);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

var def = __webpack_require__(11).f
  , has = __webpack_require__(4)
  , TAG = __webpack_require__(0)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ },
/* 20 */
/***/ function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ },
/* 21 */
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * ユーティリティ文字列クラス
 *
 * @version 0.9.0
 * @since 0.0.2
 *
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UtilString = function () {
    function UtilString() {
        _classCallCheck(this, UtilString);
    }

    _createClass(UtilString, null, [{
        key: 'UID',

        /**
         * ユニークIDを発行する
         *
         * @version 0.9.0
         * @since 0.0.1
         * @param prefix 接頭辞
         * @return ユニークID
         *
         */
        value: function UID() {
            var prefix = arguments.length <= 0 || arguments[0] === undefined ? 'uid' : arguments[0];

            var random = Math.random() * 1e8;
            var seed = new Date().valueOf();
            var uniqueNumber = Math.abs(Math.floor(random + seed));
            if (prefix) {
                prefix += '-';
            }
            return '' + prefix + uniqueNumber.toString(24);
        }
        /**
         * ハイフンチェインケース化
         *
         * @version 0.9.0
         * @since 0.1.0
         * @param str 対象の文字列
         * @return ハイフンチェインケース化された文字列
         *
         */

    }, {
        key: 'hyphenDelimited',
        value: function hyphenDelimited(str) {
            var result = [];
            var words = str.replace(/[A-Z]/g, function ($1) {
                return ' ' + $1.toLowerCase();
            }).split(/[^a-z0-9]+/ig);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = words[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var word = _step.value;

                    if (word) {
                        result.push(word.toLowerCase());
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return result.join('-');
        }
        /**
         * スネークケース化
         *
         * @version 0.1.0
         * @since 0.1.0
         * @param str 対象の文字列
         * @return スネークケース化された文字列
         *
         */

    }, {
        key: 'snakeCase',
        value: function snakeCase(str) {
            return UtilString.hyphenDelimited(str).replace(/-/g, '_');
        }
        /**
         * キャメルケース化
         *
         * @version 0.9.0
         * @since 0.1.0
         * @param str 対象の文字列
         * @param upperCase 頭文字を大文字にするかどうか
         * @return キャメルケース化された文字列
         *
         */

    }, {
        key: 'camelCase',
        value: function camelCase(str) {
            var upperCase = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var result = UtilString.hyphenDelimited(str);
            if (upperCase && /^[a-z]/.test(result)) {
                result = '-' + result;
            }
            return result.replace(/-([a-z])/g, function ($1, $2) {
                return $2.toUpperCase();
            });
        }
        /**
         * 文字列が論理値の偽相等であるかどうか
         *
         * @version 0.9.0
         * @since 0.2.0
         * @param str 対象の文字列
         * @return 文字列が論理値の偽相等であるかどうか
         *
         */

    }, {
        key: 'isFalsy',
        value: function isFalsy(str) {
            var FALSY_PATTERN = /^\s*(?:false|null|undefined|0|0?(?:\.0+)?)?\s*$/i;
            return FALSY_PATTERN.test(str.toLowerCase());
        }
        /**
         * 最初に登場する指定の区切り文字の場所で文字列を一回だけ分割する
         *
         * TODO: テストを書く
         *
         * @version 0.9.0
         * @since 0.7.0
         * @param str 対象の文字列
         * @param separator 区切り文字
         * @return 分割した文字列
         *
         */

    }, {
        key: 'divide',
        value: function divide(str, separator) {
            var splited = str.split(separator);
            var prefix = '';
            var suffix = '';
            if (splited) {
                prefix = splited.shift() || '';
                if (splited.length) {
                    suffix = splited.join(separator);
                }
            }
            return [prefix, suffix];
        }
    }]);

    return UtilString;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UtilString;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , core      = __webpack_require__(5)
  , hide      = __webpack_require__(10)
  , redefine  = __webpack_require__(6)
  , ctx       = __webpack_require__(13)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ },
/* 23 */
/***/ function(module, exports) {

module.exports = false;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

var META     = __webpack_require__(20)('meta')
  , isObject = __webpack_require__(2)
  , has      = __webpack_require__(4)
  , setDesc  = __webpack_require__(11).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(14)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ },
/* 25 */
/***/ function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ },
/* 26 */
/***/ function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ },
/* 27 */
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * イベントオブジェクトのクラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DispatchEvent = function () {
  /**
   * コンストラクタ
   *
   * @version 0.3.0
   * @since 0.0.10
   *
   */
  function DispatchEvent(type) {
    _classCallCheck(this, DispatchEvent);

    /**
     * イベントの伝達が止められているかどうか
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    this._isImmediatePropagationStopped = false;
    /**
     * デフォルトのイベントの発火が止められているかどうか
     *
     * @version 0.9.0
     * @since 0.9.0
     *
     */
    this._isDefaultPrevented = false;
    this.type = type;
  }
  /**
   * イベントの伝達を止める
   *
   * @version 0.0.10
   * @since 0.0.10
   *
   */


  _createClass(DispatchEvent, [{
    key: "stopImmediatePropagation",
    value: function stopImmediatePropagation() {
      this._isImmediatePropagationStopped = true;
    }
    /**
     * イベントの伝達が止められているかどうか
     *
     * @version 0.0.10
     * @since 0.0.10
     * @return イベントの伝達が止められているかどうか
     *
     */

  }, {
    key: "isImmediatePropagationStopped",
    value: function isImmediatePropagationStopped() {
      return this._isImmediatePropagationStopped;
    }
    /**
     * デフォルトのイベントの発火を止める
     * ※EventDispatcher.triggerでの実装に依る
     *
     * @version 0.9.0
     * @since 0.9.0
     *
     */

  }, {
    key: "preventDefault",
    value: function preventDefault() {
      this._isDefaultPrevented = true;
    }
    /**
     * デフォルトのイベントの発火が止められているかどうか
     *
     * @version 0.9.0
     * @since 0.9.0
     * @return デフォルトのイベントの発火が止められているかどうか
     *
     */

  }, {
    key: "isDefaultPrevented",
    value: function isDefaultPrevented() {
      return this._isDefaultPrevented;
    }
  }]);

  return DispatchEvent;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DispatchEvent;

/***/ },
/* 28 */
/***/ function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ },
/* 29 */
/***/ function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(16)
  , TAG = __webpack_require__(0)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ },
/* 31 */
/***/ function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2)
  , document = __webpack_require__(1).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ },
/* 33 */
/***/ function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(13)
  , call        = __webpack_require__(88)
  , isArrayIter = __webpack_require__(87)
  , anObject    = __webpack_require__(3)
  , toLength    = __webpack_require__(41)
  , getIterFn   = __webpack_require__(102)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(16);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ },
/* 36 */
/***/ function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(6);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

var shared = __webpack_require__(39)('keys')
  , uid    = __webpack_require__(20);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

var global = __webpack_require__(1)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ },
/* 40 */
/***/ function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(40)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(31);
module.exports = function(it){
  return Object(defined(it));
};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(2);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

var global         = __webpack_require__(1)
  , core           = __webpack_require__(5)
  , LIBRARY        = __webpack_require__(23)
  , wksExt         = __webpack_require__(59)
  , defineProperty = __webpack_require__(11).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(30)
  , test    = {};
test[__webpack_require__(0)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  __webpack_require__(6)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DispatchEvent_1 = __webpack_require__(27);
var EventDispatcher_1 = __webpack_require__(15);
/**
 * 時間管理クラス
 *
 * @version 1.0.0 // TODO: requestAnimationFrameベースにする
 * @since 0.0.1
 *
 */

var Timer = function (_EventDispatcher_1$de) {
    _inherits(Timer, _EventDispatcher_1$de);

    /**
     * コンストラクタ
     *
     * @version 0.9.0
     * @since 0.0.1
     *
     */
    function Timer() {
        _classCallCheck(this, Timer);

        /**
         * インターバル
         *
         * `13`は[jQuery](http://jquery.com/)を参考
         *
         * @version 0.0.8
         * @since 0.0.8
         *
         */
        var _this = _possibleConstructorReturn(this, (Timer.__proto__ || Object.getPrototypeOf(Timer)).call(this));

        _this.interval = 13;
        _this.now();
        return _this;
    }
    /**
     * 遅延処理
     *
     * `wait`メソッドを実行したインスタンスを返す
     * そのインスタンスは`stop`メソッドで止めることが可能
     *
     * @version 0.9.0
     * @since 0.0.8
     * @param delay 遅延時間
     * @param callback 遅延後の処理
     * @param context コンテクスト
     * @return `wait`メソッドを実行したインスタンス
     *
     */


    _createClass(Timer, [{
        key: 'valueOf',

        /**
         * 暗黙の型変換時の振る舞い
         *
         * @version 0.0.1
         * @since 0.0.1
         * @return 保持しているタイムスタンプ
         *
         */
        value: function valueOf() {
            return this._currentTime.valueOf();
        }
        /**
         * 時間を現在に更新する
         *
         * @version 0.0.1
         * @since 0.0.1
         * @return 更新した時間のタイムスタンプ
         *
         */

    }, {
        key: 'now',
        value: function now() {
            this._currentTime = new Date();
            return this.valueOf();
        }
        /**
         * タイマーをスタートする
         * 継続中`progress`イベントを発行し続ける
         * 継続時間を指定しなければずっと作動する
         *
         * 継続時間を指定して`stop`イベントだけを利用するようなケースでは
         * `wait`メソッドを利用したほうが効率がよい
         *
         * @version 0.9.0
         * @since 0.0.8
         * @param time 継続時間
         * @return インスタンス自身
         *
         * ```
         * let timer = new Timer();
         * timer.on('progress', (e, currentTime, startTime, context) => {
         * 	context.stop();
         * }).start();
         * ```
         *
         */

    }, {
        key: 'start',
        value: function start() {
            var time = arguments.length <= 0 || arguments[0] === undefined ? Infinity : arguments[0];

            // call: 0
            var START_TIMESTAMP = this.now();
            // call: 1
            clearTimeout(this._timerId);
            // call: 2
            this._tick(time, START_TIMESTAMP);
            return this;
        }
        /**
         * タイマーをストップする
         *
         * @version 0.9.0
         * @since 0.0.8
         * @return インスタンス自身
         *
         */

    }, {
        key: 'stop',
        value: function stop() {
            var now = this.now();
            var e = new DispatchEvent_1.default('stop');
            this.trigger(e, [now, this._timerId, this], this);
            if (!e.isDefaultPrevented()) {
                clearTimeout(this._timerId);
            }
            return this;
        }
        /**
         * 遅延処理
         * `stop`メソッドで止めることが可能
         *
         * @version 0.9.0
         * @since 0.0.8
         * @param delay 遅延時間
         * @param callback 遅延後の処理
         * @param context コンテクスト
         * @return インスタンス自身
         *
         * ```
         * let timer = new Timer();
         * timer.wait( (currentTime, startTime, context) => {
         * 	context.stop();
         * }).start();
         * ```
         *
         */

    }, {
        key: 'wait',
        value: function wait(delay, callback, context) {
            var _this2 = this;

            context = context || this;
            var START_TIMESTAMP = this.now();
            clearTimeout(this._timerId);
            this._timerId = setTimeout(function () {
                _this2.stop();
                var now = _this2.now();
                callback.call(context, now, START_TIMESTAMP, context);
            }, delay);
            return this;
        }
    }, {
        key: '_tick',
        value: function _tick(time, startTimestamp) {
            // call: 3, 7, 12... onTick
            this._timerId = setTimeout(this._tickEnd.bind(this, time, startTimestamp), this.interval);
            // call: 4, 8, 13... onStacked
        }
    }, {
        key: '_tickEnd',
        value: function _tickEnd(time, startTimestamp) {
            // call: 5, 10... onProgress
            var now = this.now();
            var period = now - startTimestamp;
            if (period < time) {
                // call: 6, 11... onKickTick
                this._tick(time, startTimestamp);
                // call: 9, 14... onFireProgressHandler
                var e = new DispatchEvent_1.default('progress');
                this.trigger(e, [now, startTimestamp, this], this);
                if (e.isDefaultPrevented()) {
                    this.stop();
                }
            } else {
                this.stop();
            }
        }
    }], [{
        key: 'wait',
        value: function wait(time, callback, context) {
            return new Timer().wait(time, callback, context);
        }
    }]);

    return Timer;
}(EventDispatcher_1.default);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Timer;

/***/ },
/* 47 */
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * ユーティリティ算術クラス
 *
 * @version 0.9.0
 * @since 0.0.2
 *
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UtilMath = function () {
    function UtilMath() {
        _classCallCheck(this, UtilMath);
    }

    _createClass(UtilMath, null, [{
        key: 'random',

        /**
         * 指定の範囲のランダムな数を返す
         *
         * @version 0.9.0
         * @since 0.2.0
         * @param base 基準の数
         * @param dist 基準からこの数までの範囲の乱数になる
         * @return 乱数
         *
         */
        value: function random() {
            var base = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
            var dist = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            var rand = Math.random();
            var from = Math.min(base, dist);
            var to = Math.max(base, dist);
            return rand * (to - from) + from;
        }
        /**
         * 配列内の数値の合計を算出する
         *
         * @version 0.9.0
         * @since 0.2.0
         * @param numberList 数の配列
         * @return 合計値
         *
         */

    }, {
        key: 'sum',
        value: function sum(numberList) {
            var numbers = numberList.slice();
            var result = 0;
            while (numbers.length) {
                result += numbers.shift();
            }
            return result;
        }
        /**
         * 均等に分割する
         *
         * @version 0.9.0
         * @since 0.2.0
         * @param n 分割される数
         * @param devide 分割する数
         * @return 分割された数値で構成された配列
         *
         */

    }, {
        key: 'split',
        value: function split(n, devide) {
            var result = [];
            n = Math.floor(n);
            devide = Math.floor(devide);
            // 分割した数
            var splited = Math.floor(n / devide);
            if (0 < devide) {
                var i = devide;
                // 余り
                var rem = n % devide;
                // 余りの数だけ+1される
                var addtion = rem;
                while (i--) {
                    if (0 < addtion || rem < 0 && 0 === addtion) {
                        result.push(splited + 1);
                    } else {
                        result.push(splited);
                    }
                    addtion += rem < 0 ? 1 : -1;
                }
            }
            return result;
        }
        /**
         * コンテナオブジェクトとターゲットオブジェクトのサイズから、
         * ターゲットオブジェクトの収まる位置とサイズを算出する
         *
         * @param containerWidth コンテナの幅
         * @param containerHeight コンテナの高さ
         * @param targetWidth ターゲットの幅
         * @param targetHeight ターゲットの高さ
         * @param sizing ターゲットを収める基準 `"contain" | "cover"`
         * @param align 水平位置 `"left" | "center" | "right"`
         * @param valign 垂直位置 `"top" | "center" | "bottom"`
         * @return 算出された位置とサイズ
         */

    }, {
        key: 'stretchDimension',
        value: function stretchDimension(containerWidth, containerHeight, targetWidth, targetHeight) {
            var sizing = arguments.length <= 4 || arguments[4] === undefined ? 'contain' : arguments[4];
            var align = arguments.length <= 5 || arguments[5] === undefined ? 'center' : arguments[5];
            var valign = arguments.length <= 6 || arguments[6] === undefined ? 'center' : arguments[6];

            var scale = 1;
            var objectAspectRatio = targetWidth / targetHeight;
            var containerAspectRatio = containerWidth / containerHeight;
            // オブジェクトの拡縮率の算出
            // アス比が1以上なら横長/1以下なら縦長
            // コンテナが横長
            switch (sizing) {
                case 'contain':
                    if (1 < containerAspectRatio) {
                        // オブジェクトが横長 もしくは コンテナのアス比の方が大きい
                        if (1 < targetWidth && objectAspectRatio < containerAspectRatio) {
                            scale = containerWidth / targetWidth;
                        } else {
                            scale = containerHeight / targetHeight;
                        }
                    } else {
                        // オブジェクトが横長 もしくは オブジェクトのアス比の方が大きい
                        if (1 < targetHeight && containerAspectRatio < objectAspectRatio) {
                            scale = containerHeight / targetHeight;
                        } else {
                            scale = containerWidth / targetWidth;
                        }
                    }
                    break;
                case 'cover':
                    if (1 < containerAspectRatio) {
                        // オブジェクトが横長 もしくは コンテナのアス比の方が大きい
                        if (1 < targetWidth && objectAspectRatio < containerAspectRatio) {
                            scale = containerHeight / targetHeight;
                        } else {
                            scale = containerWidth / targetWidth;
                        }
                    } else {
                        // オブジェクトが横長 もしくは オブジェクトのアス比の方が大きい
                        if (1 < targetHeight && containerAspectRatio < objectAspectRatio) {
                            scale = containerWidth / targetWidth;
                        } else {
                            scale = containerHeight / targetHeight;
                        }
                    }
                    break;
                default:
            }
            // オブジェクトの幅と高さ
            var width = targetWidth * scale;
            var height = targetHeight * scale;
            var top = void 0;
            switch (valign) {
                case 'top':
                    {
                        top = 0;
                    }
                    break;
                case 'bottom':
                    {
                        top = containerHeight - height;
                    }
                    break;
                default:
                    {
                        top = containerHeight / 2 - height / 2;
                    }
            }
            var left = void 0;
            switch (align) {
                case 'left':
                    {
                        left = 0;
                    }
                    break;
                case 'right':
                    {
                        left = containerWidth - width;
                    }
                    break;
                default:
                    {
                        left = containerWidth / 2 - width / 2;
                    }
            }
            return {
                width: width,
                height: height,
                top: top,
                left: left
            };
        }
    }]);

    return UtilMath;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UtilMath;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(13)
  , IObject  = __webpack_require__(35)
  , toObject = __webpack_require__(42)
  , toLength = __webpack_require__(41)
  , asc      = __webpack_require__(81);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1).document && document.documentElement;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(9) && !__webpack_require__(14)(function(){
  return Object.defineProperty(__webpack_require__(32)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(16);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var LIBRARY        = __webpack_require__(23)
  , $export        = __webpack_require__(22)
  , redefine       = __webpack_require__(6)
  , hide           = __webpack_require__(10)
  , has            = __webpack_require__(4)
  , Iterators      = __webpack_require__(17)
  , $iterCreate    = __webpack_require__(89)
  , setToStringTag = __webpack_require__(19)
  , getPrototypeOf = __webpack_require__(96)
  , ITERATOR       = __webpack_require__(0)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(0)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(3)
  , dPs         = __webpack_require__(94)
  , enumBugKeys = __webpack_require__(33)
  , IE_PROTO    = __webpack_require__(38)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(32)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(49).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(25)
  , createDesc     = __webpack_require__(26)
  , toIObject      = __webpack_require__(12)
  , toPrimitive    = __webpack_require__(43)
  , has            = __webpack_require__(4)
  , IE8_DOM_DEFINE = __webpack_require__(50)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(9) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(57)
  , hiddenKeys = __webpack_require__(33).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

var has          = __webpack_require__(4)
  , toIObject    = __webpack_require__(12)
  , arrayIndexOf = __webpack_require__(79)(false)
  , IE_PROTO     = __webpack_require__(38)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(13)
  , invoke             = __webpack_require__(86)
  , html               = __webpack_require__(49)
  , cel                = __webpack_require__(32)
  , global             = __webpack_require__(1)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(16)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(0);

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

var $iterators    = __webpack_require__(103)
  , redefine      = __webpack_require__(6)
  , global        = __webpack_require__(1)
  , hide          = __webpack_require__(10)
  , Iterators     = __webpack_require__(17)
  , wks           = __webpack_require__(0)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Math_1 = __webpack_require__(47);
var Timer_1 = __webpack_require__(46);
var Browser_1 = __webpack_require__(8);
var BaserElement_1 = __webpack_require__(7);
var AlignedBoxes_1 = __webpack_require__(65);
var BackgroundContainer_1 = __webpack_require__(66);
var Select_1 = __webpack_require__(75);
var Scroll_1 = __webpack_require__(74);
var GoogleMaps_1 = __webpack_require__(72);
var YouTube_1 = __webpack_require__(77);

var JQueryAdapter = function () {
    function JQueryAdapter() {
        _classCallCheck(this, JQueryAdapter);
    }

    _createClass(JQueryAdapter, [{
        key: 'bcBackground',

        /**
         * 自信の要素を基準に、指定の子要素を背景のように扱う
         *
         * TODO: BaserElement化する
         *
         * CSSの`background-size`の`contain`と`cover`の振る舞いに対応
         *
         * 基準も縦横のセンター・上下・左右に指定可能
         *
         * @version 1.0.0
         * @since 0.0.9
         * @param {Object} options オプション
         *
         * * * *
         *
         * ## Sample
         *
         * ### Target HTML
         *
         * ```html
         * <div class="sample" data-id="rb0zOstIiyU" data-width="3840" data-height="2160"></div>
         * ```
         *
         * ### Execute
         *
         * ```js
         * $('.sample').bcYoutube().find('iframe').bcKeepAspectRatio();
         * ```
         *
         * ### Result
         *
         * comming soon...
         *
         */
        value: function bcBackground(options) {
            var self = $(this);
            return self.each(function (i, elem) {
                /* tslint:disable */
                new BackgroundContainer_1.default(elem, options);
                /* tslint:enable */
            });
        }
        /**
         * 要素の高さを揃える
         *
         * @version 0.7.0
         * @since 0.0.15
         *
         */

    }, {
        key: 'bcBoxAlignHeight',
        value: function bcBoxAlignHeight() {
            var columnOrKeyword = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var detailTarget = arguments[1];
            var callback = arguments[2];

            var self = $(this);
            if (typeof columnOrKeyword === 'string') {
                var keyword = columnOrKeyword;
                switch (keyword) {
                    case 'destroy':
                        {
                            var boxes = self.data();
                            boxes.destroy();
                        }
                        break;
                    default:
                        {}
                }
            } else {
                (function () {
                    var column = columnOrKeyword;
                    // 要素群の高さを揃え、setsに追加
                    if (detailTarget) {
                        var $detailTarget = self.find(detailTarget);
                        if ($detailTarget.length) {
                            self.each(function () {
                                var $split = $(this).find(detailTarget);
                                /* tslint:disable */
                                new AlignedBoxes_1.default($split[0], column, callback);
                                /* tslint:enable */
                            });
                        }
                    } else {
                        /* tslint:disable */
                        new AlignedBoxes_1.default(self[0], column, callback);
                    }
                })();
            }
            return self;
        }
        // @version 1.0.0
        // @since 0.1.0

    }, {
        key: 'bcBoxLink',
        value: function bcBoxLink() {
            return $(this).on('click', function (e) {
                var $elem = $(this);
                var $link = $elem.find('a, area').eq(0);
                var href = $link.prop('href');
                if ($link.length && href) {
                    var isBlank = $link.prop('target') === '_blank';
                    Browser_1.default.getBrowser().jumpTo(href, isBlank);
                    e.preventDefault();
                }
            });
        }
        /**
         * WAI-ARIAに対応した装飾可能な汎用要素でラップしたセレクトボックスに変更する
         *
         * @version 0.9.2
         * @since 0.0.1
         *
         * * * *
         *
         * ## Sample
         *
         * comming soon...
         *
         */

    }, {
        key: 'bcSelect',
        value: function bcSelect(options) {
            var self = $(this);
            return self.each(function (i, elem) {
                // const $elem: JQuery = $(elem);
                if (typeof options === 'string') {
                    switch (options) {
                        case 'update':
                            {}
                            break;
                        default:
                            {}
                    }
                } else if (elem.nodeName === 'SELECT') {
                    /* tslint:disable */
                    new Select_1.default(elem, options);
                } else if ('console' in window) {
                    console.warn('TypeError: A Node is not HTMLSelectElement');
                }
            });
        }
        /**
         * 要素内の画像の読み込みが完了してからコールバックを実行する
         *
         * @version 0.9.0
         * @since 0.0.9
         *
         * * * *
         *
         * ## Sample
         *
         * comming soon...
         *
         */

    }, {
        key: 'bcImageLoaded',
        value: function bcImageLoaded(success, error) {
            var self = $(this);
            return self.each(function (i, elem) {
                var $elem = $(elem);
                var manifest = [];
                var $imgs = $elem.filter('img').add($elem.find('img'));
                if ($imgs.length) {
                    $imgs.hide();
                    $imgs.each(function () {
                        var loaded = $.Deferred();
                        var img = new Image();
                        img.onload = function () {
                            loaded.resolve();
                            img = null; // GC
                        };
                        img.onabort = img.onerror = function (e) {
                            loaded.reject(e);
                            img = null; // GC
                        };
                        img.src = this.src;
                        manifest.push(loaded.promise());
                    });
                    $.when.apply($, manifest).done(function () {
                        $imgs.show();
                        success.call(elem);
                    }).fail(function (e) {
                        if (error) {
                            error.call(elem, e);
                        }
                    });
                } else {
                    success.call(elem);
                }
            });
        }
        /**
         * 親のコンテナ要素の幅に合わせて、自信の縦横比を保ったまま幅の変更に対応する
         *
         * iframeなどの縦横比を保ちたいが、幅を変更しても高さが変化しない要素などに有効
         *
         * @version 0.0.9
         * @since 0.0.9
         *
         * * * *
         *
         * ## Sample
         *
         * ### Target HTML
         *
         * ```html
         * <div class="sample" data-id="rb0zOstIiyU" data-width="3840" data-height="2160"></div>
         * ```
         *
         * ### Execute
         *
         * ```js
         * $('.sample').bcYoutube().find('iframe').bcKeepAspectRatio();
         * ```
         *
         * ### Result
         *
         * comming soon...
         *
         */

    }, {
        key: 'bcKeepAspectRatio',
        value: function bcKeepAspectRatio() {
            var $w = $(window);
            var self = $(this);
            self.each(function (i, elem) {
                var $elem = $(elem);
                var baseWidth = +$elem.data('width');
                var baseHeight = +$elem.data('height');
                var aspectRatio = baseWidth / baseHeight;
                $w.on('resize', function () {
                    var width = $elem.width();
                    $elem.css({
                        width: '100%',
                        height: width / aspectRatio
                    });
                }).trigger('resize');
            });
            Timer_1.default.wait(30, function () {
                $w.trigger('resize');
            });
            return self;
        }
        /**
         * リンク要素からのアンカーまでスムーズにスクロールをさせる
         *
         * @version 0.1.0
         * @since 0.0.8
         *
         * * * *
         *
         * ## Sample
         *
         * comming soon...
         *
         */

    }, {
        key: 'bcScrollTo',
        value: function bcScrollTo(options) {
            var self = $(this);
            return self.on('click', function (e) {
                var $this = $(this);
                var href = $this.attr('href');
                var scroll = new Scroll_1.default();
                if (href) {
                    // キーワードを一番に優先する
                    if (options && options.keywords && $.isPlainObject(options.keywords)) {
                        for (var keyword in options.keywords) {
                            if (options.keywords.hasOwnProperty(keyword)) {
                                var target = options.keywords[keyword];
                                if (keyword === href) {
                                    scroll.to(target, options);
                                    e.preventDefault();
                                    return;
                                }
                            }
                        }
                    }
                    // 「/pathname/#hash」のリンクパターンの場合
                    // 「/pathname/」が現在のURLだった場合「#hash」に飛ばすようにする
                    var absPath = $this.prop('href');
                    var currentReferer = location.protocol + '//' + location.host + location.pathname + location.search;
                    href = absPath.replace(currentReferer, '');
                    // #top はHTML5ではページトップを意味する
                    if (href === '#top') {
                        scroll.to(0, options);
                        e.preventDefault();
                        return;
                    }
                    // セレクタとして要素が存在する場合はその要素に移動
                    // 「/」で始まるなどセレクターとして不正な場合、例外を投げることがあるので無視する
                    try {
                        var _target = document.querySelector(href);
                        if (_target) {
                            scroll.to(_target, options);
                            e.preventDefault();
                            return;
                        }
                    } catch (err) {}
                }
                return;
            });
        }
        /**
         * リストを均等に分割する
         *
         * @version 0.2.0
         * @since 0.0.14
         *
         */

    }, {
        key: 'bcSplitList',
        value: function bcSplitList(columnSize, options) {
            var self = $(this);
            var CLASS_NAME = 'splited-list';
            var CLASS_NAME_NTH = 'nth';
            var CLASS_NAME_ITEM = 'item';
            var config = $.extend({
                dataKey: '-bc-split-list-index',
                splitChildren: true
            }, options);
            self.each(function (index, elem) {
                var $container = $(elem);
                var $list = $container.find('>ul');
                var $items = void 0;
                if (!config.splitChildren) {
                    // 直下のliのみ取得
                    $items = $list.find('>li').detach();
                } else {
                    // 入れ子のliも含めて全て取得
                    $items = $list.find('li').detach();
                    // 入れ子のulの削除
                    $items.find('ul').remove();
                }
                // リストアイテムの総数
                var size = $items.length;
                var splited = Math_1.default.split(size, columnSize);
                var itemArray = $items.toArray();
                for (var i = 0; i < columnSize; i++) {
                    var sizeByColumn = splited[i];
                    var col = document.createElement('ul');
                    BaserElement_1.default.addClass(col, CLASS_NAME);
                    BaserElement_1.default.addClass(col, CLASS_NAME, '', CLASS_NAME_NTH + columnSize);
                    col.appendChild(elem);
                    for (var j = 0; j < sizeByColumn; j++) {
                        var item = itemArray.shift();
                        if (item) {
                            col.appendChild(item);
                            // TODO: item.data(config.dataKey, i);
                            BaserElement_1.default.addClass(item, CLASS_NAME, CLASS_NAME_ITEM);
                            BaserElement_1.default.addClass(item, CLASS_NAME, CLASS_NAME_ITEM, CLASS_NAME_NTH + i);
                        }
                    }
                }
                $list.remove();
            });
            return self;
        }
        /**
         * マップを埋め込む
         *
         * 現在の対応はGoogleMapsのみ
         *
         * @version 0.9.0
         * @since 0.0.8
         *
         * * * *
         *
         * ## Sample
         *
         * ### Target HTML
         *
         * ```html
         * <div class="sample" data-lat="33.606785" data-lng="130.418314"></div>
         * ```
         *
         * ### Execute
         *
         * ```js
         * $('.sample').bcMaps();
         * ```
         *
         * ### Result
         *
         * comming soon...
         *
         */

    }, {
        key: 'bcMaps',
        value: function bcMaps(options) {
            var self = $(this);
            return self.each(function (i, elem) {
                var $elem = $(elem);
                var data = $elem.data(GoogleMaps_1.default.className);
                if (data) {
                    data.reload(options);
                } else {
                    /* tslint:disable */
                    new GoogleMaps_1.default(elem, options);
                }
            });
        }
        /**
         * YouTubeを埋め込む
         *
         * @version 0.9.0
         * @since 0.0.8
         *
         * * * *
         *
         * ## Sample
         *
         * ### Target HTML
         *
         * ```html
         * <div class="sample" data-id="rb0zOstIiyU" data-width="720" data-height="480"></div>
         * ```
         *
         * ### Execute
         *
         * ```js
         * $('.sample').bcYoutube();
         * ```
         *
         */

    }, {
        key: 'bcYoutube',
        value: function bcYoutube(options) {
            var self = $(this);
            return self.each(function (i, elem) {
                var $elem = $(elem);
                var data = $elem.data(YouTube_1.default.className);
                if (data) {
                    data.reload(options);
                } else {
                    /* tslint:disable */
                    new YouTube_1.default(elem, options);
                }
            });
        }
    }], [{
        key: 'bcScrollTo',
        value: function bcScrollTo(selector, options) {
            var scroll = new Scroll_1.default();
            scroll.to(selector, options);
        }
    }]);

    return JQueryAdapter;
}();

$.extend($, JQueryAdapter);
$.extend($.fn, JQueryAdapter.prototype);

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(45);
__webpack_require__(105);
__webpack_require__(60);
__webpack_require__(104);
module.exports = __webpack_require__(5).Promise;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(106);
__webpack_require__(45);
__webpack_require__(108);
__webpack_require__(109);
module.exports = __webpack_require__(5).Symbol;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(45);
__webpack_require__(60);
__webpack_require__(107);
module.exports = __webpack_require__(5).WeakMap;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var String_1 = __webpack_require__(21);
var EventDispatcher_1 = __webpack_require__(15);
var Browser_1 = __webpack_require__(8);
var BreakPoints_1 = __webpack_require__(69);
var BaserElement_1 = __webpack_require__(7);
/**
 * 高さ揃えをするボックスを管理するクラス
 *
 * @version 0.9.0
 * @since 0.7.0
 *
 */

var AlignedBoxes = function (_EventDispatcher_1$de) {
    _inherits(AlignedBoxes, _EventDispatcher_1$de);

    /**
     * コンストラクタ
     *
     * @version 1.0.0
     * @since 0.7.0
     * @param el 対象のボックス要素
     * @param column カラム数もしくはブレークポイントに寄るカラム数 `0`の場合すべての要素の高さを揃える
     * @param callback ボックスの高さ揃えるときのコールバック
     */
    function AlignedBoxes(el) {
        var column = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
        var callback = arguments[2];

        _classCallCheck(this, AlignedBoxes);

        var _this = _possibleConstructorReturn(this, (AlignedBoxes.__proto__ || Object.getPrototypeOf(AlignedBoxes)).call(this));

        if (el instanceof HTMLElement) {
            _this.elList.push(el);
        } else {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = el[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var elem = _step.value;

                    _this.elList.push(elem);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        AlignedBoxes.boot();
        _this.id = String_1.default.UID();
        AlignedBoxes.groups[_this.id] = _this;
        _this._init(column, callback);
        return _this;
    }
    /**
     * 基準の文字要素を生成する
     *
     * @version 1.0.0
     * @since 0.7.0
     *
     */


    _createClass(AlignedBoxes, [{
        key: 'destroy',

        /**
         * 高さ揃えを解除する
         *
         * @version 0.9.0
         * @since 0.7.0
         *
         */
        value: function destroy() {
            delete AlignedBoxes.groups[this.id];
        }
    }, {
        key: '_init',
        value: function _init() {
            var _this2 = this;

            var column = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var callback = arguments[1];

            var columnInfo = void 0;
            if (typeof column === 'number') {
                columnInfo = {
                    Infinity: column
                };
            } else {
                columnInfo = column;
            }
            this._columns = new BreakPoints_1.default(columnInfo, function (column, breakPoint, windowWidth) {
                _this2._currentColumn = column;
                _this2._align();
            });
            this._callback = this._callback || callback;
            this._align();
            this.on('realign', function () {
                _this2._align();
            });
        }
        /**
         * ボックスの高さ揃える
         *
         * @version 1.0.0
         * @since 0.8.1
         *
         */

    }, {
        key: '_align',
        value: function _align() {
            var $boxArray = [];
            var maxHeight = 0;
            var l = this.elList.length;
            var lastIndex = l - 1;
            for (var i = 0; i < l; i++) {
                var elem = this.elList[i];
                // 要素の高さを強制に無効にする
                BaserElement_1.default.removeCSSProp(elem, 'height');
                // column が 0 だと最初の要素の意味
                var column = i % this._currentColumn;
                if (column === 0) {
                    // 配列をリセットする
                    $boxArray = [];
                }
                // 配列に追加
                $boxArray[column] = elem;
                // 現在の高さと最大の高さを比べて最大の高さを更新
                // column が 0 ならばリセットさせるので最大の高さもリセット
                var currentHeight = elem.offsetHeight;
                if (column === 0 || currentHeight > maxHeight) {
                    maxHeight = currentHeight;
                }
                if (i === lastIndex || column === this._currentColumn - 1) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = $boxArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var $box = _step2.value;

                            if ($box) {
                                var cancel = false;
                                // コールバックを実行
                                if (this._callback) {
                                    cancel = !this._callback(maxHeight, currentHeight, this);
                                }
                                // コールバックの戻り値がfalseでなければ高さを変更
                                if (!cancel) {
                                    elem.style.height = maxHeight + 'px';
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            }
        }
    }], [{
        key: 'createChar',
        value: function createChar() {
            AlignedBoxes.dummyCharElement = BaserElement_1.default.createElement({
                tagName: 'div',
                text: 'M'
            }, undefined, {
                display: 'block',
                visibility: 'hidden',
                position: 'absolute',
                padding: 0,
                top: 0,
                zIndex: -1
            });
            document.body.appendChild(AlignedBoxes.dummyCharElement);
            AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
        }
        /**
         * 文字の大きさが変わったかどうか
         *
         * TODO: 破壊的変更を加えていて単純な評価関数ではない
         *
         * @version 0.7.0
         * @since 0.7.0
         * @return 文字の大きさが変わったかどうか
         *
         */

    }, {
        key: 'isChanged',
        value: function isChanged() {
            if (AlignedBoxes.currentFontSize === AlignedBoxes.dummyCharElement.offsetHeight) {
                return false;
            }
            AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
            return true;
        }
        /**
         * 文字の大きさが変わったかどうかを監視するルーチン
         *
         * 文字の大きさが変わればボックスのサイズを再設定する
         *
         * @version 0.7.0
         * @since 0.7.0
         *
         */

    }, {
        key: 'observerForFontSize',
        value: function observerForFontSize() {
            if (AlignedBoxes.isChanged()) {
                AlignedBoxes.reAlign();
            }
            return;
        }
        /**
         * ボックスのサイズを再設定する
         *
         * @version 0.9.0
         * @since 0.7.0
         *
         */

    }, {
        key: 'reAlign',
        value: function reAlign() {
            for (var uid in AlignedBoxes.groups) {
                if (AlignedBoxes.groups.hasOwnProperty(uid)) {
                    AlignedBoxes.groups[uid].trigger('realign');
                }
            }
            return;
        }
        /**
         * 監視タイマーを起動する
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.7.0
         *
         */

    }, {
        key: 'boot',
        value: function boot() {
            if (!AlignedBoxes.isBooted) {
                window.addEventListener('load', AlignedBoxes.reAlign, false);
                Browser_1.default.getBrowser().on('resizeend', AlignedBoxes.reAlign);
                AlignedBoxes.isBooted = true;
                AlignedBoxes.createChar();
                // TODO: タイマーによる監視をオプションでオフにできるようにする
                AlignedBoxes.watchTimer = setInterval(AlignedBoxes.observerForFontSize, AlignedBoxes.watchInterval);
            }
        }
    }]);

    return AlignedBoxes;
}(EventDispatcher_1.default);
/**
 * 監視の間隔
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */


AlignedBoxes.watchInterval = 1000;
/**
 * 監視タイマーが起動しているかどうか
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
AlignedBoxes.isBooted = false;
/**
 * 監視対象のボックスグループ
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
AlignedBoxes.groups = {};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AlignedBoxes;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Math_1 = __webpack_require__(47);
var Browser_1 = __webpack_require__(8);
var BaserElement_1 = __webpack_require__(7);
/**
 * ラジオボタンとチェックボックスの抽象クラス
 *
 * @version 0.11.0
 * @since 0.11.0
 *
 */

var BackgroundContainer = function (_BaserElement_1$defau) {
    _inherits(BackgroundContainer, _BaserElement_1$defau);

    /**
     * コンストラクタ
     *
     * @version 1.0.0
     * @since 0.11.0
     * @param el 管理するDOM要素
     * @param options オプション
     *
     */
    function BackgroundContainer(el, options) {
        _classCallCheck(this, BackgroundContainer);

        // 既にエレメント化されていた場合は何もしない
        var _this = _possibleConstructorReturn(this, (BackgroundContainer.__proto__ || Object.getPrototypeOf(BackgroundContainer)).call(this, el));

        if (_this._elementized) {
            return _possibleConstructorReturn(_this);
        }
        _this.addClass(BackgroundContainer.className);
        _this._config = _this.mergeOptions(BackgroundContainer.defaultOption, options);
        if (_this._config.child) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _this.el.querySelectorAll(_this._config.child)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var elem = _step.value;

                    _this._bgElements.push(elem);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
        var currentCSSPosition = getComputedStyle(_this.el).position;
        if (currentCSSPosition === 'static' || currentCSSPosition === '' || currentCSSPosition == null) {
            _this.el.style.position = 'relative';
        }
        // 初期計算
        _this.calc();
        Browser_1.default.getBrowser().on('resizeend', _this.calc.bind(_this));
        return _this;
    }
    /**
     * 計算
     *
     * @version 1.0.0
     * @since 0.11.0
     *
     */


    _createClass(BackgroundContainer, [{
        key: 'calc',
        value: function calc() {
            var containerWidth = this._config.outer ? this.el.offsetWidth : this.el.clientWidth;
            var containerHeight = this._config.outer ? this.el.offsetHeight : this.el.clientHeight;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._bgElements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var el = _step2.value;

                    var _Math_1$default$stret = Math_1.default.stretchDimension(containerWidth, containerHeight, el.offsetWidth, el.offsetHeight, this._config.size, this._config.align, this._config.valign);

                    var width = _Math_1$default$stret.width;
                    var height = _Math_1$default$stret.height;
                    var top = _Math_1$default$stret.top;
                    var left = _Math_1$default$stret.left;

                    var bgStyle = {
                        position: 'absolute',
                        width: 0,
                        height: 0,
                        top: 0,
                        left: 0,
                        maxWidth: 'none',
                        minWidth: 0,
                        maxHeight: 'none',
                        minHeight: 0
                    };
                    bgStyle.width = width;
                    bgStyle.height = height;
                    bgStyle.top = top;
                    bgStyle.left = left;
                    BaserElement_1.default.css(el, bgStyle);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
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
            return this.__isElementized(BackgroundContainer);
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
            this.__elementize(BackgroundContainer);
        }
    }]);

    return BackgroundContainer;
}(BaserElement_1.default);
/**
 * 管理対象の要素に付加するclass属性値のプレフィックス
 *
 * @version 0.11.0
 * @since 0.11.0
 *
 */


BackgroundContainer.className = '-bc-background-container-element';
/**
 * オプションのデフォルト値
 *
 * @since 0.11.0
 *
 */
BackgroundContainer.defaultOption = {
    align: 'center',
    valign: 'center',
    size: 'contain',
    child: '>*:first',
    outer: false
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BackgroundContainer;

/***/ },
/* 67 */
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * BEM式のクラス名の接続形式
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */

var ClassNameSeparatorForBEM;
(function (ClassNameSeparatorForBEM) {
  ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["HYPHEN"] = 0] = "HYPHEN";
  ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["DOUBLE_HYPHEN"] = 1] = "DOUBLE_HYPHEN";
  ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["UNDERSCORE"] = 2] = "UNDERSCORE";
  ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["DOUBLE_UNDERSCORE"] = 3] = "DOUBLE_UNDERSCORE";
  ClassNameSeparatorForBEM[ClassNameSeparatorForBEM["CAMEL_CASE"] = 4] = "CAMEL_CASE";
})(ClassNameSeparatorForBEM || (ClassNameSeparatorForBEM = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClassNameSeparatorForBEM;

/***/ },
/* 68 */
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * クラス名の形式
 *
 * @version 0.1.0
 * @since 0.0.1
 *
 */

var ElementClassNameCase;
(function (ElementClassNameCase) {
  ElementClassNameCase[ElementClassNameCase["HYPHEN_DELIMITED"] = 0] = "HYPHEN_DELIMITED";
  ElementClassNameCase[ElementClassNameCase["SNAKE_CASE"] = 1] = "SNAKE_CASE";
  ElementClassNameCase[ElementClassNameCase["CAMEL_CASE"] = 2] = "CAMEL_CASE";
})(ElementClassNameCase || (ElementClassNameCase = {}));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ElementClassNameCase;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventDispatcher_1 = __webpack_require__(15);
var Browser_1 = __webpack_require__(8);
/**
 * ブレークポイントの変化に応じた処理をする管理することができるクラス
 *
 * @version 0.9.0
 * @since 0.7.0
 *
 * ```
 * new BreakPoints({
 * 	340: 'sp',
 * 	768: 'tab',
 * 	1200: 'pc',
 * 	'default': 'bigger'
 * }, (value, breakPoint, windowWidth) => {
 * 	// ブレークポイントが340以下なら value = 'sp' など
 *  // 指定のブレークポイントを跨いだ際にしか発火しない
 * });
 * ```
 *
 */

var BreakPoints = function (_EventDispatcher_1$de) {
    _inherits(BreakPoints, _EventDispatcher_1$de);

    /**
     * コンストラクタ
     *
     * @version 1.0.0
     * @since 0.7.0
     * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
     * @param callback 変化に応じたコールバック
     *
     */
    function BreakPoints(breakPoints, callback) {
        _classCallCheck(this, BreakPoints);

        /**
         * 現在のブレークポイント（ウィンドウの幅）
         *
         * @version 0.8.1
         * @since 0.7.0
         *
         */
        var _this = _possibleConstructorReturn(this, (BreakPoints.__proto__ || Object.getPrototypeOf(BreakPoints)).call(this));

        _this.currentPoint = 0;
        /**
         * ブレークポイント
         *
         * @version 0.8.1
         * @since 0.7.0
         *
         */
        _this.breakPoints = [];
        /**
         * ブレークポイントに対してハンドラに渡す値
         *
         * @version 0.8.1
         * @since 0.7.0
         *
         */
        _this._values = {};
        _this._setBreakPoints(breakPoints);
        Browser_1.default.getBrowser().on('resizeend', function () {
            var wW = Math.max(window.document.documentElement.clientWidth, window.innerWidth);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _this.breakPoints[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var overPoint = _step.value;

                    if (wW <= overPoint) {
                        if (_this.currentPoint !== overPoint) {
                            _this.currentPoint = overPoint;
                            var value = _this._values[overPoint];
                            if (callback) {
                                callback(value, overPoint, wW);
                            }
                            _this.trigger('breakpoint', [value, overPoint, wW], _this);
                            _this.trigger('breakpoint:' + overPoint, [value, wW], _this);
                        }
                        break;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        });
        Browser_1.default.getBrowser().trigger('resizeend');
        return _this;
    }
    /**
     * ブレークポイントを追加する
     *
     * @version 0.7.0
     * @since 0.7.0
     * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
     *
     */


    _createClass(BreakPoints, [{
        key: 'add',
        value: function add(breakPoints) {
            this._setBreakPoints(breakPoints);
        }
        /**
         * ブレークポイントの登録処理
         *
         * @version 0.8.1
         * @since 0.7.0
         * @param breakPoints ブレークポイントとコールバックに渡す値を設定する
         *
         */

    }, {
        key: '_setBreakPoints',
        value: function _setBreakPoints(breakPoints) {
            for (var breakPointStr in breakPoints) {
                if (breakPoints.hasOwnProperty(breakPointStr)) {
                    var breakPoint = void 0;
                    if (/^defaults?$/i.test(breakPointStr)) {
                        breakPoint = Infinity;
                    } else {
                        breakPoint = parseFloat(breakPointStr);
                    }
                    if (breakPoint >= 1) {
                        this.breakPoints.push(breakPoint);
                        var value = breakPoints[breakPointStr];
                        this._values[breakPoint] = value;
                    }
                }
            }
            this.breakPoints.sort(function (a, b) {
                return a - b;
            });
        }
    }]);

    return BreakPoints;
}(EventDispatcher_1.default);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BreakPoints;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var String_1 = __webpack_require__(21);
/**
 * イベントハンドラのラッパークラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 */

var EventHandler = function () {
  /**
   * ハンドラ
   *
   * @version 0.9.0
   * @since 0.0.10
   * @param context 紐づくディスパッチャーオブジェクト
   * @param type イベントのタイプ
   * @param handler ハンドラ
   *
   */
  function EventHandler(context, type, handler) {
    _classCallCheck(this, EventHandler);

    this.context = context;
    this.id = String_1.default.UID();
    this.type = type;
    this._handler = handler;
  }
  /**
   * ハンドラを実行する
   *
   * @version 0.9.0
   * @since 0.0.10
   * @param context 紐づくディスパッチャーオブジェクト
   * @param type イベントのタイプ
   * @param handler ハンドラ
   * @return イベントの伝達を止めるかどうか
   *
   */


  _createClass(EventHandler, [{
    key: "fire",
    value: function fire(context, e, args) {
      var handlerReturn = this._handler.apply(context, [e].concat(args));
      return handlerReturn !== undefined && !handlerReturn;
    }
  }]);

  return EventHandler;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventHandler;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaserElement_1 = __webpack_require__(7);
/**
 * フォーム要素の抽象クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */

var FormElement = function (_BaserElement_1$defau) {
    _inherits(FormElement, _BaserElement_1$defau);

    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * @version 1.0.0
     * @since 0.0.1
     * @param el 管理するDOM要素
     * @param options オプション
     *
     */
    function FormElement(el, options) {
        _classCallCheck(this, FormElement);

        /**
         * フォーカスがあたっている状態かどうか
         *
         * @since 0.1.0
         *
         */
        var _this = _possibleConstructorReturn(this, (FormElement.__proto__ || Object.getPrototypeOf(FormElement)).call(this, el));

        _this.hasFocus = false;
        _this._config = $.extend({}, FormElement.defaultOption, options);
        // クラス名を設定す
        _this._setClassName();
        // ラベル要素の割り当て
        _this._asignLabel();
        // ラベルテキストの設定
        _this._setLabelText();
        // ラップ要素の割り当て
        _this._createWrapper();
        // 擬似要素生成
        _this._createPsuedoElements();
        // イベントを登録
        _this._bindEvents();
        // 初期状態を設定
        _this.defaultValue = _this.val();
        _this.setDisabled(_this.prop('disabled'));
        _this._onblur();
        // フォーム要素に登録
        // TODO: 有要な処理か検討
        FormElement.elements.push(_this);
        return _this;
    }
    /**
     * 値を設定する
     *
     * use: jQuery
     *
     * @version 1.0.0
     * @since 0.4.0
     * @param value 設定する値
     * @param isSilent イベントを伝達しない
     *
     */


    _createClass(FormElement, [{
        key: 'setValue',
        value: function setValue(value) {
            var isSilent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var valueString = '' + value;
            var currentValue = this.val();
            if (!this.disabled && currentValue !== valueString) {
                this.val(valueString);
                this._fireChangeEvent(isSilent);
            }
        }
        /**
         * 無効状態を設定する
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.4.0
         * @param 無効状態かどうか
         *
         */

    }, {
        key: 'setDisabled',
        value: function setDisabled(isDisabled) {
            this.disabled = isDisabled;
            this.el.disabled = isDisabled;
            if (this.disabled) {
                BaserElement_1.default.addClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateDisabled);
                BaserElement_1.default.addClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateDisabled);
                BaserElement_1.default.addClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateDisabled);
            } else {
                BaserElement_1.default.removeClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateDisabled);
                BaserElement_1.default.removeClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateDisabled);
                BaserElement_1.default.removeClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateDisabled);
            }
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
            return this.__isElementized(FormElement);
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
            this.__elementize(FormElement);
        }
        /**
         * クラス名を設定する
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */

    }, {
        key: '_setClassName',
        value: function _setClassName() {
            // 共通のクラスを付加
            this.addClass(FormElement.classNameFormElementCommon);
        }
        /**
         * ラップ要素を生成
         *
         * use: jQuery
         *
         * @version 1.0.0
         * @since 0.4.0
         *
         */

    }, {
        key: '_createWrapper',
        value: function _createWrapper() {
            var wrapper = document.createElement('span');
            BaserElement_1.default.addClass(wrapper, FormElement.classNameFormElementCommon);
            BaserElement_1.default.addClass(wrapper, FormElement.classNameWrapper);
            // TODO: Not use jQuery method
            if (this.isWrappedByLabel) {
                // this.label.wrapAll(wrapper);
                this.wrapper = wrapper;
            } else if (this.hasLabelByForAttr) {
                $(this.el).wrapAll(wrapper);
                this.wrapper = wrapper;
            } else {
                $(this.el).add(this.label).wrapAll(wrapper);
                this.wrapper = wrapper;
            }
        }
        /**
         * 擬似要素を生成する
         *
         * @version 0.4.1
         * @since 0.4.0
         *
         */

    }, {
        key: '_createPsuedoElements',
        value: function _createPsuedoElements() {}
        // void

        /**
         * イベントの登録
         *
         * use: jQuery
         *
         * @version 1.0.0
         * @since 0.4.0
         *
         */

    }, {
        key: '_bindEvents',
        value: function _bindEvents() {
            var _this2 = this;

            // TODO: Not use jQuery method
            $(this.el).on('focus.bcFormElement', function () {
                if (!_this2.disabled) {
                    _this2._onfocus();
                }
            });
            $(this.el).on('blur.bcFormElement', function () {
                _this2._onblur();
            });
            $(this.el).on('change.bcFormElement', function (e, arg) {
                if (arg && arg.isSilent) {
                    _this2._onSilentChange();
                } else {
                    _this2.trigger('change', undefined, _this2);
                }
            });
        }
        /**
         * 他のオブジェクトにchangeイベントを発火・伝達せずに実行されるチェンジ処理
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */

    }, {
        key: '_onSilentChange',
        value: function _onSilentChange() {}
        // void

        /**
         * フォーカスがあたった時の処理
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.0.1
         *
         */

    }, {
        key: '_onfocus',
        value: function _onfocus() {
            this.hasFocus = true;
            BaserElement_1.default.addClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateFocus);
            BaserElement_1.default.addClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateFocus);
            BaserElement_1.default.addClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateFocus);
            BaserElement_1.default.removeClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateBlur);
            BaserElement_1.default.removeClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateBlur);
            BaserElement_1.default.removeClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateBlur);
        }
        /**
         * フォーカスがはずれた時の処理
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.0.1
         *
         */

    }, {
        key: '_onblur',
        value: function _onblur() {
            this.hasFocus = false;
            BaserElement_1.default.addClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateBlur);
            BaserElement_1.default.addClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateBlur);
            BaserElement_1.default.addClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateBlur);
            BaserElement_1.default.removeClass(this.el, FormElement.classNameFormElementCommon, '', FormElement.classNameStateFocus);
            BaserElement_1.default.removeClass(this.label, FormElement.classNameFormElementCommon, FormElement.classNameLabel, FormElement.classNameStateFocus);
            BaserElement_1.default.removeClass(this.wrapper, FormElement.classNameWrapper, '', FormElement.classNameStateFocus);
        }
        /**
         * changeイベントを発火する
         *
         * use: jQuery
         *
         * @version 1.0.0
         * @since 0.4.0
         * @param isSilent イベントを伝達しない
         *
         */

    }, {
        key: '_fireChangeEvent',
        value: function _fireChangeEvent() {
            var isSilent = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            if (isSilent) {
                // TODO: Not use jQuery method
                $(this.el).trigger('change.bcFormElement', [{ isSilent: true }]);
            } else {
                var e = document.createEvent('Event');
                e.initEvent('change', true, true);
                this.el.dispatchEvent(e);
            }
        }
        /**
         * ラベル要素内のテキストを取得する
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.4.0
         *
         */

    }, {
        key: '_setLabelText',
        value: function _setLabelText() {
            if (this._config.label) {
                // this.label.prepend(this._config.label);
                this.labelBeforeText = this._config.label;
                this.labelAfterText = '';
            } else {}
            this.labelText = this.labelBeforeText + this.labelAfterText;
        }
        /**
         * ラベル要素を割り当てる
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.4.0
         *
         */

    }, {
        key: '_asignLabel',
        value: function _asignLabel() {
            this.hasLabelByForAttr = false;
            // 祖先のlabel要素を検索
            var $label = $(this.closest('label'));
            // label要素の存在
            var hasLabel = !!$label.length;
            // labelでネストされていたかどうか
            this.isWrappedByLabel = hasLabel;
            // for属性に関連づいたlabel要素を取得
            if (!hasLabel) {
                $label = $('label[for="' + this.id + '"]');
                hasLabel = !!$label.length;
                this.hasLabelByForAttr = hasLabel;
            }
            // ラベルがないときにラベル要素を生成する
            if (this._config.autoLabeling && this._config.labelTag && !hasLabel) {
                // label(もしくは別の)要素の生成
                $label = $('<' + this._config.labelTag.toLowerCase() + ' />');
                $label.insertAfter(this.el);
                if (this._config.labelClass) {
                    $label.addClass(this._config.labelClass);
                }
                if (this._config.labelTag.toLowerCase() === 'label') {
                    // labelを生成したのならfor属性にidを紐付ける
                    $label.attr('for', this.id);
                }
            }
            // console.log({
            // 	hasLabel: hasLabel,
            // 	isWrappedByLabel: this.isWrappedByLabel,
            // 	hasLabelByForAttr: this.hasLabelByForAttr
            // });
            // BaserElement.addClass($label, FormElement.classNameFormElementCommon);
            // BaserElement.addClass($label, FormElement.classNameFormElementCommon, FormElement.classNameLabel);
            // this.label = $label;
        }
    }]);

    return FormElement;
}(BaserElement_1.default);
/**
 * オプションのデフォルト値
 *
 * @version 0.0.5
 * @since 0.0.1
 *
 */


FormElement.defaultOption = {
    label: '',
    labelTag: 'label',
    labelClass: '',
    autoLabeling: true
};
/**
 * FormElement関連の要素の共通のクラス
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
FormElement.classNameFormElementCommon = 'form-element';
/**
 * FormElement関連のラッパー要素の共通のクラス
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
FormElement.classNameWrapper = 'wrapper';
/**
 * FormElement関連のラベル要素の共通のクラス
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
FormElement.classNameLabel = 'label';
/**
 * FormElement関連の要素のフォーカス時に付加されるクラス
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
FormElement.classNameStateFocus = 'focus';
/**
 * FormElement関連の要素のフォーカスがはずれた時に付加されるクラス
 *
 * @version 0.1.0
 * @since 0.1.0
 *
 */
FormElement.classNameStateBlur = 'blur';
/**
 * FormElement関連の要素の無効状態の時に付加されるクラス
 *
 * @version 0.4.0
 * @since 0.4.0
 *
 */
FormElement.classNameStateDisabled = 'disabled';
/**
 * フォーム関連要素リスト
 *
 * @version 0.7.0
 * @since 0.7.0
 *
 */
FormElement.elements = [];
/**
 * クラス名
 */
FormElement._name = Symbol('FormElement');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormElement;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaserElement_1 = __webpack_require__(7);
var Browser_1 = __webpack_require__(8);
/**
 * マップ要素
 *
 * @version 0.9.0
 * @since 0.0.6
 *
 */

var GoogleMaps = function (_BaserElement_1$defau) {
    _inherits(GoogleMaps, _BaserElement_1$defau);

    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.0.6
     * @param el 管理するDOM要素
     * @param options マップオプション
     *
     */
    function GoogleMaps(el, options) {
        _classCallCheck(this, GoogleMaps);

        // 既にエレメント化されていた場合は何もしない
        var _this = _possibleConstructorReturn(this, (GoogleMaps.__proto__ || Object.getPrototypeOf(GoogleMaps)).call(this, el));

        if (_this._elementized) {
            return _possibleConstructorReturn(_this);
        }
        if ('google' in window && google.maps) {
            _this.addClass(GoogleMaps.className);
            _this.mapOption = _this.mergeOptions(GoogleMaps.defaultOptions, options);
            _this._init();
            // TODO: 必要な処理か検討
            GoogleMaps.maps.push(_this);
            _this.data(GoogleMaps.className, _this);
        } else {
            if ('console' in window) {
                console.warn('ReferenceError: "//maps.google.com/maps/api/js" を先に読み込む必要があります。');
                return _possibleConstructorReturn(_this);
            }
        }
        return _this;
    }
    /**
     * 住所文字列から座標を非同期で取得
     *
     * @version 0.12.0
     * @since 0.2.0
     *
     */


    _createClass(GoogleMaps, [{
        key: 'reload',

        /**
         * 再読み込み・再設定
         *
         * @version 0.6.0
         * @since 0.2.0
         *
         */
        value: function reload(options) {
            this.mapOption = options ? this.mergeOptions(GoogleMaps.defaultOptions, options) : this.mapOption;
            this._init();
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
            return this.__isElementized(GoogleMaps);
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
            this.__elementize(GoogleMaps);
        }
        /**
         * 初期化
         *
         * @version 1.0.0
         * @since 0.0.6
         *
         */

    }, {
        key: '_init',
        value: function _init() {
            var _this2 = this;

            // data-*属性からの継承
            this.mapOption = this.mergeOptions(this.mapOption, {
                zoom: this.data('zoom'),
                fitBounds: this.data('fit-bounds')
            });
            this.markerBounds = new google.maps.LatLngBounds();
            var mapCenterLat = parseInt(this.data('lat'), 10) || GoogleMaps.defaultLat;
            var mapCenterLng = parseInt(this.data('lng'), 10) || GoogleMaps.defaultLng;
            var mapCenterAddress = this.data('address') || '';
            if (mapCenterAddress) {
                // 住所から緯度・経度を検索する（非同期）
                GoogleMaps.getLatLngByAddress(mapCenterAddress, function (lat, lng) {
                    _this2._render(lat, lng);
                });
            } else {
                this._render(mapCenterLat, mapCenterLng);
            }
        }
        /**
         * レンダリング
         *
         * use: jQuery
         *
         * @version 1.0.0
         * @since 0.2.0
         * @param mapCenterLat 緯度
         * @param mapCenterLng 経度
         *
         */

    }, {
        key: '_render',
        value: function _render(mapCenterLat, mapCenterLng) {
            // this.$coordinates[0] = this.$coordinates[0] || this.$el.find('[data-lat][data-lng], [data-address]').detach();
            // if (this.$coordinates[0.length <= 0) {
            // 	this.$coordinates[0] = this.$el;
            // }
            // const coordinates[0: Coordinate[] = [];
            // this.$coordinates[0.each( (i: number, el: HTMLElement): void => {
            // 	const coordinate: Coordinate = new Coordinate(el, this);
            // 	coordinates[0.push(coordinate);
            // });
            // this.mapOption = <GoogleMapsOption> $.extend(
            // 	{
            // 		zoom: 14,
            // 		mapTypeControlOptions: <google.maps.MapTypeControlOptions> {
            // 			mapTypeIds: <google.maps.MapTypeId[]> [
            // 				google.maps.MapTypeId.HYBRID,
            // 				google.maps.MapTypeId.ROADMAP,
            // 			],
            // 		},
            // 		scrollwheel: <boolean> false,
            // 		center: <google.maps.LatLng> new google.maps.LatLng(mapCenterLat, mapCenterLng),
            // 		styles: null,
            // 	},
            // 	this.mapOption
            // );
            // this.info = new google.maps.InfoWindow({
            // 	disableAutoPan: <boolean> true,
            // });
            // this.gmap = new google.maps.Map(this.el, $.extend({}, this.mapOption, {
            // 	fitBounds: google.maps.Map.prototype.fitBounds,
            // }));
            // $.each(coordinates[0, (i: number, coordinate: Coordinate ): void => {
            // 	coordinate.markTo( (coordinate: Coordinate): void => {
            // 		if (this.mapOption.fitBounds) {
            // 			this.markerBounds.extend(coordinate.position);
            // 			this.gmap.fitBounds(this.markerBounds);
            // 		}
            // 	});
            // });
        }
    }], [{
        key: 'getLatLngByAddress',
        value: function getLatLngByAddress(address, callback) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                address: address
            }, function (results, status) {
                switch (status) {
                    case google.maps.GeocoderStatus.OK:
                        {
                            var lat = results[0].geometry.location.lat();
                            var lng = results[0].geometry.location.lng();
                            callback(lat, lng);
                        }
                        break;
                    case google.maps.GeocoderStatus.INVALID_REQUEST:
                    case google.maps.GeocoderStatus.ZERO_RESULTS:
                        {
                            if (console && console.warn) {
                                console.warn('ReferenceError: "' + address + 'は不正な住所だったため結果を返すことができませんでした。"');
                            }
                        }
                        break;
                    case google.maps.GeocoderStatus.OVER_QUERY_LIMIT:
                        {
                            if (console && console.warn) {
                                console.warn('Error: "リクエスト数の上限を超えました。' + address + 'は処理されません。"');
                            }
                        }
                        break;
                    case google.maps.GeocoderStatus.ERROR:
                    case google.maps.GeocoderStatus.UNKNOWN_ERROR:
                        {
                            if (console && console.warn) {
                                console.warn('Error: "エラーが発生しました。' + address + 'は処理されません。"');
                            }
                        }
                        break;
                    default:
                        {}
                }
            });
        }
    }]);

    return GoogleMaps;
}(BaserElement_1.default);
/**
 *
 */


GoogleMaps.defaultOptions = {};
/**
 * 初期設定用の緯度
 * 東京都庁
 *
 * @version 0.0.6
 * @since 0.0.6
 *
 */
GoogleMaps.defaultLat = 35.681382;
/**
 * 初期設定用の経度
 * 東京都庁
 *
 * @version 0.0.6
 * @since 0.0.6
 *
 */
GoogleMaps.defaultLng = 139.766084;
/**
 * 管理対象の要素に付加するclass属性値のプレフィックス
 *
 * @version 0.0.6
 * @since 0.0.6
 *
 */
GoogleMaps.className = '-bc-map-element';
/**
 * 管理するマップ要素リスト
 *
 * @version 0.0.6
 * @since 0.0.6
 *
 */
GoogleMaps.maps = [];
/**
 * クラス名
 */
GoogleMaps._name = Symbol('GoogleMaps');
/**
 * 座標要素
 *
 * @version 0.9.0
 * @since 0.0.6
 *
 */

var Coordinate = function () {
    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.0.6
     * @param el 対象のDOM要素
     * @param map GoogleMaps要素
     *
     */
    function Coordinate(el, map) {
        var _this3 = this;

        _classCallCheck(this, Coordinate);

        this.el = el;
        this._map = map;
        var address = this.$el.data('address');
        // const dfd: JQueryDeferred<void> = $.Deferred<void>();
        if (address) {
            GoogleMaps.getLatLngByAddress(address, function (lat, lng) {
                _this3.lat = lat;
                _this3.lng = lng;
                _this3.position = new google.maps.LatLng(_this3.lat, _this3.lng);
                // dfd.resolve();
            });
        } else {
            this.lat = +this.$el.data('lat');
            this.lng = +this.$el.data('lng');
            this.position = new google.maps.LatLng(this.lat, this.lng);
        }
        // this._promiseLatLng = dfd.promise();
    }
    /**
     * ピンをマップに立てる
     *
     * @version 0.8.0
     * @since 0.0.6
     * @param callback 位置情報が取得できた後に実行するコールバック
     *
     */


    _createClass(Coordinate, [{
        key: 'markTo',
        value: function markTo(callback) {
            var _this4 = this;

            this._promiseLatLng.done(function () {
                _this4._markTo();
                if (callback) {
                    callback(_this4);
                }
            });
        }
        /**
         * インフォウィンドウを開く
         *
         * use: jQuery
         *
         * @version 0.9.0
         * @since 0.8.0
         *
         */

    }, {
        key: 'openInfoWindow',
        value: function openInfoWindow() {
            this._map.info.setContent(this.el);
            this._map.info.open(this._map.gmap, this.marker);
            this.marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
            // マップの中心を移動する
            var content = this._map.info.getContent();
            var proj = this._map.gmap.getProjection();
            var currentPoint = proj.fromLatLngToPoint(this.position);
            var scale = Math.pow(2, this._map.gmap.getZoom());
            var height = content.offsetHeight;
            var y = (currentPoint.y * scale - height) / scale;
            var newPoint = new google.maps.Point(currentPoint.x, y);
            var newPosition = proj.fromPointToLatLng(newPoint);
            this._map.gmap.panTo(newPosition);
        }
        /**
         * ピンをマップに立てる
         *
         * use: jQuery
         *
         * @version 0.12.0
         * @since 0.0.6
         *
         */

    }, {
        key: '_markTo',
        value: function _markTo() {
            this.title = this.$el.attr('title') || this.$el.data('title') || this.$el.find('h1,h2,h3,h4,h5,h6').text() || null;
            var iconURL = this.$el.data('icon');
            var iconSize = this.$el.data('iconSize');
            var iconHref = this.$el.data('iconHref');
            var iconTarget = this.$el.data('iconTarget') === '_blank' || false;
            if (iconURL) {
                this.icon = {};
                this.icon.url = iconURL;
                if (iconSize) {
                    var sizeQ = ('' + iconSize).split(/\s+/);
                    var width = +sizeQ[0];
                    if (!isNaN(width)) {
                        var height = +sizeQ[1] || width;
                        var size = new google.maps.Size(width, height);
                        this.icon.size = size;
                        this.icon.scaledSize = size;
                    }
                }
            }
            this.marker = new google.maps.Marker({
                position: this.position,
                title: this.title,
                icon: this.icon,
                map: this._map.gmap
            });
            if (iconHref) {
                google.maps.event.addListener(this.marker, 'click', Browser_1.default.getBrowser().jumpTo.bind(null, iconHref, iconTarget));
            } else if (this._map.coordinates[0] !== this._map.el) {
                google.maps.event.addListener(this.marker, 'click', this.openInfoWindow.bind(this));
            }
        }
    }]);

    return Coordinate;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GoogleMaps;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var String_1 = __webpack_require__(21);
/**
 * URLの情報を管理するクラス
 *
 * @version 0.9.0
 * @since 0.7.0
 *
 */

var Locational = function () {
    /**
     * コンストラクタ
     *
     * @version 0.7.0
     * @since 0.7.0
     * @param originalLocation 元となるロケーションオブジェクト
     *
     */
    function Locational(originalLocation) {
        _classCallCheck(this, Locational);

        // ex) http:
        this.protocol = originalLocation.protocol;
        // ex) www.sample.com:80
        this.host = originalLocation.host;
        // ex) www.sample.com
        this.hostname = originalLocation.hostname;
        // ex) 80
        this.port = originalLocation.port;
        // /path/dir/file.ext
        this.pathname = originalLocation.pathname;
        // ?key=value&key2=value
        this.search = originalLocation.search;
        // #hash
        this.hash = originalLocation.hash;
        this.update();
    }
    /**
     * クエリー文字列をハッシュにして返す
     *
     * @version 0.10.0
     * @since 0.7.0
     * @param queryString クエリー文字列
     * @return ハッシュデータ
     *
     */


    _createClass(Locational, [{
        key: 'update',

        /**
         * プロパティを最適化する
         *
         * @version 0.9.0
         * @since 0.7.0
         * @return インスタンス自身
         *
         */
        value: function update() {
            // ex) http://www.sample.com:80
            this.origin = this.protocol + '//' + this.host;
            // ex) /path/dir/file.ext?key=value&key2=value#hash
            this.path = '' + this.pathname + this.search + this.hash;
            // ex) http://www.sample.com:80/path/dir/file.ext?key=value&key2=value#hash
            this.href = '' + this.origin + this.path;
            // ex) key=value&key2=value
            this.query = this.search.replace(/^\?/, '');
            // ex) { "key": "value", "key2": "value" }
            this.params = Locational.parseQueryString(this.query);
            return this;
        }
        /**
         * パラメータを追加する
         *
         * @version 0.9.0
         * @since 0.7.0
         * @param key パラメータのキー
         * @param value パラメータの値
         * @return インスタンス自身
         *
         */

    }, {
        key: 'addParam',
        value: function addParam(key, value) {
            if (typeof value === 'string' || !value) {
                var eqAndValue = '';
                if (value !== undefined) {
                    eqAndValue = '=' + value;
                }
                if (this.search) {
                    this.search += '&' + key + eqAndValue;
                } else {
                    this.search = '?' + key + eqAndValue;
                }
            } else {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var val = _step.value;

                        var _eqAndValue = '';
                        if (val !== undefined) {
                            _eqAndValue = '=' + val;
                        }
                        if (this.search) {
                            this.search += '&' + key + '[]' + _eqAndValue;
                        } else {
                            this.search = '?' + key + '[]' + _eqAndValue;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            this.update();
            return this;
        }
        /**
         * パラメータを削除する
         *
         * @version 0.7.0
         * @since 0.7.0
         * @param key パラメータのキー
         * @return インスタンス自身
         *
         */

    }, {
        key: 'removeParam',
        value: function removeParam(key) {
            this.search = this.search.replace(new RegExp(key + '(?:\\[\\])?(?:=[^&]*)?(&|$)', 'g'), '');
            this.update();
            return this;
        }
        /**
         * 暗黙の文字列変換
         *
         * @version 0.7.0
         * @since 0.7.0
         * @return 変換された文字列
         *
         */

    }, {
        key: 'toString',
        value: function toString() {
            this.update();
            return this.href;
        }
    }], [{
        key: 'parseQueryString',
        value: function parseQueryString(queryString) {
            var params = {};
            if (queryString) {
                var queries = queryString.split(/&/g);
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = queries[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var query = _step2.value;

                        var keyValue = String_1.default.divide(query, '=');
                        var key = keyValue[0];
                        var value = keyValue[1];
                        if (key) {
                            if (/\[\]$/.test(key)) {
                                key = key.replace(/\[\]$/, '');
                                var child = params[key];
                                if (child && child instanceof Array) {
                                    child.push(value);
                                    params[key] = child;
                                } else {
                                    params[key] = [value];
                                }
                            } else {
                                params[key] = value;
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
            return params;
        }
    }]);

    return Locational;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Locational;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DispatchEvent_1 = __webpack_require__(27);
var Browser_1 = __webpack_require__(8);
var Timer_1 = __webpack_require__(46);
/**
 * スクロールを管理するクラス
 *
 * @version 0.9.0
 * @since 0.0.8
 *
 */

var Scroll = function () {
    function Scroll() {
        _classCallCheck(this, Scroll);

        this.timer = new Timer_1.default();
    }
    /**
     * 対象の要素もしくは位置にスクロールを移動させる
     *
     * @version 1.0.0
     * @since 0.0.8
     * @param selector 対象の要素のセレクタ・HTMLオブジェクト・もしくはスクロール位置
     * @param options オプション
     * @return インスタンス自信
     *
     */


    _createClass(Scroll, [{
        key: 'to',
        value: function to(selector, options) {
            var _this = this;

            this.options = options || {};
            var offset = this.options.offset || 0;
            if (this.options.wheelCancel) {
                document.addEventListener('wheel', function () {
                    if (_this.isScroll) {
                        _this._finish();
                        if (_this.options.onScrollCancel) {
                            _this.options.onScrollCancel.call(_this, new DispatchEvent_1.default('scrollcancel'));
                        }
                    }
                    return;
                });
            }
            // 第一引数が数値だった場合はその値のy軸へスクロール
            if (typeof selector === 'number') {
                offset += selector || 0;
                this.targetX = 0;
                this.targetY = offset;
            } else if (selector) {
                var target = void 0;
                if (typeof selector === 'string') {
                    target = document.querySelector(selector);
                } else {
                    target = selector;
                }
                if (!target) {
                    return this;
                }
                var elem = target;
                // スクロール先座標をセットする
                var x = 0;
                var y = 0;
                // 親のオフセットを足していって自身の座標を確定
                while (elem) {
                    x += elem.offsetLeft;
                    y += elem.offsetTop;
                    elem = elem.offsetParent;
                }
                var winWidth = document.documentElement.clientWidth;
                var winHeight = document.documentElement.clientHeight;
                var docWidth = document.documentElement.scrollWidth;
                var docHeight = document.documentElement.scrollHeight;
                var maxScrollX = Math.max(winWidth, docWidth);
                var maxScrollY = Math.max(winHeight, docHeight);
                this.targetX = Math.min(x, maxScrollX) + offset;
                this.targetY = Math.min(y, maxScrollY) + offset;
            } else {
                var _ret = function () {
                    var target = document.getElementById(location.hash.replace('#', ''));
                    if (target) {
                        Timer_1.default.wait(Scroll.delayWhenURLHashTarget, function () {
                            window.scrollTo(0, 0);
                            _this.to(target, {
                                offset: offset
                            });
                            return;
                        });
                    }
                    return {
                        v: _this
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
            }
            // スクロール停止中ならスクロール開始
            if (!this.isScroll) {
                this.isScroll = true;
                if (this.options.onScrollStart) {
                    this.options.onScrollStart.call(this, new DispatchEvent_1.default('scrollstart'));
                }
                this._progress();
            }
            return this;
        }
        /**
         * スクロール
         *
         * @version 1.0.0
         * @since 0.0.8
         *
         */

    }, {
        key: '_progress',
        value: function _progress() {
            var browser = Browser_1.default.getBrowser();
            var currentX = browser.scrollLeft;
            var currentY = browser.scrollTop;
            var vx = (this.targetX - currentX) / Scroll.speed;
            var vy = (this.targetY - currentY) / Scroll.speed;
            if (Math.abs(vx) < 1 && Math.abs(vy) < 1 || this.prevX === currentX && this.prevY === currentY) {
                // 目標座標付近に到達していたら終了
                window.scrollTo(this.targetX, this.targetY);
                this._finish();
                if (this.options.onScrollEnd) {
                    this.options.onScrollEnd.call(this, new DispatchEvent_1.default('scrollend'));
                }
            } else {
                var nextX = Math.floor(currentX + vx);
                var nextY = Math.floor(currentY + vy);
                // 繰り返し
                window.scrollTo(nextX, nextY);
                this.prevX = currentX;
                this.prevY = currentY;
                if (this.options.onScrollProgress) {
                    this.options.onScrollProgress.call(this, new DispatchEvent_1.default('scrollprogress'));
                }
                this.timer.wait(Scroll.interval, this._progress, this);
            }
        }
        /**
         * スクロールの終了
         *
         * @version 0.9.0
         * @since 0.0.8
         *
         */

    }, {
        key: '_finish',
        value: function _finish() {
            this.isScroll = false;
            this.prevX = null;
            this.prevY = null;
            this.timer.stop();
        }
    }]);

    return Scroll;
}();

Scroll.speed = 4;
Scroll.interval = 20;
Scroll.delayWhenURLHashTarget = 30;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Scroll;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
// import BaserElement from './BaserElement';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormElement_1 = __webpack_require__(71);
/**
 * セレクトボックスの拡張クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */

var Select = function (_FormElement_1$defaul) {
  _inherits(Select, _FormElement_1$defaul);

  function Select() {
    _classCallCheck(this, Select);

    return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
  }

  return Select;
}(FormElement_1.default);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Select;

/***/ },
/* 76 */
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * ユーティリティ配列クラス
 *
 * @version 0.9.0
 * @since 0.2.0
 *
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UtilArray = function () {
    function UtilArray() {
        _classCallCheck(this, UtilArray);
    }

    _createClass(UtilArray, null, [{
        key: "remove",

        /**
         * 配列中の指定の番号の要素を削除して詰める
         *
         * @version 0.2.0
         * @since 0.2.0
         * @param array 対象の配列
         * @param index 削除する番号
         * @return 削除された配列
         *
         */
        value: function remove(array, index) {
            array.splice(index, 1);
            return array;
        }
        /**
         * 配列をランダムに入れ替えて返す
         *
         * Fisher-Yates法
         *
         * @version 0.10.0
         * @since 0.10.0
         * @param array 対象の配列
         * @return ランダムに入れ替えられた配列
         *
         */

    }, {
        key: "shuffle",
        value: function shuffle(array) {
            var newArray = array.concat();
            var n = newArray.length;
            for (var i = n - 1; i >= 0; i--) {
                var random = Math.floor(Math.random() * (i + 1));
                var tmp = newArray[i];
                newArray[i] = newArray[random];
                newArray[random] = tmp;
            }
            return newArray;
        }
    }]);

    return UtilArray;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UtilArray;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Array_1 = __webpack_require__(76);
var BaserElement_1 = __webpack_require__(7);
var Browser_1 = __webpack_require__(8);
/**
 * YouTube要素
 *
 * TODO: YouTubeのURLパラメータのinterfaceをつくる
 *
 * @version 0.10.0
 * @since 0.0.7
 *
 */

var YouTube = function (_BaserElement_1$defau) {
    _inherits(YouTube, _BaserElement_1$defau);

    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * @version 1.0.0
     * @since 0.0.7
     * @param el 管理するDOM要素
     * @param options オプション
     *
     */
    function YouTube(el, options) {
        _classCallCheck(this, YouTube);

        /**
         * プレイヤーが有効になっているかどうか
         *
         * @version 0.5.0
         * @since 0.5.0
         *
         */
        var _this = _possibleConstructorReturn(this, (YouTube.__proto__ || Object.getPrototypeOf(YouTube)).call(this, el));

        _this.isEmbeded = false;
        // 既にエレメント化されていた場合は何もしない
        if (_this._elementized) {
            return _possibleConstructorReturn(_this);
        }
        if (_this._init(options)) {
            YouTube.movies.push(_this);
            $(_this.el).addClass(YouTube.className);
            $(_this.el).data(YouTube.className, _this);
        }
        return _this;
    }
    /**
     * YouTubeのiframeのソースURIを生成する
     *
     * @version 1.0.0
     * @since 0.9.1
     */


    _createClass(YouTube, [{
        key: 'reload',

        /**
         * 再設定する
         *
         * @version 0.0.7
         * @since 0.0.7
         * @param options オプション
         *
         */
        value: function reload(options) {
            this._init(options);
        }
        /**
         * ミュートする
         *
         * @version 0.8.0
         * @since 0.5.0
         *
         */

    }, {
        key: 'mute',
        value: function mute() {
            this.player.mute();
            this._isMuted = true;
            this.trigger('onmute', [this.player]);
        }
        /**
         * ミュートを解除する
         *
         * @version 0.8.0
         * @since 0.5.0
         *
         */

    }, {
        key: 'unMute',
        value: function unMute() {
            this.player.unMute();
            this._isMuted = false;
            this.trigger('onunmute', [this.player]);
        }
        /**
         * ミュートのオンオフを要素にアサインする
         *
         * TODO: 別のクラスにする
         *
         * @version 1.0.0
         * @since 0.5.0
         * @param el アサインするDOM要素
         * @param options オプション
         *
         */

    }, {
        key: 'muteController',
        value: function muteController(el, options) {
            var _this2 = this;

            var defaults = {
                eventType: 'click',
                mutedClass: 'is-muted',
                unmutedClass: 'is-unmuted',
                baseClass: 'youtube-mute-ctrl'
            };
            var conf = $.extend(defaults, options);
            BaserElement_1.default.addClass(el, conf.baseClass);
            var update = function update() {
                if (_this2._isMuted) {
                    BaserElement_1.default.addClass(el, conf.baseClass, '', conf.mutedClass);
                    BaserElement_1.default.removeClass(el, conf.baseClass, '', conf.unmutedClass);
                } else {
                    BaserElement_1.default.addClass(el, conf.baseClass, '', conf.unmutedClass);
                    BaserElement_1.default.removeClass(el, conf.baseClass, '', conf.mutedClass);
                }
            };
            var bindCtrl = function bindCtrl() {
                el.addEventListener(conf.eventType, function () {
                    if (_this2._isMuted) {
                        _this2.unMute();
                    } else {
                        _this2.mute();
                    }
                    update();
                }, false);
                update();
            };
            this.on('onmute onunmute', function () {
                update();
            });
            if (this.isEmbeded) {
                bindCtrl();
            } else {
                this.on('embeded', function (e, ytp) {
                    _this2.off(e.type);
                    bindCtrl();
                });
            }
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
            return this.__isElementized(YouTube);
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
            this.__elementize(YouTube);
        }
        /**
         * 初期化
         *
         * @version 1.0.0
         * @since 0.0.7
         * @param $el 管理するDOM要素のjQueryオブジェクト
         * @param options オプション
         * @return 初期化が成功したかどうか
         *
         */

    }, {
        key: '_init',
        value: function _init(options) {
            this.movieOption = this.mergeOptions({
                rel: false,
                autoplay: true,
                stopOnInactive: false,
                controls: false,
                loop: true,
                showinfo: false,
                mute: false,
                id: '',
                width: 400,
                height: 300,
                index: 0,
                poster: null,
                posterHighQuality: false,
                startSeconds: 0,
                suggestedQuality: 'default',
                shuffle: false,
                preEmbed: true
            }, options);
            if (Browser_1.default.getBrowser().spec.ua.iOS) {
                this.movieOption.autoplay = false;
                this.movieOption.preEmbed = true;
            }
            var movieIdList = this.movieOption.id ? this.movieOption.id.split(/\s*,\s*/) : [];
            if (this.movieOption.shuffle) {
                movieIdList = Array_1.default.shuffle(movieIdList);
            }
            var movieId = movieIdList[this.movieOption.index || 0];
            var param = {
                version: 3,
                rel: this.movieOption.rel ? 1 : 0,
                autoplay: 0,
                controls: this.movieOption.controls ? 1 : 0,
                disablekb: 1,
                iv_load_policy: 3,
                loop: this.movieOption.loop ? 1 : 0,
                modestbranding: 1,
                showinfo: this.movieOption.showinfo ? 1 : 0,
                wmode: 'transparent',
                enablejsapi: 1
            };
            this.src = YouTube.getURI(movieId, param);
            this.movieId = movieIdList;
            this.playerDomId = this.id + '-Player';
            if (this.movieOption.poster !== null && !this.movieOption.autoplay) {
                this._createPosterImage(movieId);
            } else {
                this._createPlayerFrame();
                this._loadYouTubeAPI();
            }
            return true;
        }
        /**
         * ポスターイメージの生成
         *
         * use: JQuery
         *
         * data-poster属性の中からポスター画像を生成する
         *
         * data-posterが 値なし もしくは 空文字 の場合、YouTubeのサムネイル画像を参照する
         * data-posterの値が `/^@contents?$/i` にマッチする場合、要素の中身をそのまま使う
         * それ以外の場合は パスと見なして画像を参照する
         *
         * @version 0.10.2
         * @since 0.9.1
         * @param movieId 動画のID
         *
         */

    }, {
        key: '_createPosterImage',
        value: function _createPosterImage(movieId) {}
        // const posterContainer: HTMLElement = $('<div class="-bc-element -bc-youtube-pseudo-poster-element" />');
        // if (this.movieOption.width) {
        // 	posterContainer.width(this.movieOption.width);
        // }
        // if (this.movieOption.height) {
        // 	posterContainer.height(this.movieOption.height);
        // }
        // posterContainer.css({
        // 	position: 'absolute',
        // 	top: 0,
        // 	left: 0,
        // 	pointerEvents: Browser.getBrowser().spec.ua.iOS ? 'none' : 'all',
        // 	cursor: 'pointer',
        // });
        // if (/^@contents?$/i.test(this.movieOption.poster)) {
        // 	const children: NodeListOf<HTMLElement> = this.el.children().detach();
        // 	if (this.movieOption.preEmbed) {
        // 		this._createPlayerFrame();
        // 		this._loadYouTubeAPI();
        // 	}
        // 	posterContainer.appendChild(children);
        // 	this.el.appendChild(posterContainer);
        // } else {
        // 	if (this.movieOption.poster === '') {
        // 		this.movieOption.poster = YouTube.getPosterImage(movieId, this.movieOption.posterHighQuality);
        // 	}
        // 	if (this.movieOption.preEmbed) {
        // 		this.$el.empty();
        // 		this._createPlayerFrame();
        // 		this._loadYouTubeAPI();
        // 	} else {
        // 		posterContainer.css({
        // 			position: 'relative',
        // 		});
        // 	}
        // 	posterContainer.appendTo(this.$el);
        // 	if (this.movieOption.width) {
        // 		posterContainer.width(this.movieOption.width);
        // 	}
        // 	if (this.movieOption.height) {
        // 		posterContainer.height(this.movieOption.height);
        // 	}
        // 	posterContainer.css({
        // 		position: 'absolute',
        // 		top: 0,
        // 		left: 0,
        // 		width: '100%',
        // 		height: '100%',
        // 		backgroundImage: `url("${this.movieOption.poster}")`,
        // 		backgroundRepeat: 'no-repeat',
        // 		backgroundSize: 'cover',
        // 		backgroundPosition: 'center center',
        // 		backgroundColor: '#000',
        // 		pointerEvents: 'none',
        // 		cursor: 'pointer',
        // 	});
        // }
        // if (this.movieOption.preEmbed) {
        // 	posterContainer.on('click', () => {
        // 		if (this.player) {
        // 			posterContainer.off('click');
        // 			this._$posterContainer.addClass('-bc-youtube-pseudo-poster-element--loading');
        // 			this.player.playVideo();
        // 		}
        // 	});
        // } else {
        // 	posterContainer.css({
        // 		pointerEvents: 'all',
        // 	});
        // 	if (/^@contents?$/i.test(this.movieOption.poster)) {
        // 		const $children: JQuery = this.$el.children().detach();
        // 		posterContainer.append($children);
        // 		posterContainer.appendTo(this.$el);
        // 	}
        // 	posterContainer.on('click', () => {
        // 		this.movieOption.autoplay = true;
        // 		this._createPlayerFrame();
        // 		this._loadYouTubeAPI();
        // 	});
        // }
        // this._$posterContainer = posterContainer;

        /**
         * プレイヤーフレームを生成する
         *
         * @version 0.10.3
         * @since 0.9.1
         */

    }, {
        key: '_createPlayerFrame',
        value: function _createPlayerFrame() {
            var $frame = $('<iframe class="-bc-youtube-player-frame-element" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen />');
            $frame.prop({
                src: this.src,
                id: this.playerDomId
            });
            $frame.css({
                position: 'relative',
                display: 'block',
                width: '100%',
                height: '100%'
            });
            $frame.prependTo(this.el);
            if (this.movieOption.width) {
                $frame.width(this.movieOption.width);
                $frame.data('width', this.movieOption.width);
            }
            if (this.movieOption.height) {
                $frame.height(this.movieOption.height);
                $frame.data('height', this.movieOption.height);
            }
            this._$frame = $frame;
        }
        /**
         * YouTube APIをロードする
         *
         * @version 0.10.2
         * @since 0.9.1
         */

    }, {
        key: '_loadYouTubeAPI',
        value: function _loadYouTubeAPI() {
            var _this3 = this;

            if (!('YT' in window && YT.Player)) {
                $.getScript('' + Browser_1.default.getBrowser().availableScheme + YouTube.API_URL);
            }
            var intervalTimer = setInterval(function () {
                if (!_this3.player && 'YT' in window && YT.Player) {
                    _this3._createPlayer(_this3.playerDomId);
                }
                if (_this3.player && _this3.player.pauseVideo && _this3.player.playVideo) {
                    clearInterval(intervalTimer);
                    _this3._onEmbeded();
                }
            }, 300);
        }
        /**
         * プレイヤーを生成する
         *
         * use: jQuery
         *
         * @version 0.10.3
         * @since 0.8.0
         * @param playerID プレイヤーのDOM ID
         *
         */

    }, {
        key: '_createPlayer',
        value: function _createPlayer(playerID) {
            var _this4 = this;

            this.player = new YT.Player(playerID, {
                events: {
                    onStateChange: function onStateChange(e) {
                        switch (e.data) {
                            case -1:
                                {
                                    _this4.trigger('unstarted', [_this4.player]);
                                    var listIndex = _this4.player.getPlaylistIndex();
                                    if (_this4.currentCueIndex !== listIndex) {
                                        _this4.trigger('changecue', [_this4.player]);
                                    }
                                    _this4.currentCueIndex = listIndex;
                                }
                                break;
                            case YT.PlayerState.BUFFERING:
                                {
                                    if (_this4._$posterContainer) {
                                        _this4._$posterContainer.addClass('-bc-youtube-pseudo-poster-element--loading');
                                    }
                                    _this4.trigger('buffering', [_this4.player]);
                                }
                                break;
                            case YT.PlayerState.CUED:
                                {
                                    _this4.trigger('cued', [_this4.player]);
                                }
                                break;
                            case YT.PlayerState.ENDED:
                                {
                                    _this4.trigger('ended', [_this4.player]);
                                    if (_this4.movieId.length > 1 && _this4.movieOption.loop && _this4.currentCueIndex === _this4.movieId.length - 1) {
                                        _this4.player.playVideoAt(0);
                                    } else if (_this4.movieOption.loop) {
                                        _this4.player.playVideo();
                                    }
                                }
                                break;
                            case YT.PlayerState.PAUSED:
                                {
                                    _this4.trigger('paused', [_this4.player]);
                                }
                                break;
                            case YT.PlayerState.PLAYING:
                                {
                                    _this4._hidePoster();
                                    _this4.trigger('playing', [_this4.player]);
                                    _this4.currentCueIndex = _this4.player.getPlaylistIndex();
                                }
                                break;
                            default:
                                {
                                    if ('console' in window) {
                                        console.warn('YouTube Player state is unknown.');
                                    }
                                }
                        }
                    }
                }
            });
        }
        /**
         * プレイヤーの生成が完了して実行可能になったときに呼ばれる処理
         *
         * use: jQuery
         *
         * TODO: embeddedyoutubeplayイベント廃止予定(v1.0.0)
         *
         * @version 0.10.3
         * @since 0.8.0
         *
         */

    }, {
        key: '_onEmbeded',
        value: function _onEmbeded() {
            var _this5 = this;

            this.isEmbeded = true;
            this._isMuted = this.player.isMuted();
            if (this.movieOption.mute) {
                this.mute();
            }
            if (this.movieOption.stopOnInactive) {
                $(window).on('blur', function () {
                    _this5.player.pauseVideo();
                }).on('focus', function () {
                    _this5.player.playVideo();
                });
            }
            if (this.movieId.length >= 2) {
                // TODO: youtube.d.ts に loadPlaylist() と cuePlaylist() が登録されていない
                var _player = this.player;
                if (this.movieOption.autoplay) {
                    _player.loadPlaylist(this.movieId, this.movieOption.index, this.movieOption.startSeconds, this.movieOption.suggestedQuality);
                } else {
                    _player.cuePlaylist(this.movieId, this.movieOption.index, this.movieOption.startSeconds, this.movieOption.suggestedQuality);
                }
            } else if (this.movieOption.autoplay) {
                this.player.playVideo();
            }
            this.trigger('embeded', [this.player]);
        }
        /**
         * ポスター要素を非表示にする
         *
         * @version 0.10.2
         * @since 0.10.0
         */

    }, {
        key: '_hidePoster',
        value: function _hidePoster() {
            if (this._$posterContainer) {
                this._$posterContainer.removeClass('-bc-youtube-pseudo-poster-element--loading');
                this._$posterContainer.detach();
            }
        }
    }], [{
        key: 'getURI',
        value: function getURI(movieId, param) {
            var paramQuery = $.param(param);
            return '' + Browser_1.default.getBrowser().availableScheme + YouTube.PLAYER_URL + movieId + '?' + paramQuery;
        }
        /**
         * YouTubeのサムネイル画像を取得する
         *
         * @version 1.0.0
         * @since 0.9.1
         *
         */

    }, {
        key: 'getPosterImage',
        value: function getPosterImage(movieId) {
            var highQuality = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var THUMB_URL = highQuality ? '//i.ytimg.com/vi/' : '//img.youtube.com/vi/';
            var THUMB_FILE_NAME = highQuality ? '/maxresdefault.jpg' : '/0.jpg';
            return '' + Browser_1.default.getBrowser().availableScheme + THUMB_URL + movieId + THUMB_FILE_NAME;
        }
    }]);

    return YouTube;
}(BaserElement_1.default);
/**
 * 管理対象の要素に付加するclass属性値のプレフィックス
 *
 * @version 0.0.7
 * @since 0.0.7
 *
 */


YouTube.className = '-bc-youtube-element';
/**
 * Player URL
 *
 * @version 0.0.7
 * @since 0.0.7
 *
 */
YouTube.PLAYER_URL = '//www.youtube.com/embed/';
/**
 * API URL
 *
 * @version 0.0.7
 * @since 0.0.7
 *
 */
YouTube.API_URL = '//www.youtube.com/player_api';
/**
 * 管理対象の要素
 *
 * @version 0.0.7
 * @since 0.0.7
 *
 */
YouTube.movies = [];
/**
 * クラス名
 *
 * @override
 * @version 1.0.0
 * @since 1.0.0
 */
YouTube._name = Symbol('YouTube');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = YouTube;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(0)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(10)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12)
  , toLength  = __webpack_require__(41)
  , toIndex   = __webpack_require__(101);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2)
  , isArray  = __webpack_require__(51)
  , SPECIES  = __webpack_require__(0)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(80);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var redefineAll       = __webpack_require__(37)
  , getWeak           = __webpack_require__(24).getWeak
  , anObject          = __webpack_require__(3)
  , isObject          = __webpack_require__(2)
  , anInstance        = __webpack_require__(29)
  , forOf             = __webpack_require__(34)
  , createArrayMethod = __webpack_require__(48)
  , $has              = __webpack_require__(4)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var global            = __webpack_require__(1)
  , $export           = __webpack_require__(22)
  , redefine          = __webpack_require__(6)
  , redefineAll       = __webpack_require__(37)
  , meta              = __webpack_require__(24)
  , forOf             = __webpack_require__(34)
  , anInstance        = __webpack_require__(29)
  , isObject          = __webpack_require__(2)
  , fails             = __webpack_require__(14)
  , $iterDetect       = __webpack_require__(53)
  , setToStringTag    = __webpack_require__(19)
  , inheritIfRequired = __webpack_require__(85);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(18)
  , gOPS    = __webpack_require__(36)
  , pIE     = __webpack_require__(25);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

var isObject       = __webpack_require__(2)
  , setPrototypeOf = __webpack_require__(97).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

/***/ },
/* 86 */
/***/ function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(17)
  , ITERATOR   = __webpack_require__(0)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(3);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var create         = __webpack_require__(54)
  , descriptor     = __webpack_require__(26)
  , setToStringTag = __webpack_require__(19)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(10)(IteratorPrototype, __webpack_require__(0)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ },
/* 90 */
/***/ function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(18)
  , toIObject = __webpack_require__(12);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

var global    = __webpack_require__(1)
  , macrotask = __webpack_require__(58).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(16)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(18)
  , gOPS     = __webpack_require__(36)
  , pIE      = __webpack_require__(25)
  , toObject = __webpack_require__(42)
  , IObject  = __webpack_require__(35)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(14)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(11)
  , anObject = __webpack_require__(3)
  , getKeys  = __webpack_require__(18);

module.exports = __webpack_require__(9) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12)
  , gOPN      = __webpack_require__(56).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(4)
  , toObject    = __webpack_require__(42)
  , IE_PROTO    = __webpack_require__(38)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(2)
  , anObject = __webpack_require__(3);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(13)(Function.call, __webpack_require__(55).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var global      = __webpack_require__(1)
  , dP          = __webpack_require__(11)
  , DESCRIPTORS = __webpack_require__(9)
  , SPECIES     = __webpack_require__(0)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(3)
  , aFunction = __webpack_require__(28)
  , SPECIES   = __webpack_require__(0)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(40)
  , defined   = __webpack_require__(31);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(40)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(30)
  , ITERATOR  = __webpack_require__(0)('iterator')
  , Iterators = __webpack_require__(17);
module.exports = __webpack_require__(5).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var addToUnscopables = __webpack_require__(78)
  , step             = __webpack_require__(90)
  , Iterators        = __webpack_require__(17)
  , toIObject        = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(52)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var LIBRARY            = __webpack_require__(23)
  , global             = __webpack_require__(1)
  , ctx                = __webpack_require__(13)
  , classof            = __webpack_require__(30)
  , $export            = __webpack_require__(22)
  , isObject           = __webpack_require__(2)
  , aFunction          = __webpack_require__(28)
  , anInstance         = __webpack_require__(29)
  , forOf              = __webpack_require__(34)
  , speciesConstructor = __webpack_require__(99)
  , task               = __webpack_require__(58).set
  , microtask          = __webpack_require__(92)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(0)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(37)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(19)($Promise, PROMISE);
__webpack_require__(98)(PROMISE);
Wrapper = __webpack_require__(5)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(53)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var $at  = __webpack_require__(100)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(52)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
// ECMAScript 6 symbols shim
var global         = __webpack_require__(1)
  , has            = __webpack_require__(4)
  , DESCRIPTORS    = __webpack_require__(9)
  , $export        = __webpack_require__(22)
  , redefine       = __webpack_require__(6)
  , META           = __webpack_require__(24).KEY
  , $fails         = __webpack_require__(14)
  , shared         = __webpack_require__(39)
  , setToStringTag = __webpack_require__(19)
  , uid            = __webpack_require__(20)
  , wks            = __webpack_require__(0)
  , wksExt         = __webpack_require__(59)
  , wksDefine      = __webpack_require__(44)
  , keyOf          = __webpack_require__(91)
  , enumKeys       = __webpack_require__(84)
  , isArray        = __webpack_require__(51)
  , anObject       = __webpack_require__(3)
  , toIObject      = __webpack_require__(12)
  , toPrimitive    = __webpack_require__(43)
  , createDesc     = __webpack_require__(26)
  , _create        = __webpack_require__(54)
  , gOPNExt        = __webpack_require__(95)
  , $GOPD          = __webpack_require__(55)
  , $DP            = __webpack_require__(11)
  , $keys          = __webpack_require__(18)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(56).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(25).f  = $propertyIsEnumerable;
  __webpack_require__(36).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(23)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';
var each         = __webpack_require__(48)(0)
  , redefine     = __webpack_require__(6)
  , meta         = __webpack_require__(24)
  , assign       = __webpack_require__(93)
  , weak         = __webpack_require__(82)
  , isObject     = __webpack_require__(2)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(83)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(44)('asyncIterator');

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(44)('observable');

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_fn_symbol__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_fn_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_fn_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_fn_weak_map__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_fn_weak_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_fn_weak_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_fn_promise__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_fn_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_fn_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__JQueryAdapter__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__JQueryAdapter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__JQueryAdapter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__BaserElement__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__BaserElement___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__BaserElement__);






/**
 * @namespace
 * @type {Object}
 */
var baser = window.baser || {}



baser.BaserElement = __WEBPACK_IMPORTED_MODULE_4__BaserElement___default.a

window.baser = baser


/***/ }
/******/ ]);