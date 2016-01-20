import BaserElement = require('./BaserElement');
import FormElement = require('./FormElement');
import ICheckableElement = require('../Interface/ICheckableElement');
import CheckableElementOption = require('../Interface/CheckableElementOption');

/**
 * このモジュール（スコープ）ではjQueryを使用しない
 */
declare var $: {};

/**
 * ラジオボタンとチェックボックスの抽象クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
class CheckableElement extends FormElement implements ICheckableElement {

	/**
	 * オプションのデフォルト値
	 *
	 * @since 0.0.1
	 *
	 */
	public static defaultOption: CheckableElementOption = {
		checkedClass: ''
	};

	/**
	 * CheckableElement関連の要素のチェック時に付加されるクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameStateChecked: string = 'checked';

	/**
	 * CheckableElement関連の要素のチェックがはずれた時に付加されるクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameStateUnchecked: string = 'unchecked';

	/**
	 * クラス名
	 */
	protected static _name: Symbol = Symbol('CheckableElement');

	/**
	 * 管理するDOM要素
	 *
	 * @override
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	public el: HTMLInputElement;

	/**
	 * チェック状態
	 *
	 * @since 0.0.1
	 *
	 */
	public checked: boolean;

	/**
	 * 初期のチェック状態
	 *
	 * @since 0.0.1
	 *
	 */
	public defaultChecked: boolean;

	/**
	 * オプション情報
	 *
	 * @since 0.4.1
	 *
	 */
	protected _config: CheckableElementOption;

	/**
	 * チェック状態の時に付加されるclass属性値
	 *
	 * @since 0.0.1
	 *
	 */
	private _checkedClass: string;

	/**
	 * コンストラクタ
	 *
	 * use: jQuery
	 *
	 * @version 0.11.0
	 * @since 0.0.1
	 * @param el 管理するDOM要素
	 * @param options オプション
	 *
	 */
	constructor (el: HTMLInputElement, options: CheckableElementOption) {

		super(el, $.extend({}, CheckableElement.defaultOption, options));

		this._checkedClass = this._config.checkedClass;

		this.checked = this.el.checked;
		this.defaultChecked = this.el.defaultChecked;

		this._update();

		// TODO: jQueryオブジェクトに紐付ける必要の確認
		$(this.el).on('change.bcCheckableElement', (): void => {
			this._onchenge();
		});

	}

	/**
	 * 要素の状態を更新する
	 *
	 * use: jQuery
	 *
	 * @version 0.0.1
	 * @since 0.0.1
	 *
	 */
	public update () {
		if (this.el.checked !== this.checked) {
			this._update();
		}
	}

	/**
	 * 既にbaserJSのエレメント化しているかどうか確認する
	 *
	 * @version 0.11.0
	 * @since 0.11.0
	 */
	protected _isElementized (): boolean {
		return this.__isElementized(CheckableElement);
	}

	/**
	 * baserJSのエレメント化したフラグを登録する
	 *
	 * @version 0.11.0
	 * @since 0.11.0
	 */
	protected _elementize (): void {
		this.__elementize(CheckableElement);
	}

	/**
	 * 要素の状態を更新する
	 *
	 * @version 0.0.1
	 * @since 0.0.1
	 *
	 */
	protected _onchenge () {
		this.checked = !this.checked;
		this._update();
	}

	/**
	 * 要素の状態を更新する
	 *
	 * use: jQuery
	 *
	 * @version 0.10.0
	 * @since 0.0.1
	 *
	 */
	private _update () {

		const checked: boolean = <boolean> this.el.checked;

		// WAI-ARIA属性
		this.attr('aria-checked', `${checked}`);

		if (checked) {

			// TODO: Not use jQuery method
			$(this.el).addClass(this._checkedClass);
			// TODO: Not use jQuery method
			this.$label.addClass(this._checkedClass);
			// TODO: Not use jQuery method
			this.$wrapper.addClass(this._checkedClass);

			BaserElement.addClass(
				this.el,
				FormElement.classNameFormElementCommon,
				'',
				CheckableElement.classNameStateChecked);
			BaserElement.addClassTo(
				this.$label,
				FormElement.classNameFormElementCommon,
				FormElement.classNameLabel,
				CheckableElement.classNameStateChecked);
			BaserElement.addClassTo(
				this.$wrapper,
				FormElement.classNameWrapper,
				'',
				CheckableElement.classNameStateChecked);
			BaserElement.removeClass(
				this.el,
				FormElement.classNameFormElementCommon,
				'',
				CheckableElement.classNameStateUnchecked);
			BaserElement.removeClassFrom(
				this.$label,
				FormElement.classNameFormElementCommon,
				FormElement.classNameLabel,
				CheckableElement.classNameStateUnchecked);
			BaserElement.removeClassFrom(
				this.$wrapper,
				FormElement.classNameWrapper,
				'',
				CheckableElement.classNameStateUnchecked);

		} else {

			// TODO: Not use jQuery method
			$(this.el).removeClass(this._checkedClass);

			// TODO: Not use jQuery method
			this.$label.removeClass(this._checkedClass);
			// TODO: Not use jQuery method
			this.$wrapper.removeClass(this._checkedClass);

			BaserElement.addClass(
				this.el,
				FormElement.classNameFormElementCommon,
				'',
				CheckableElement.classNameStateUnchecked);
			BaserElement.addClassTo(
				this.$label,
				FormElement.classNameFormElementCommon,
				FormElement.classNameLabel,
				CheckableElement.classNameStateUnchecked);
			BaserElement.addClassTo(
				this.$wrapper,
				FormElement.classNameWrapper,
				'',
				CheckableElement.classNameStateUnchecked);
			BaserElement.removeClass(
				this.el,
				FormElement.classNameFormElementCommon,
				'',
				CheckableElement.classNameStateChecked);
			BaserElement.removeClassFrom(
				this.$label,
				FormElement.classNameFormElementCommon,
				FormElement.classNameLabel,
				CheckableElement.classNameStateChecked);
			BaserElement.removeClassFrom(
				this.$wrapper,
				FormElement.classNameWrapper,
				'',
				CheckableElement.classNameStateChecked);

		}

		this.checked = checked;

	}

}

export = CheckableElement;
