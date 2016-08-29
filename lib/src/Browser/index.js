"use strict";

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher_1 = require('../EventDispatcher');
var Locational_1 = require('../Locational');
/**
 * ブラウザの情報を管理するクラス
 *
 * TODO: テストを書く（テストフレームワークの選定から）
 *
 * @version 0.9.0
 * @since 0.0.2
 *
 */
var Browser = function (_super) {
    __extends(Browser, _super);
    /**
     * コンストラクタ
     *
     * @version 0.12.0
     * @since 0.0.2
     *
     */
    function Browser() {
        _super.call(this);
        /**
         * リサイズイベントからリサイズエンドイベントまでのインターバル
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        this.resizeEndInterval = 100;
        /**
         * スクロールイベントからスクロールエンドイベントまでのインターバル
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        this.scrollEndInterval = 100;
        /**
         * 現在リサイズ中かどうか
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        this.isResize = false;
        /**
         * 現在スクロール中かどうか
         *
         * @version 0.0.2
         * @since 0.0.2
         *
         */
        this.isScroll = false;
        // リサイズイベント
        window.addEventListener('resize', this._onResize.bind(this), false);
        // スクロールイベント
        window.addEventListener('scroll', this._onScroll.bind(this), false);
    }
    Browser.getBrowser = function () {
        if (Browser._browser) {
            Browser._browser = new Browser();
        }
        return Browser._browser;
    };
    Object.defineProperty(Browser.prototype, "width", {
        get: function get() {
            return window.document.documentElement.clientWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "height", {
        get: function get() {
            return window.document.documentElement.clientWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "scrollTop", {
        get: function get() {
            return window.pageYOffset;
        },
        set: function set(y) {
            window.scrollTo(this.scrollLeft, y);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "scrollLeft", {
        get: function get() {
            return window.pageXOffset;
        },
        set: function set(x) {
            window.scrollTo(x, this.scrollTop);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "spec", {
        /**
         * デバイス・OS・ブラウザの情報
         *
         * @version 0.12.0
         * @since 0.12.0
         *
         */
        get: function get() {
            return {
                isTouchable: 'ontouchstart' in window,
                ua: this._getUA()
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Browser.prototype, "availableScheme", {
        /**
         * 参照するAPIのスキーム
         *
         * @version 0.12.0
         * @since 0.12.0
         *
         */
        get: function get() {
            return (/https?:/i.test(location.protocol) ? '//' : 'http://'
            );
        },
        enumerable: true,
        configurable: true
    });
    /**
     * ページ遷移する
     *
     * @version 0.12.0
     * @since 0.12.0
     *
     */
    Browser.prototype.jumpTo = function (path, isBlank) {
        if (isBlank === void 0) {
            isBlank = false;
        }
        var href;
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
    };
    /**
     * 現在のURLのパラメータをリンク先へ引き継がせる
     *
     * @version 0.12.0
     * @since 0.12.0
     *
     */
    Browser.prototype.inheritParams = function (targetParam) {
        var target = document.querySelectorAll('a[href], area[href]');
        var thisLocation = new Locational_1["default"](location);
        if (!(targetParam in thisLocation.params)) {
            return;
        }
        var query = targetParam;
        var value = thisLocation.params[targetParam];
        for (var _i = 0, target_1 = target; _i < target_1.length; _i++) {
            var elem = target_1[_i];
            var targetElem = elem;
            var loc = new Locational_1["default"](targetElem);
            if (thisLocation.host === loc.host) {
                loc.addParam(query, value);
                targetElem.href = loc.href;
            }
        }
    };
    Browser.prototype._onResize = function () {
        var _this = this;
        if (!this.isResize) {
            this.trigger('resizestart');
        }
        this.isResize = true;
        this.trigger('resize');
        window.clearTimeout(this._resizeEndTimer);
        this._resizeEndTimer = window.setTimeout(function () {
            _this.isResize = false;
            _this.trigger('resize');
            _this.trigger('resizeend');
        }, this.resizeEndInterval);
    };
    Browser.prototype._onScroll = function () {
        var _this = this;
        if (!this.isScroll) {
            this.trigger('scrollstart');
        }
        this.isScroll = true;
        this.trigger('scroll');
        window.clearTimeout(this._scrollEndTimer);
        this._scrollEndTimer = window.setTimeout(function () {
            _this.isScroll = false;
            _this.trigger('scroll');
            _this.trigger('scrollend');
        }, this.resizeEndInterval);
    };
    /**
     * ユーザーエージェント情報を取得する
     *
     * @version 0.12.0
     * @since 0.12.0
     *
     */
    Browser.prototype._getUA = function () {
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
    };
    return Browser;
}(EventDispatcher_1["default"]);
exports.__esModule = true;
exports["default"] = Browser;