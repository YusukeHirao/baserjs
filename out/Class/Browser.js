"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventDispatcher = require('./EventDispatcher');
var Locational = require('./Locational');
/**
 * ブラウザの情報を管理するクラス
 *
 * TODO: テストを書く（テストフレームワークの選定から）
 *
 * @version 0.9.0
 * @since 0.0.2
 *
 */
var Browser = (function (_super) {
    __extends(Browser, _super);
    /**
     * コンストラクタ
     *
     * use jQuery
     *
     * @version 0.9.0
     * @since 0.0.2
     *
     */
    function Browser() {
        var _this = this;
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
        var $window = $(window);
        // リサイズイベント
        var resizeEndTimer;
        $window.on('resize', function (e) {
            if (!_this.isResize) {
                _this.trigger('resizestart');
            }
            _this.isResize = true;
            _this.trigger('resize');
            window.clearTimeout(resizeEndTimer);
            resizeEndTimer = window.setTimeout(function () {
                _this.isResize = false;
                _this.trigger('resize');
                _this.trigger('resizeend');
            }, _this.resizeEndInterval);
        });
        // スクロールイベント
        var scrollEndTimer;
        $window.on('scroll', function (e) {
            if (!_this.isScroll) {
                _this.trigger('scrollstart');
            }
            _this.isScroll = true;
            _this.trigger('scroll');
            window.clearTimeout(scrollEndTimer);
            scrollEndTimer = window.setTimeout(function () {
                _this.isScroll = false;
                _this.trigger('scroll');
                _this.trigger('scrollend');
            }, _this.resizeEndInterval);
        });
    }
    /**
     * ページ遷移する
     *
     * @version 0.9.0
     * @since 0.1.0
     *
     */
    Browser.jumpTo = function (path, isBlank) {
        if (isBlank === void 0) { isBlank = false; }
        var href;
        if (typeof path === 'string') {
            href = path;
        }
        else {
            href = path.href;
        }
        if (!isBlank) {
            window.location.href = href;
        }
        else {
            window.open(href, null);
        }
    };
    /**
     * ユーザーエージェント情報を取得する
     *
     * @version 0.9.0
     * @since 0.0.1
     *
     */
    Browser.getUA = function () {
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
            ie: /msie/.test(ua),
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
    /**
     * 現在のURLのパラメータをリンク先へ引き継がせる
     *
     * use: jQuery
     *
     * @version 0.9.0
     * @since 0.7.0
     *
     */
    Browser.inheritParams = function (targetParam) {
        var $target = $('a, area').filter('[href]');
        var thisLocation = new Locational(location);
        if (!(targetParam in thisLocation.params)) {
            return;
        }
        var query = targetParam;
        var value = thisLocation.params[targetParam];
        $target.each(function (i, elem) {
            var targetElem = elem;
            var loc = new Locational(targetElem);
            if (thisLocation.host === loc.host) {
                loc.addParam(query, value);
                targetElem.href = loc.href;
            }
        });
    };
    /**
     * ブラウザ
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    Browser.browser = new Browser();
    /**
     * デバイス・OS・ブラウザの情報
     *
     * @version 0.4.0
     * @since 0.0.1
     *
     */
    Browser.spec = {
        isTouchable: 'ontouchstart' in window,
        ua: Browser.getUA(),
    };
    /**
     * 参照するAPIのスキーム
     *
     * @version 0.9.1
     * @since 0.9.1
     *
     */
    Browser.apiScheme = /https?:/i.test(location.protocol) ? '' : 'http:';
    return Browser;
}(EventDispatcher));
module.exports = Browser;
