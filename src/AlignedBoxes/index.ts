import UtilString from '../Util/String';
import EventDispatcher from '../EventDispatcher';
import Browser from '../Browser';
import BreakPoints from '../BreakPoints';
import BreakPointsOption from '../BreakPoints/IBreakPointsOption';
import BaserElement from '../BaserElement';
import AlignedBoxCallback from './IAlignedBoxCallback';

/**
 * このモジュール（スコープ）ではjQueryを使用しない
 */
declare var $: {};

/**
 * 高さ揃えをするボックスを管理するクラス
 *
 * @version 0.9.0
 * @since 0.7.0
 *
 */
export default class AlignedBoxes extends EventDispatcher {

	/**
	 * 監視タイマーID
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static watchTimer: number;

	/**
	 * 監視の間隔
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static watchInterval: number = 1000;

	/**
	 * 監視タイマーが起動しているかどうか
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static isBooted: boolean = false;

	/**
	 * 現在の基準のフォントサイズ
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static currentFontSize: number;

	/**
	 * 監視対象のボックスグループ
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static groups: { [id: string]: AlignedBoxes } = {};

	/**
	 * 基準の文字要素
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static dummyCharElement: HTMLElement;

	public static instances: WeakSet<AlignedBoxes>;

	public id: string;

	/**
	 * 対象のDOM要素
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 *
	 */
	public elList: HTMLElement[];

	/**
	 * ブレークポイントに寄るカラム数
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	private _columns: BreakPoints<number>;

	/**
	 * ボックスの高さ揃えるときのコールバック
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	private _callback: AlignedBoxCallback;

	/**
	 * 現在のカラム
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	private _currentColumn: number;


	/**
	 * 基準の文字要素を生成する
	 *
	 * @version 1.0.0
	 * @since 0.7.0
	 *
	 */
	public static createChar (): void {
		AlignedBoxes.dummyCharElement = BaserElement.createElement(
			{
				tagName: 'div',
				text: 'M',
			},
			undefined,
			{
				display: 'block',
				visibility: 'hidden',
				position: 'absolute',
				padding: 0,
				top: 0,
				zIndex: -1,
			}
		);
		document.body.appendChild(AlignedBoxes.dummyCharElement);
		AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
	}

	/**
	 * 文字の大きさが変わったかどうか
	 *
	 * TODO: 破壊的変更を加えていて単純な評価関数ではない
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 * @return 文字の大きさが変わったかどうか
	 *
	 */
	public static isChanged (): boolean {
		if (AlignedBoxes.currentFontSize === AlignedBoxes.dummyCharElement.offsetHeight) {
			return false;
		}
		AlignedBoxes.currentFontSize = AlignedBoxes.dummyCharElement.offsetHeight;
		return true;
	}

	/**
	 * 文字の大きさが変わったかどうかを監視するルーチン
	 *
	 * 文字の大きさが変わればボックスのサイズを再設定する
	 *
	 * @version 0.7.0
	 * @since 0.7.0
	 *
	 */
	public static observerForFontSize (): void {
		if (AlignedBoxes.isChanged()) {
			AlignedBoxes.reAlign();
		}
		return;
	}

	/**
	 * ボックスのサイズを再設定する
	 *
	 * @version 0.9.0
	 * @since 0.7.0
	 *
	 */
	public static reAlign (): void {
		for (const uid in AlignedBoxes.groups) {
			if (AlignedBoxes.groups.hasOwnProperty(uid)) {
				AlignedBoxes.groups[uid].trigger('realign');
			}
		}
		return;
	}

	/**
	 * 監視タイマーを起動する
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.7.0
	 *
	 */
	public static boot (): void {
		if (!AlignedBoxes.isBooted) {
			window.addEventListener('load', AlignedBoxes.reAlign, false);
			Browser.getBrowser().on('resizeend', AlignedBoxes.reAlign);
			AlignedBoxes.isBooted = true;
			AlignedBoxes.createChar();
			// TODO: タイマーによる監視をオプションでオフにできるようにする
			AlignedBoxes.watchTimer = setInterval(AlignedBoxes.observerForFontSize, AlignedBoxes.watchInterval);
		}
	}

	/**
	 * コンストラクタ
	 *
	 * @version 1.0.0
	 * @since 0.7.0
	 * @param el 対象のボックス要素
	 * @param column カラム数もしくはブレークポイントに寄るカラム数 `0`の場合すべての要素の高さを揃える
	 * @param callback ボックスの高さ揃えるときのコールバック
	 */
	constructor (el: HTMLElement | NodeListOf<HTMLElement>, column: number | BreakPointsOption<number> = 0, callback?: AlignedBoxCallback) {
		super();
		if (el instanceof HTMLElement) {
			this.elList.push(el);
		} else {
			for (const elem of el) {
				this.elList.push(elem);
			}
		}
		AlignedBoxes.boot();
		this.id = UtilString.UID();
		AlignedBoxes.groups[this.id] = this;
		this._init(column, callback);
	}

	/**
	 * 高さ揃えを解除する
	 *
	 * @version 0.9.0
	 * @since 0.7.0
	 *
	 */
	public destroy (): void {
		delete AlignedBoxes.groups[this.id];
	}

	private _init (column: number | BreakPointsOption<number> = 0, callback?: AlignedBoxCallback): void {
		let columnInfo: BreakPointsOption<number>;
		if (typeof column === 'number') {
			columnInfo = {
				Infinity: column,
			};
		} else {
			columnInfo = column;
		}

		this._columns = new BreakPoints<number>(columnInfo, (column: number, breakPoint: number, windowWidth: number): void => {
			this._currentColumn = column;
			this._align();
		});

		this._callback = this._callback || callback;

		this._align();

		this.on('realign', (): void => {
			this._align();
		});
	}

	/**
	 * ボックスの高さ揃える
	 *
	 * @version 1.0.0
	 * @since 0.8.1
	 *
	 */
	private _align (): void {
		let $boxArray: HTMLElement[] = [];
		let maxHeight: number = 0;
		const l: number = this.elList.length;
		const lastIndex: number = l - 1;
		for (let i: number = 0; i < l; i++) {
			const elem: HTMLElement = this.elList[i];

			// 要素の高さを強制に無効にする
			BaserElement.removeCSSProp(elem, 'height');

			// column が 0 だと最初の要素の意味
			const column: number = i % this._currentColumn;
			if (column === 0) {
				// 配列をリセットする
				$boxArray = [];
			}

			// 配列に追加
			$boxArray[column] = elem;

			// 現在の高さと最大の高さを比べて最大の高さを更新
			// column が 0 ならばリセットさせるので最大の高さもリセット
			const currentHeight: number = elem.offsetHeight;
			if (column === 0 || currentHeight > maxHeight) {
				maxHeight = currentHeight;
			}
			if (i === lastIndex || column === this._currentColumn - 1) {
				for (const $box of $boxArray) {
					if ($box) {
						let cancel: boolean = false;
						// コールバックを実行
						if (this._callback) {
							cancel = !this._callback(maxHeight, currentHeight, this);
						}
						// コールバックの戻り値がfalseでなければ高さを変更
						if (!cancel) {
							elem.style.height = `${maxHeight}px`;
						}
					}
				}
			}
		}
	}

}
