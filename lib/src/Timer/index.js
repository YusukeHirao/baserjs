"use strict";

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DispatchEvent_1 = require('../DispatchEvent');
var EventDispatcher_1 = require('../EventDispatcher');
/**
 * 時間管理クラス
 *
 * @version 1.0.0 // TODO: requestAnimationFrameベースにする
 * @since 0.0.1
 *
 */
var Timer = function (_super) {
    __extends(Timer, _super);
    /**
     * コンストラクタ
     *
     * @version 0.9.0
     * @since 0.0.1
     *
     */
    function Timer() {
        _super.call(this);
        /**
         * インターバル
         *
         * `13`は[jQuery](http://jquery.com/)を参考
         *
         * @version 0.0.8
         * @since 0.0.8
         *
         */
        this.interval = 13;
        this.now();
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
    Timer.wait = function (time, callback, context) {
        return new Timer().wait(time, callback, context);
    };
    /**
     * 暗黙の型変換時の振る舞い
     *
     * @version 0.0.1
     * @since 0.0.1
     * @return 保持しているタイムスタンプ
     *
     */
    Timer.prototype.valueOf = function () {
        return this._currentTime.valueOf();
    };
    /**
     * 時間を現在に更新する
     *
     * @version 0.0.1
     * @since 0.0.1
     * @return 更新した時間のタイムスタンプ
     *
     */
    Timer.prototype.now = function () {
        this._currentTime = new Date();
        return this.valueOf();
    };
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
    Timer.prototype.start = function (time) {
        if (time === void 0) {
            time = Infinity;
        }
        // call: 0
        var START_TIMESTAMP = this.now();
        // call: 1
        clearTimeout(this._timerId);
        // call: 2
        this._tick(time, START_TIMESTAMP);
        return this;
    };
    /**
     * タイマーをストップする
     *
     * @version 0.9.0
     * @since 0.0.8
     * @return インスタンス自身
     *
     */
    Timer.prototype.stop = function () {
        var now = this.now();
        var e = new DispatchEvent_1["default"]('stop');
        this.trigger(e, [now, this._timerId, this], this);
        if (!e.isDefaultPrevented()) {
            clearTimeout(this._timerId);
        }
        return this;
    };
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
    Timer.prototype.wait = function (delay, callback, context) {
        var _this = this;
        context = context || this;
        var START_TIMESTAMP = this.now();
        clearTimeout(this._timerId);
        this._timerId = setTimeout(function () {
            _this.stop();
            var now = _this.now();
            callback.call(context, now, START_TIMESTAMP, context);
        }, delay);
        return this;
    };
    Timer.prototype._tick = function (time, startTimestamp) {
        // call: 3, 7, 12... onTick
        this._timerId = setTimeout(this._tickEnd.bind(this, time, startTimestamp), this.interval);
        // call: 4, 8, 13... onStacked
    };
    ;
    Timer.prototype._tickEnd = function (time, startTimestamp) {
        // call: 5, 10... onProgress
        var now = this.now();
        var period = now - startTimestamp;
        if (period < time) {
            // call: 6, 11... onKickTick
            this._tick(time, startTimestamp);
            // call: 9, 14... onFireProgressHandler
            var e = new DispatchEvent_1["default"]('progress');
            this.trigger(e, [now, startTimestamp, this], this);
            if (e.isDefaultPrevented()) {
                this.stop();
            }
        } else {
            this.stop();
        }
    };
    return Timer;
}(EventDispatcher_1["default"]);
exports.__esModule = true;
exports["default"] = Timer;