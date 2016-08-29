"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DispatchEvent_1 = require('../DispatchEvent');
var EventDispatcher_1 = require('../EventDispatcher');
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