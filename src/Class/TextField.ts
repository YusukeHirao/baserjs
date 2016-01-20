import BaserElement = require('./BaserElement');
import FormElement = require('./FormElement');
import ITextField = require('../Interface/ITextField');
import TextFieldOption = require('../Interface/TextFieldOption');

/**
 * このモジュール（スコープ）ではjQueryを使用しない
 */
declare var $: {};

/**
 * テキストフィールドの拡張クラス
 *
 * @version 0.11.0
 * @since 0.4.0
 *
 */
class TextField extends FormElement implements ITextField {

	/**
	 * オプションのデフォルト値
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	public static defaultOption: TextFieldOption = {};

	/**
	 * TextField要素のクラス
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	public static classNameTextField: string = 'form-text-field';

	/**
	 * 未入力状態に付加されるクラス
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	public static classNameStateUninput: string = 'uninput';

	/**
	 * クラス名
	 *
	 * @override
	 * @version 0.11.0
	 * @since 0.11.0
	 */
	protected static _name: Symbol = Symbol('TextField');

	/**
	 * 管理するDOM要素
	 *
	 * @override
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	public el: HTMLInputElement | HTMLTextAreaElement;

	/**
	 * 空かどうか
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	public isEmpty: boolean;
	/**
	 * プレースホルダーテキスト
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	public placeholder: string = '';

	/**
	 * プレースホルダーをもっているかどうか
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 *
	 */
	public hasPlaceholder: boolean;

	/**
	 * オプション情報
	 *
	 * @since 0.4.1
	 *
	 */
	protected _config: TextFieldOption;

	/**
	 * コンストラクタ
	 *
	 * use: jQuery
	 *
	 * @version 0.11.0
	 * @since 0.4.0
	 * @param el 管理するDOM要素
	 * @param options オプション
	 *
	 */
	constructor (el: HTMLInputElement | HTMLTextAreaElement, options: TextFieldOption) {

		super(el, $.extend({}, TextField.defaultOption, options));

		// 既にエレメント化されていた場合は何もしない
		if (this._elementized) {
			return;
		}

		this.placeholder = this.attr('placeholder') || '';
		this.hasPlaceholder = !!this.placeholder;

		this._update();
	}

	/**
	 * 既にbaserJSのエレメント化しているかどうか確認する
	 *
	 * @version 0.11.0
	 * @since 0.11.0
	 */
	protected _isElementized (): boolean {
		return this.__isElementized(TextField);
	}

	/**
	 * baserJSのエレメント化したフラグを登録する
	 *
	 * @version 0.11.0
	 * @since 0.11.0
	 */
	protected _elementize (): void {
		this.__elementize(TextField);
	}

	/**
	 * クラス名を設定する
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 * @override
	 *
	 */
	protected _setClassName (): void {
		super._setClassName();
		// セレクトボックス用のクラス名を設定
		this.addClass(TextField.classNameTextField);
	}

	/**
	 * ラップ要素を生成
	 *
	 * use: jQuery
	 *
	 * @version 0.4.0
	 * @since 0.4.0
	 * @override
	 *
	 */
	protected _createWrapper (): void {
		super._createWrapper();
		BaserElement.addClassTo(this.$wrapper, TextField.classNameTextField + '-' + FormElement.classNameWrapper);
	}

	/**
	 * イベントの登録
	 *
	 * use: jQuery
	 *
	 * @version 0.4.1
	 * @since 0.4.0
	 * @override
	 *
	 */
	protected _bindEvents (): void {
		super._bindEvents();

		// keyupイベントが起こった場合に実行するルーチン
		$(document).on('keyup.bcTextField-' + this.id, (e: JQueryKeyEventObject): void => {
			if (this.hasFocus) {
				this._update();
			}
		});

	}

	/**
	 * 要素の状態を更新する
	 *
	 * use: jQuery
	 *
	 * @version 0.11.0
	 * @since 0.4.0
	 *
	 */
	private _update (): void {

		const currentValue: string = this.val() || '';
		const isEmpty: boolean = !currentValue;

		if (isEmpty) {
			this._setStateUninputted();
		} else {
			this._setStateInputted();
		}


	}

	/**
	 * 入力されている状態を設定する
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	private _setStateInputted (): void {
		this.isEmpty = false;
		BaserElement.removeClass(
			this.el,
			FormElement.classNameFormElementCommon,
			'',
			TextField.classNameStateUninput);
		BaserElement.removeClassFrom(
			this.$label,
			FormElement.classNameFormElementCommon,
			FormElement.classNameLabel,
			TextField.classNameStateUninput);
		BaserElement.removeClassFrom(
			this.$wrapper,
			FormElement.classNameWrapper,
			'',
			TextField.classNameStateUninput);
	}

	/**
	 * 入力されていない状態を設定する
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.4.0
	 *
	 */
	private _setStateUninputted (): void {
		this.isEmpty = true;
		BaserElement.addClass(
			this.el,
			FormElement.classNameFormElementCommon,
			'',
			TextField.classNameStateUninput);
		BaserElement.addClassTo(
			this.$label,
			FormElement.classNameFormElementCommon,
			FormElement.classNameLabel,
			TextField.classNameStateUninput);
		BaserElement.addClassTo(
			this.$wrapper,
			FormElement.classNameWrapper,
			'',
			TextField.classNameStateUninput);
	}

}

export = TextField;
