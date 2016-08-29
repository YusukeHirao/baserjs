"use strict";

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
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    // private _promise: Promise<any> | null = null;
    /**
     * シーケンスのリゾルバ
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    _this._resolver = null;
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
   * TODO: ネイティブのPromiseを使う
   *
   * @version 0.9.0
   * @since 0.4.0
   * @param value タスクに渡すデータ
   * @param isLoop 最後のタスクが終了したあとに最初に戻ってループ処理をするかどうか
   * @return インスタンス自身
   *
   */


  _createClass(Sequence, [{
    key: 'act',
    value: function act(value) {
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
      // this._promise.done( (doneResult: any): void => {
      // 	this._reset();
      // 	this._currentTaskIndex += 1;
      // 	this._iterator += 1;
      // 	if (!this._isStop && (this._currentTaskIndex < this._tasks.length || isLoop)) {
      // 		if (this._currentTaskIndex >= this._tasks.length && isLoop) {
      // 			this._currentTaskIndex = 0;
      // 		}
      // 		this.act(doneResult, isLoop);
      // 	} else {
      // 		// TODO: 引数の設計とテスト書く
      // 		this.trigger('stop');
      // 	}
      // }).fail( (): void => {
      // 	this._reset();
      // 	// TODO: 引数の設計とテスト書く
      // 	this.trigger('exit');
      // 	this.trigger('stop');
      // });
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
      if (this._resolver) {}
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
     * プロミスの設定
     * TODO: ネイティブのPromiseを使う
     * TODO: this._waitTimerのTimerクラスにcancelイベントを実装してリゾルバのリジェクトを実装する
     *
     * @version 0.9.0
     * @since 0.9.0
     *
     */

  }, {
    key: '_setPromiseFrom',
    value: function _setPromiseFrom(value) {
      // if (this._isJQueryPromiseLikeObject(value)) {
      // 	// 値がプロミスであればそのままそれを設定
      // 	this._promise = value.promise();
      // } else {
      // 	// 値がプロミスでない場合は
      // 	// プロミスを生成してリゾルバへ一時的に設定
      // 	this._resolver = $.Deferred<any>();
      // 	this._promise = this._resolver.promise();
      // 	// タイマーを使い遅延実行後リゾルバからプロミスを解決
      // 	this._waitTimer.wait(this._waitingTime, (): void => {
      // 		this._resolver.resolve(value);
      // 	});
      // 	// TODO: Timerクラス側が未実装
      // 	this._waitTimer.on('cencel', () => {
      // 		this._resolver.reject(value);
      // 	});
      // }
    }
  }]);

  return Sequence;
}(EventDispatcher_1.default);
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
   * @version 0.9.0
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

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Sequence;