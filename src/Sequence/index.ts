import EventDispatcher from '../EventDispatcher';

/**
 * 非同期逐次処理クラス
 *
 * @version 0.9.0
 * @since 0.4.0
 *
 */
class Sequence<T> extends EventDispatcher {

	/**
	 * シーケンスの持つタスク
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	private _tasks: Task<T>[] = [];

	/**
	 * 現在実行中のタスク番号
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	private _currentTaskIndex: number = 0;

	/**
	 * タスクを実行したトータルカウント数
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	private _iterator: number = 0;

	/**
	 * シーケンスのプロミスオブジェクト
	 *
	 * @version 1.0.0
	 * @since 0.4.0
	 *
	 */
	private _promise: Promise<T> | null = null;

	/**
	 * 遅延時間
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	private _waitingTime: number;

	/**
	 * 時間ID
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 *
	 */
	private _waitTimerID: number;

	/**
	 * キャンセラー
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 *
	 */
	private _canceler: (reason?: any) => void;

	/**
	 * 停止状態
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	private _isStop: boolean = true;

	/**
	 * コンストラクタ
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 * @param tasks タスク
	 *
	 */
	constructor (tasks: Function[]) {
		super();
		for (const task of tasks) {
			this._tasks.push(new Task(task, this));
		}
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
	public act (value: T, isLoop: boolean = false): Sequence<T> {

		// ストップ状態解除
		this._isStop = false;

		// TODO: 引数の設計とテスト書く
		this.trigger('beforeact');

		// タスク取得
		const task: Task<T> = this._tasks[this._currentTaskIndex];

		// タスク実行
		const result: T = task.act(value);

		// 戻り値によるプロミスの設定
		this._setPromiseFrom(result);

		// プロミスの結果から次のタスクを実行
		if (this._promise) {
			this._promise.then(
				(doneResult: any): void => {
					this._reset();
					this._currentTaskIndex += 1;
					this._iterator += 1;
					if (!this._isStop && (this._currentTaskIndex < this._tasks.length || isLoop)) {
						if (this._currentTaskIndex >= this._tasks.length && isLoop) {
							this._currentTaskIndex = 0;
						}
						this.act(doneResult, isLoop);
					} else {
						// TODO: 引数の設計とテスト書く
						this.trigger('stop');
					}
				},
				(): void => {
					this._reset();
					// TODO: 引数の設計とテスト書く
					this.trigger('exit');
					this.trigger('stop');
				}
			);
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
	public loop (value: any): Sequence<T> {
		return this.act(value, true);
	}

	/**
	 * シーケンス処理から抜ける
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	public exit (): Sequence<T> {
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
	public wait (watingTime: number): void {
		this._waitingTime = watingTime;
	}

	/**
	 * タスクを実行したトータルカウント数を取得
	 *
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	public getCount (): number {
		return this._iterator;
	}

	/**
	 * プロミスの設定
	 * TODO: this._waitTimerのTimerクラスにcancelイベントを実装してリゾルバのリジェクトを実装する
	 *
	 * @version 1.0.0
	 * @since 0.9.0
	 *
	 */
	private _setPromiseFrom (value: T): void {
		if (value instanceof Promise) {
			// 値がプロミスであればそのままそれを設定
			this._promise = value;
		} else {
			// 値がプロミスでない場合は
			// プロミスを生成してリゾルバへ一時的に設定
			this._promise = new Promise<T>(
				(resolver: (value?: T | PromiseLike<T>) => void, canceler: (reason?: any) => void): void => {
					// タイマーを使い遅延実行後リゾルバからプロミスを解決
					this._waitTimerID = setTimeout(resolver, this._waitingTime, value);
					this._canceler = canceler;
				}
			);


		}
	}

	/**
	 * 次のタスクを実行するために一時的なオブジェクトをリセットする
	 *
	 * @version 1.0.0
	 * @since 0.9.0
	 *
	 */
	private _reset (): void {
		clearTimeout(this._waitTimerID);
		this._promise = null;
		this._waitingTime = 0;
		if (this._canceler) {
			this._canceler(`reset`);
		}
	}

}

/**
 * タスクのクラス
 *
 * @private
 * @version 0.9.0
 * @since 0.4.0
 *
 */
class Task<U> {

	/**
	 * 紐づくシーケンサ
	 *
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	private _sequencer: Sequence<U>;

	/**
	 * ___
	 * TODO: ネイティブのPromiseを使う
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	private _func: Function;

	/**
	 * コンストラクタ
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	constructor (func: Function, sequencer: Sequence<U>) {
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
	public act (value: U): U {
		const result: U = this._func.call(this._sequencer, this._sequencer.getCount(), value);
		return result;
	}

}

export default Sequence;
