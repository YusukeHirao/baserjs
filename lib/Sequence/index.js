"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventDispatcher_1 = require('../EventDispatcher');
/**
 * 非同期逐次処理クラス
 *
 * @version 0.9.0
 * @since 0.4.0
 *
 */

var Sequence = function (_EventDispatcher_1$de) {
    _inherits(Sequence, _EventDispatcher_1$de);

    /**
     * コンストラクタ
     *
     * @version 0.9.0
     * @since 0.4.0
     * @param tasks タスク
     *
     */
    function Sequence(tasks) {
        _classCallCheck(this, Sequence);

        /**
         * シーケンスの持つタスク
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */
        var _this = _possibleConstructorReturn(this, (Sequence.__proto__ || Object.getPrototypeOf(Sequence)).call(this));

        _this._tasks = [];
        /**
         * 現在実行中のタスク番号
         *
         * @version 0.9.0
         * @since 0.4.0
         *
         */
        _this._currentTaskIndex = 0;
        /**
         * タスクを実行したトータルカウント数
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */
        _this._iterator = 0;
        /**
         * シーケンスのプロミスオブジェクト
         *
         * @version 1.0.0
         * @since 0.4.0
         *
         */
        _this._promise = null;
        /**
         * 遅延時間
         *
         * @version 1.0.0
         * @since 0.4.0
         *
         */
        _this._waitingTime = 0;
        /**
         * 停止状態
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */
        _this._isStop = true;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = tasks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var task = _step.value;

                _this._tasks.push(new Task(task, _this));
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

        return _this;
    }
    /**
     * タスクの実行
     *
     * @version 1.0.0
     * @since 0.4.0
     * @param value タスクに渡すデータ
     * @param isLoop 最後のタスクが終了したあとに最初に戻ってループ処理をするかどうか
     * @return インスタンス自身
     *
     */


    _createClass(Sequence, [{
        key: 'act',
        value: function act(value) {
            var _this2 = this;

            var isLoop = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            // ストップ状態解除
            this._isStop = false;
            // TODO: 引数の設計とテスト書く
            this.trigger('beforeact');
            // タスク取得
            var task = this._tasks[this._currentTaskIndex];
            // タスク実行
            var result = task.act(value);
            // 戻り値によるプロミスの設定
            this._setPromiseFrom(result);
            // プロミスの結果から次のタスクを実行
            if (this._promise) {
                this._promise.then(function (result) {
                    _this2._reset();
                    _this2._currentTaskIndex += 1;
                    _this2._iterator += 1;
                    if (!_this2._isStop && (_this2._currentTaskIndex < _this2._tasks.length || isLoop)) {
                        if (_this2._currentTaskIndex >= _this2._tasks.length && isLoop) {
                            _this2._currentTaskIndex = 0;
                        }
                        _this2.act(result, isLoop);
                    } else {
                        // TODO: 引数の設計とテスト書く
                        _this2.trigger('stop');
                    }
                }, function () {
                    _this2._reset();
                    // TODO: 引数の設計とテスト書く
                    _this2.trigger('exit');
                    _this2.trigger('stop');
                });
            }
            return this;
        }
        /**
         * ループでタスクの実行
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */

    }, {
        key: 'loop',
        value: function loop(value) {
            return this.act(value, true);
        }
        /**
         * シーケンス処理から抜ける
         *
         * @version 0.9.0
         * @since 0.4.0
         *
         */

    }, {
        key: 'exit',
        value: function exit() {
            this._isStop = true;
            return this;
        }
        /**
         * 遅延時間を設定する
         *
         * @version 0.4.0
         * @since 0.4.0
         *
         */

    }, {
        key: 'wait',
        value: function wait(watingTime) {
            this._waitingTime = watingTime;
        }
        /**
         * タスクを実行したトータルカウント数を取得
         *
         * @version 0.9.0
         * @since 0.9.0
         *
         */

    }, {
        key: 'getCount',
        value: function getCount() {
            return this._iterator;
        }
        /**
         * 解決状態に変更
         *
         * @version 1.0.0
         * @since 1.0.0
         *
         */

    }, {
        key: 'resolve',
        value: function resolve(value) {
            if (this._promiseResolver) {
                this._promiseResolver(value);
            }
            return this;
        }
        /**
         * プロミスの設定
         * TODO: this._waitTimerのTimerクラスにcancelイベントを実装してリゾルバのリジェクトを実装する
         *
         * @version 1.0.0
         * @since 0.9.0
         *
         */

    }, {
        key: '_setPromiseFrom',
        value: function _setPromiseFrom(value) {
            var _this3 = this;

            if (value === undefined) {
                // 戻り値なしの場合
                this._promise = new Promise(function (resolver, canceler) {
                    // タイマーを使い遅延実行後リゾルバからプロミスを解決
                    _this3._promiseResolver = resolver;
                    _this3._canceler = canceler;
                });
            } else if (
            // instanceof Promise
            value instanceof Promise ||
            // instanceof PromiseLike
            (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && 'then' in value && 'apply' in value.then) {
                // 値がプロミスであればそのままそれを設定
                this._promise = value;
            } else {
                // 値がプロミスでない場合は
                // プロミスを生成してリゾルバへ一時的に設定
                this._promise = new Promise(function (resolver, canceler) {
                    // タイマーを使い遅延実行後リゾルバからプロミスを解決
                    _this3._waitTimerID = setTimeout(resolver, _this3._waitingTime, value);
                    _this3._canceler = canceler;
                });
            }
        }
        /**
         * 次のタスクを実行するために一時的なオブジェクトをリセットする
         *
         * @version 1.0.0
         * @since 0.9.0
         *
         */

    }, {
        key: '_reset',
        value: function _reset() {
            clearTimeout(this._waitTimerID);
            this._promise = null;
            this._waitingTime = 0;
            this._promiseResolver = null;
            if (this._canceler) {
                this._canceler('reset');
            }
        }
    }]);

    return Sequence;
}(EventDispatcher_1.default);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sequence;
/**
 * タスクのクラス
 *
 * @private
 * @version 0.9.0
 * @since 0.4.0
 *
 */

var Task = function () {
    /**
     * コンストラクタ
     *
     * @version 0.9.0
     * @since 0.4.0
     *
     */
    function Task(func, sequencer) {
        _classCallCheck(this, Task);

        this._func = func;
        this._sequencer = sequencer;
    }
    /**
     * タスクの実行
     *
     * @version 1.0.0
     * @since 0.4.0
     * @param value タスクに渡すデータ
     * @return 実行したタスクの戻り値
     *
     */


    _createClass(Task, [{
        key: 'act',
        value: function act(value) {
            var result = this._func.call(this._sequencer, this._sequencer.getCount(), value);
            return result;
        }
    }]);

    return Task;
}();