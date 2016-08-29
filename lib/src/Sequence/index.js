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
/**
 * 非同期逐次処理クラス
 *
 * @version 0.9.0
 * @since 0.4.0
 *
 */
var Sequence = function (_super) {
  __extends(Sequence, _super);
  /**
   * コンストラクタ
   *
   * @version 0.9.0
   * @since 0.4.0
   * @param tasks タスク
   *
   */
  function Sequence(tasks) {
    _super.call(this);
    /**
     * シーケンスの持つタスク
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    this._tasks = [];
    /**
     * 現在実行中のタスク番号
     *
     * @version 0.9.0
     * @since 0.4.0
     *
     */
    this._currentTaskIndex = 0;
    /**
     * タスクを実行したトータルカウント数
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    this._iterator = 0;
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
    this._resolver = null;
    /**
     * 停止状態
     *
     * @version 0.4.0
     * @since 0.4.0
     *
     */
    this._isStop = true;
    for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
      var task = tasks_1[_i];
      this._tasks.push(new Task(task, this));
    }
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
  Sequence.prototype.act = function (value, isLoop) {
    if (isLoop === void 0) {
      isLoop = false;
    }
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
  };
  /**
   * ループでタスクの実行
   *
   * @version 0.4.0
   * @since 0.4.0
   *
   */
  Sequence.prototype.loop = function (value) {
    return this.act(value, true);
  };
  /**
   * シーケンス処理から抜ける
   *
   * @version 0.9.0
   * @since 0.4.0
   *
   */
  Sequence.prototype.exit = function () {
    this._isStop = true;
    if (this._resolver) {}
    return this;
  };
  /**
   * 遅延時間を設定する
   *
   * @version 0.4.0
   * @since 0.4.0
   *
   */
  Sequence.prototype.wait = function (watingTime) {
    this._waitingTime = watingTime;
  };
  /**
   * タスクを実行したトータルカウント数を取得
   *
   * @version 0.9.0
   * @since 0.9.0
   *
   */
  Sequence.prototype.getCount = function () {
    return this._iterator;
  };
  /**
   * プロミスの設定
   * TODO: ネイティブのPromiseを使う
   * TODO: this._waitTimerのTimerクラスにcancelイベントを実装してリゾルバのリジェクトを実装する
   *
   * @version 0.9.0
   * @since 0.9.0
   *
   */
  Sequence.prototype._setPromiseFrom = function (value) {
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
  };
  return Sequence;
}(EventDispatcher_1["default"]);
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
  Task.prototype.act = function (value) {
    var result = this._func.call(this._sequencer, this._sequencer.getCount(), value);
    return result;
  };
  return Task;
}();
exports.__esModule = true;
exports["default"] = Sequence;