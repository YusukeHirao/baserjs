import BaserElement = require('./BaserElement');
import FormElement = require('./FormElement');
import CheckableElement = require('./CheckableElement');
import RadioGroup = require('./RadioGroup');
import IRadio = require('../Interface/IRadio');
import CheckableElementOption = require('../Interface/CheckableElementOption');

/**
 * ラジオボタンの拡張クラス
 *
 * @version 0.9.0
 * @since 0.0.1
 *
 */
class Radio extends CheckableElement implements IRadio {

	/**
	 * Radio要素のクラス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameRadio: string = 'form-radio';

	/**
	 * コンストラクタ
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.0.1
	 * @param el 管理するDOM要素
	 * @param options オプション
	 *
	 */
	constructor (el: HTMLInputElement, options: CheckableElementOption) {

		super(el, options);

		// 既にエレメント化されていた場合は何もしない
		if (this._elementized) {
			return;
		}

		this.addClass(Radio.classNameRadio);
		BaserElement.addClassTo(this.$label, Radio.classNameRadio, FormElement.classNameLabel);
		BaserElement.addClassTo(this.$wrapper, Radio.classNameRadio + '-' + FormElement.classNameWrapper);

		// ラジオボタングループに登録
		// TODO: APIをRadioGroup.add(name, elem)にする
		if (!RadioGroup.groups[this.name]) {
			RadioGroup.groups[this.name] = new RadioGroup(this.name);
		}
		RadioGroup.groups[this.name].add(this);

	}

	/**
	 * 既にbaserJSのエレメント化しているかどうか確認する
	 *
	 * @version 0.11.0
	 * @since 0.11.0
	 */
	protected _isElementized (): boolean {
		return this.__isElementized(Radio);
	}

	/**
	 * baserJSのエレメント化したフラグを登録する
	 *
	 * @version 0.11.0
	 * @since 0.11.0
	 */
	protected _elementize (): void {
		this.__elementize(Radio);
	}

	/**
	 * チェンジイベントのハンドラ
	 *
	 * use: jQuery
	 *
	 * @version 0.7.0
	 * @since 0.0.1
	 *
	 */
	protected _onchenge () {
		super._onchenge();
		// 同じname属性のラジオボタン要素も同時に変更をする
		// TODO: APIをRadioGroup.update(name, elem)にする
		RadioGroup.groups[this.name].update(this);
	}

}

export = Radio;
