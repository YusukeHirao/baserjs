"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("intersection-observer");
var EventDispatcher_1 = require("./EventDispatcher");
var createUID_1 = require("../fn/createUID");
var hyphenize_1 = require("../fn/hyphenize");
var isDOMValue_1 = require("../fn/isDOMValue");
var isFalsy_1 = require("../fn/isFalsy");
var parse_1 = require("../fn/parse");
var elements = new WeakMap();
var detachedChildren = new WeakMap();
var inViewportElementMap = new WeakMap();
var inViewportChangeMethodMap = new WeakMap();
var masterIntersection;
/**
 * DOM要素の抽象クラス
 *
 * @class CoreNode
 * @version 1.0.0
 * @since 0.0.1
 * @template E 管理するDOM要素のインターフェイス
 *
 */
var CoreNode = /** @class */ (function (_super) {
    __extends(CoreNode, _super);
    /**
     * コンストラクタ
     *
     * @version 1.0.0
     * @since 0.0.1
     * @param {E} el 管理するDOM要素
     * @template E 管理するDOM要素のインターフェイス
     *
     */
    function CoreNode(el, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        /**
         * data-{*}-state属性のキー
         */
        _this.stateKeyName = 'baser-element';
        /**
         *
         */
        _this._hasBeenInViewportOneTime = false;
        if (!(el instanceof Element)) {
            throw new TypeError("A argument is not Element.");
        }
        // 以下と同等扱いだがthis.elはreadonly
        // this.el = el;
        elements.set(_this, el);
        // id属性の抽出 & 生成
        if (el.id) {
            _this.id = el.id;
        }
        else {
            _this.id = createUID_1.default();
            el.id = _this.id;
        }
        _this._options = options;
        _this._create();
        if (window.document.contains(el)) {
            _this._onMount();
        }
        else if ('MutationObserver' in window) {
            var mo = new MutationObserver(function () { return _this._onMount(); });
            mo.observe(_this.el, { attributes: true });
        }
        return _this;
    }
    Object.defineProperty(CoreNode.prototype, "el", {
        /**
         * 管理するDOM要素
         *
         * @readonly
         */
        get: function () {
            return elements.get(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * クラス名を付加する
     *
     * @version 1.0.0
     * @since 0.1.0
     *
     */
    CoreNode.prototype.addClass = function (className) {
        (_a = this.el.classList).add.apply(_a, className.split(/\s+/g));
        return this;
        var _a;
    };
    /**
     * クラス名を付加する
     *
     * @version 1.0.0
     * @since 0.1.0
     *
     */
    CoreNode.prototype.removeClass = function (className) {
        (_a = this.el.classList).remove.apply(_a, className.split(/\s+/g));
        return this;
        var _a;
    };
    /**
     * 要素の属性の真偽を判定する
     *
     * DOM APIの標準で判定できるものはそれで判断
     * 値なし属性の場合は存在すれば真
     * 値あり属性の場合は偽相等の文字列でなければ全て真とする
     * ただし値なし属性の場合は値が空文字列のため、偽相等の文字列の例外とする
     *
     * @version 1.0.0
     * @since 0.2.0
     * @param elem 対象のDOM要素
     * @param attrName 確認したい属性名
     * @return 結果
     *
     */
    CoreNode.prototype.getBoolAttr = function (attrName) {
        var value = this.pullProp(attrName);
        return value === '' || !isFalsy_1.default(value);
    };
    /**
     * プロパティの値を取得する
     *
     * 1. DOMインターフェイスの属性値
     * 2. HTMLのタグに記述された属性値
     * 3. data-*属性値
     * 4. オプションに渡されたオブジェクト内の値
     *
     * 上記の優先順位で有効な値が返る
     *
     * ⚠️ DOMインターフェイスの属性値は大文字小文字を区別するため注意が必要
     *
     * data-*属性の場合次の2通りの取得方法があります。
     *
     * 1. `CoreNode.pullProp("data-foo-bar");`
     * 2. `CoreNode.pullProp("fooBar");`
     *
     * オプションに渡されたオブジェクト内の値が、
     * ハッシュマップだった場合は`Object.assign`を利用して
     * 2階層目までマージされます。
     *
     * @version 1.0.0
     * @since 1.0.0
     *
     */
    // tslint:disable-next-line:no-any
    CoreNode.prototype.pullProp = function (propName) {
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        var el = this.el;
        // 1. DOMインターフェイスの属性値
        if (propName in el) {
            // tslint:disable-next-line:no-any
            return el[propName];
        }
        // 2. HTMLのタグに記述された属性値
        var htmlAttrVal = el.getAttribute(propName);
        // 2-B. HTMLのタグに記述された属性値（小文字）
        var htmlAttrValLower = el.getAttribute(propName.toLowerCase());
        // 2-C. HTMLのタグに記述された属性値（ハイフンケース）
        var htmlAttrValHyphenized = el.getAttribute(hyphenize_1.default(propName));
        var value;
        // 判定
        if (htmlAttrVal !== null) {
            value = parse_1.default(htmlAttrVal);
        }
        else if (htmlAttrValLower !== null) {
            value = parse_1.default(htmlAttrValLower);
        }
        else if (htmlAttrValHyphenized !== null) {
            value = parse_1.default(htmlAttrValHyphenized);
        }
        else if (el instanceof HTMLElement && el.dataset) {
            var dataVal = el.dataset[propName];
            if (dataVal !== undefined) {
                value = parse_1.default(dataVal);
            }
        }
        else {
            // jsdomはElement::datasetをサポートしない
            var dataVal = el.getAttribute("data-" + hyphenize_1.default(propName));
            if (dataVal !== null) {
                value = parse_1.default(dataVal);
            }
        }
        if (isDOMValue_1.default(value)) {
            return value;
        }
        if (Array.isArray(options)) {
            for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
                var option = options_1[_a];
                if (option && option.hasOwnProperty(propName)) {
                    var optVal = option[propName];
                    if (optVal !== undefined) {
                        if (isDOMValue_1.default(optVal)) {
                            return optVal;
                        }
                        else {
                            value = Object.assign(optVal, value);
                        }
                    }
                }
            }
        }
        return value;
    };
    /**
     * プロパティをマージしたデータを返す
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    CoreNode.prototype.merge = function (defaultData, optionalData) {
        var map = Object.assign({}, optionalData, defaultData);
        for (var key in map) {
            if (map.hasOwnProperty(key)) {
                map[key] = this.pullProp(key, optionalData, defaultData);
            }
        }
        return map;
    };
    /**
     * 子要素をDOMツリーから切り離す
     *
     * 切り離された子要素（厳密には`Node`すべて）は、`DocumentFragment`に移され
     * `WeakMap` に保管される。
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    CoreNode.prototype.detachChildren = function () {
        var children = this.el.childNodes;
        var container = document.createDocumentFragment();
        detachedChildren.set(this, container);
        for (var _i = 0, _a = Array.from(children); _i < _a.length; _i++) {
            var child = _a[_i];
            container.appendChild(child);
        }
        return this;
    };
    CoreNode.prototype.detachedChildrenMap = function (each) {
        var map = [];
        for (var _i = 0, _a = Array.from(detachedChildren.get(this).children); _i < _a.length; _i++) {
            var el = _a[_i];
            map.push(each.apply(this, [el]));
        }
        return map;
    };
    CoreNode.prototype.detachedChildrenEach = function (each) {
        this.detachedChildrenMap(each);
        return this;
    };
    CoreNode.prototype.changeState = function (state) {
        this.el.setAttribute("data-" + this.stateKeyName + "-state", state);
        return this;
    };
    CoreNode.prototype._create = function (defaults) {
        // tslint:disable-next-line:no-object-literal-type-assertion
        this._config = defaults ? this.merge(defaults, this._options) : {};
    };
    /**
     * スクロール位置を監視する
     *
     * 引数に`false`を渡すことで監視を回避できる。
     * Promiseのthenメソッドに渡す前提のAPI。
     */
    CoreNode.prototype.inViewportFirstTime = function (watch) {
        var _this = this;
        if (watch === void 0) { watch = true; }
        return function (result) {
            if (!watch || _this._hasBeenInViewportOneTime) {
                return Promise.resolve(result);
            }
            return new Promise(function (resolve) {
                _this._inViewportResolver = function () {
                    resolve(result);
                };
            });
        };
    };
    CoreNode.prototype.inViewport = function (isInViewport) {
        if (this._isInViewport !== isInViewport) {
            this._isInViewport = isInViewport;
            this.el.setAttribute("data-" + this.stateKeyName + "-inview", "" + isInViewport);
            if (!this._hasBeenInViewportOneTime) {
                this._hasBeenInViewportOneTime = true;
            }
            if (this._inViewportResolver) {
                this._inViewportResolver();
            }
        }
    };
    CoreNode.prototype._onMount = function () {
        inViewportElementMap.set(this.el, this);
        inViewportChangeMethodMap.set(this, this.inViewport.bind(this));
        if ('IntersectionObserver' in window) {
            masterIntersection = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    var bel = inViewportElementMap.get(entry.target);
                    if (!bel) {
                        return;
                    }
                    var changeMethod = inViewportChangeMethodMap.get(bel);
                    if (!changeMethod) {
                        return;
                    }
                    changeMethod(!!entry.intersectionRatio);
                });
            }, {
                threshold: [0, 1],
            });
            masterIntersection.observe(this.el);
        }
    };
    return CoreNode;
}(EventDispatcher_1.default));
exports.default = CoreNode;
