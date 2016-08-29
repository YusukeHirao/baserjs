"use strict";

var DispatchEvent_1 = require('../DispatchEvent');
var Browser_1 = require('../Browser');
var Timer_1 = require('../Timer');
/**
 * スクロールを管理するクラス
 *
 * @version 0.9.0
 * @since 0.0.8
 *
 */
var Scroll = function () {
    function Scroll() {
        this.timer = new Timer_1["default"]();
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
    Scroll.prototype.to = function (selector, options) {
        var _this = this;
        this.options = options || {};
        var offset = this.options.offset || 0;
        if (this.options.wheelCancel) {
            document.addEventListener('wheel', function () {
                if (_this.isScroll) {
                    _this._finish();
                    if (_this.options.onScrollCancel) {
                        _this.options.onScrollCancel.call(_this, new DispatchEvent_1["default"]('scrollcancel'));
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
            var target_1 = document.getElementById(location.hash.replace('#', ''));
            if (target_1) {
                Timer_1["default"].wait(Scroll.delayWhenURLHashTarget, function () {
                    window.scrollTo(0, 0);
                    _this.to(target_1, {
                        offset: offset
                    });
                    return;
                });
            }
            return this;
        }
        // スクロール停止中ならスクロール開始
        if (!this.isScroll) {
            this.isScroll = true;
            if (this.options.onScrollStart) {
                this.options.onScrollStart.call(this, new DispatchEvent_1["default"]('scrollstart'));
            }
            this._progress();
        }
        return this;
    };
    /**
     * スクロール
     *
     * @version 1.0.0
     * @since 0.0.8
     *
     */
    Scroll.prototype._progress = function () {
        var browser = Browser_1["default"].getBrowser();
        var currentX = browser.scrollLeft;
        var currentY = browser.scrollTop;
        var vx = (this.targetX - currentX) / Scroll.speed;
        var vy = (this.targetY - currentY) / Scroll.speed;
        if (Math.abs(vx) < 1 && Math.abs(vy) < 1 || this.prevX === currentX && this.prevY === currentY) {
            // 目標座標付近に到達していたら終了
            window.scrollTo(this.targetX, this.targetY);
            this._finish();
            if (this.options.onScrollEnd) {
                this.options.onScrollEnd.call(this, new DispatchEvent_1["default"]('scrollend'));
            }
        } else {
            var nextX = Math.floor(currentX + vx);
            var nextY = Math.floor(currentY + vy);
            // 繰り返し
            window.scrollTo(nextX, nextY);
            this.prevX = currentX;
            this.prevY = currentY;
            if (this.options.onScrollProgress) {
                this.options.onScrollProgress.call(this, new DispatchEvent_1["default"]('scrollprogress'));
            }
            this.timer.wait(Scroll.interval, this._progress, this);
        }
    };
    /**
     * スクロールの終了
     *
     * @version 0.9.0
     * @since 0.0.8
     *
     */
    Scroll.prototype._finish = function () {
        this.isScroll = false;
        this.prevX = null;
        this.prevY = null;
        this.timer.stop();
    };
    Scroll.speed = 4;
    Scroll.interval = 20;
    Scroll.delayWhenURLHashTarget = 30;
    return Scroll;
}();
exports.__esModule = true;
exports["default"] = Scroll;