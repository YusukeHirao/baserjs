"use strict";

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Math_1 = require('../Util/Math');
var Browser_1 = require('../Browser');
var BaserElement_1 = require('../BaserElement');
/**
 * ラジオボタンとチェックボックスの抽象クラス
 *
 * @version 0.11.0
 * @since 0.11.0
 *
 */
var BackgroundContainer = function (_super) {
    __extends(BackgroundContainer, _super);
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
        _super.call(this, el);
        // 既にエレメント化されていた場合は何もしない
        if (this._elementized) {
            return;
        }
        this.addClass(BackgroundContainer.className);
        this._config = this.mergeOptions(BackgroundContainer.defaultOption, options);
        if (this._config.child) {
            for (var _i = 0, _a = this.el.querySelectorAll(this._config.child); _i < _a.length; _i++) {
                var elem = _a[_i];
                this._bgElements.push(elem);
            }
        }
        var currentCSSPosition = getComputedStyle(this.el).position;
        if (currentCSSPosition === 'static' || currentCSSPosition === '' || currentCSSPosition == null) {
            this.el.style.position = 'relative';
        }
        // 初期計算
        this.calc();
        Browser_1["default"].getBrowser().on('resizeend', this.calc.bind(this));
    }
    /**
     * 計算
     *
     * @version 1.0.0
     * @since 0.11.0
     *
     */
    BackgroundContainer.prototype.calc = function () {
        var containerWidth = this._config.outer ? this.el.offsetWidth : this.el.clientWidth;
        var containerHeight = this._config.outer ? this.el.offsetHeight : this.el.clientHeight;
        for (var _i = 0, _a = this._bgElements; _i < _a.length; _i++) {
            var el = _a[_i];
            var _b = Math_1["default"].stretchDimension(containerWidth, containerHeight, el.offsetWidth, el.offsetHeight, this._config.size, this._config.align, this._config.valign),
                width = _b.width,
                height = _b.height,
                top_1 = _b.top,
                left = _b.left;
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
            bgStyle.top = top_1;
            bgStyle.left = left;
            BaserElement_1["default"].css(el, bgStyle);
        }
    };
    /**
     * 既にbaserJSのエレメント化しているかどうか確認する
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    BackgroundContainer.prototype._isElementized = function () {
        return this.__isElementized(BackgroundContainer);
    };
    /**
     * baserJSのエレメント化したフラグを登録する
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    BackgroundContainer.prototype._elementize = function () {
        this.__elementize(BackgroundContainer);
    };
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
    return BackgroundContainer;
}(BaserElement_1["default"]);
exports.__esModule = true;
exports["default"] = BackgroundContainer;