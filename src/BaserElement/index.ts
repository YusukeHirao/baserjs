import UtilString from '../Util/String';
import EventDispatcher from '../EventDispatcher';
import ElementClassNameCase from './EnumElementClassNameCase';
import ClassNameSeparatorForBEM from './EnumClassNameSeparatorForBEM';
import IElement from './IElement';

const HYPHEN: string = '-';
const DOUBLE_HYPHEN: string = '--';
const UNDERSCORE: string = '_';
const DOUBLE_UNDERSCORE: string = '__';

const elementizedMap: WeakMap<HTMLElement, Set<Symbol>> = new WeakMap();

type Primitive = string | number | boolean;

export interface IBaserElementCreateElementOption {
	tagName: string;
	text?: string;
}

export interface IBaserElementCreateElementAttributes {
	[ attrName: string ]: string | number | boolean;
}

export interface IBaserElementCreateElementStyle {
	[ styleProperty: string ]: string | number;
}

/**
 * DOM要素の抽象クラス
 *
 * DOM要素操作に関するjQueryのメソッドは極力ここに集約したい
 * 脱jQueryの際にこのクラスを改修するだけで済むようにする
 *
 * @version 1.0.0
 * @since 0.0.1
 *
 */
class BaserElement extends EventDispatcher implements IElement {

	/**
	 * クラス名のデフォルトのプレフィックス
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameDefaultPrefix: string = '-bc';

	/**
	 * インスタンスに付加するデフォルトのクラス名
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameElementCommon: string = 'element';

	/**
	 * クラス名のデフォルトの単語繋ぎの形式
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameDefaultCase: ElementClassNameCase = ElementClassNameCase.HYPHEN_DELIMITED;

	/**
	 * BEMのエレメントのクラス名の繋ぎ文字
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameDefaultSeparatorForElement: ClassNameSeparatorForBEM = ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE;

	/**
	 * BEMのモディファイアのクラス名の繋ぎ文字
	 *
	 * @version 0.1.0
	 * @since 0.1.0
	 *
	 */
	public static classNameDefaultSeparatorForModifier: ClassNameSeparatorForBEM = ClassNameSeparatorForBEM.DOUBLE_HYPHEN;

	/**
	 * クラス名
	 */
	protected static _name: Symbol = Symbol('BaserElement');

	/**
	 * 管理するDOM要素
	 *
	 * @version 0.9.0
	 * @since 0.9.0
	 *
	 */
	public el: HTMLElement;

	/**
	 * 管理するDOM要素のid属性値
	 *
	 * @version 0.0.1
	 * @since 0.0.1
	 *
	 */
	public id: string;

	/**
	 * 管理するDOM要素のname属性値
	 *
	 * @version 0.0.1
	 * @since 0.0.1
	 *
	 */
	public name: string = '';

	/**
	 *
	 */
	protected _elementized: boolean = false;

	/**
	 *
	 */
	public static createElement (options: IBaserElementCreateElementOption, attr?: IBaserElementCreateElementAttributes, style?: IBaserElementCreateElementStyle): HTMLElement {
		const el: HTMLElement = document.createElement(options.tagName);
		if (options.text) {
			const text: Text = document.createTextNode(options.text);
			el.appendChild(text);
		}
		return el;
	}

	/**
	 * BEMベースでクラス名文字列を生成する
	 *
	 * @version 0.9.0
	 * @since 0.1.0
	 * @param blockName ブロック名
	 * @param elementName 要素名
	 * @param modifierName 状態名
	 * @return 生成されたクラス名
	 *
	 */
	public static createClassName (blockNames: string, elementNames: string = '', modifierName: string = ''): string {
		let className: string = '';
		let prefix: string;
		let separator: string = '';
		let elementSeparator: string = '';
		let modifierSeparator: string = '';
		switch (BaserElement.classNameDefaultCase) {
			case ElementClassNameCase.HYPHEN_DELIMITED: {
				separator = HYPHEN;
				blockNames = UtilString.hyphenDelimited(blockNames);
				elementNames = UtilString.hyphenDelimited(elementNames);
				modifierName = UtilString.hyphenDelimited(modifierName);
			}
			break;
			case ElementClassNameCase.SNAKE_CASE: {
				separator = UNDERSCORE;
				blockNames = UtilString.snakeCase(blockNames);
				elementNames = UtilString.snakeCase(elementNames);
				modifierName = UtilString.snakeCase(modifierName);
			}
			break;
			case ElementClassNameCase.CAMEL_CASE: {
				separator = '';
				blockNames = UtilString.camelCase(blockNames, true);
				elementNames = UtilString.camelCase(elementNames);
				modifierName = UtilString.camelCase(modifierName);
			}
			break;
			default: {
				// void
			}
		}
		switch (BaserElement.classNameDefaultSeparatorForElement) {
			case ClassNameSeparatorForBEM.HYPHEN: {
				elementSeparator = HYPHEN;
			}
			break;
			case ClassNameSeparatorForBEM.DOUBLE_HYPHEN: {
				elementSeparator = DOUBLE_HYPHEN;
			}
			break;
			case ClassNameSeparatorForBEM.UNDERSCORE: {
				elementSeparator = UNDERSCORE;
			}
			break;
			case ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE: {
				elementSeparator = DOUBLE_UNDERSCORE;
			}
			break;
			case ClassNameSeparatorForBEM.CAMEL_CASE: {
				elementSeparator = '';
			}
			break;
			default: {
				// void
			}
		}
		switch (BaserElement.classNameDefaultSeparatorForModifier) {
			case ClassNameSeparatorForBEM.HYPHEN: {
				modifierSeparator = HYPHEN;
			}
			break;
			case ClassNameSeparatorForBEM.DOUBLE_HYPHEN: {
				modifierSeparator = DOUBLE_HYPHEN;
			}
			break;
			case ClassNameSeparatorForBEM.UNDERSCORE: {
				modifierSeparator = UNDERSCORE;
			}
			break;
			case ClassNameSeparatorForBEM.DOUBLE_UNDERSCORE: {
				modifierSeparator = DOUBLE_UNDERSCORE;
			}
			break;
			case ClassNameSeparatorForBEM.CAMEL_CASE: {
				modifierSeparator = '';
			}
			break;
			default: {
				// void
			}
		}
		if (BaserElement.classNameDefaultPrefix) {
			prefix = BaserElement.classNameDefaultPrefix;
			prefix = prefix
				// 先頭のアルファベット・アンダースコア・ハイフン以外を削除
				.replace(/^[^a-z_-]/i, '')
				// アルファベット・数字・アンダースコア・ハイフン以外を削除
				.replace(/[^a-z0-9_-]+/ig, '')
				// 先頭の2個以上連続するハイフンを削除
				.replace(/^--+/, '-');
			className += prefix;
		}
		className += separator + blockNames;
		if (elementNames) {
			className += elementSeparator + elementNames;
		}
		if (modifierName) {
			className += modifierSeparator + modifierName;
		}
		return className;
	}

	/**
	 * 要素の属性の真偽を判定する
	 *
	 * DOM APIの標準で判定できるものはそれで判断
	 * 値なし属性の場合は存在すれば真
	 * 値あり属性の場合は偽相等の文字列でなければ全て真とする
	 * ただし値なし属性の場合は値が空文字列のため、偽相等の文字列の例外とする
	 *
	 * @version 0.10.0
	 * @since 0.2.0
	 * @param elem 対象のDOM要素
	 * @param attrName 確認したい属性名
	 * @return 結果
	 *
	 */
	public static getBoolAttr (elem: HTMLElement, attrName: string): boolean {
		// DOM APIの標準で判定できるものはそれで判断
		if (elem[attrName] === true) {
			return true;
		}
		const attr: Attr = elem.attributes.getNamedItem(attrName);
		if (attr) {
			const value: string = attr.value;
			if (value === '') {
				// 値なし属性の場合は存在すれば真
				return true;
			} else {
				return !UtilString.isFalsy(value);
			}
		} else {
			// 属性がない場合は偽
			return false;
		}
	}

	/**
	 * クラス名を付加する
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.1.0
	 * @param elem 対象のDOM要素
	 * @param blockName ブロック名
	 * @param elementName 要素名
	 * @param modifierName 状態名
	 *
	 */
	public static addClass (elem: HTMLElement, blockNames: string, elementNames: string = '', modifierName: string = ''): void {
		const $elem: JQuery = $(elem);
		const className: string = BaserElement.createClassName(blockNames, elementNames, modifierName);
		$elem.addClass(className);
	}

	/**
	 * クラス名を取り除く
	 *
	 * use: jQuery
	 *
	 * @version 0.9.0
	 * @since 0.1.0
	 * @param elem 対象のDOM要素
	 * @param blockName ブロック名
	 * @param elementName 要素名
	 * @param modifierName 状態名
	 *
	 */
	public static removeClass (elem: HTMLElement, blockNames: string, elementNames: string = '', modifierName: string = ''): void {
		const $elem: JQuery = $(elem);
		const className: string = BaserElement.createClassName(blockNames, elementNames, modifierName);
		$elem.removeClass(className);
	}

	/**
	 * CSSプロパティをDOM要素から取り除く
	 *
	 * @version 1.0.0
	 * @since 0.2.2
	 * @param elem 対象のDOM要素
	 * @param propName 取り除くCSSプロパティ
	 *
	 */
	public static removeCSSProp (elem: HTMLElement, propName: string): void {
		const style: CSSStyleDeclaration = elem.style;
		if (style) {
			style.removeProperty(propName);
		}
	}

	public static css (elem: HTMLElement, styles: any): void {
		$(elem).css(styles);
	}

	/**
	 * コンストラクタ
	 *
	 * use: jQuery
	 *
	 * TODO: クラス名のつき方の規則をきちんと決める
	 *
	 * @version 1.0.0
	 * @since 0.0.1
	 * @param $el 管理するDOM要素
	 *
	 */
	constructor (el: HTMLElement) {
		super();
		this.el = el;
		// 既にbaserJSのエレメント化している場合
		if (this._isElementized()) {
			if ('console' in window) {
				console.warn('This element is elementized of baserJS.');
			}
			this._elementized = true;
			return;
		}
		this._elementize();
		// ID・nameの抽出 & 生成
		const id: string = el.id || UtilString.UID();
		const name: string = el.getAttribute('name') || '';
		el.id = id;
		this.id = id;
		this.name = name;
		// 共通クラスの付加
		this.addClass(BaserElement.classNameElementCommon);
	}

	/**
	 * クラス名を付加する
	 *
	 * @version 0.9.0
	 * @since 0.1.0
	 *
	 */
	public addClass (blockNames: string, elementNames: string = '', modifierName: string = ''): void {
		BaserElement.addClass(this.el, blockNames, elementNames, modifierName);
	}

	/**
	 * 要素の属性の真偽を判定する
	 *
	 * `BaserElement.getBoolAttr` のインスタンスメソッド版
	 *
	 * @version 0.9.0
	 * @since 0.2.0
	 *
	 */
	public getBoolAttr (attrName: string): boolean {
		return BaserElement.getBoolAttr(this.el, attrName);
	}

	/**
	 * オプションとdata属性の値、属性の値をマージする
	 *
	 * use: jQuery
	 *
	 * TODO: テストを書く
	 * TODO: サブクラスに反映させる
	 *
	 * @version 1.0.0
	 * @since 0.8.0
	 *
	 */
	public mergeOptions (defaultOptions: any, options: any): any {
		const attrs: { [option: string ]: Primitive } = {};
		const dataAttrs: { [option: string ]: Primitive } = {};

		for (const optName in defaultOptions) {
			if (defaultOptions.hasOwnProperty(optName)) {
				// 属性はidとclassは除外する
				switch (optName) {
					case 'id':
					case 'class':
					break;
					default: {
						attrs[optName] = this.attr(optName);
					}
				}
				dataAttrs[optName] = this.data(optName);
			}
		}
		return $.extend({}, defaultOptions, options, dataAttrs, attrs);
	}

	/**
	 * 属性の取得と設定
	 */
	public attr (key: string, value: any): void;
	public attr (key: string): any;
	public attr (key: string, value?: any): string | undefined {
		if (value === undefined) {
			return $(this.el).attr(key);
		} else {
			$(this.el).attr(key, value);
		}
	}

	/**
	 * 要素にフラグを紐付ける
	 */
	public data (key: string, value: any): void;
	public data (key: string): any;
	public data (key: string, value?: any): Primitive | undefined {
		if (value === undefined) {
			return $(this.el).data(key);
		} else {
			$(this.el).data(key, value);
		}
	}

	/**
	 *
	 */
	public closest (selector: string): HTMLElement {
		return $(this.el).closest(selector)[0];
	}

	/**
	 * 要素にフラグを紐付ける
	 */
	public val (): string;
	public val (value: string): void;
	public val (value?: string): any {
		return $(this.el).val(value!);
	}

	/**
	 * 属性の取得と設定
	 */
	public prop (key: string, value: any): void;
	public prop (key: string): any;
	public prop (key: string, value?: any): Primitive | undefined {
		if (value === undefined) {
			return $(this.el).prop(key);
		} else {
			$(this.el).prop(key, value);
		}
	}

	/**
	 *
	 */
	public wrap (wrapper: DocumentFragment) {
		$(this.el).wrap(wrapper as HTMLElement);
	}

	/**
	 * 既にbaserJSのエレメント化しているかどうか確認する
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	protected _isElementized (): boolean {
		return this.__isElementized(BaserElement);
	}

	/**
	 * baserJSのエレメント化したフラグを登録する
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	protected _elementize (): void {
		this.__elementize(BaserElement);
	}

	/**
	 * 既にbaserJSのエレメント化しているかどうか確認する
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	protected __isElementized (constructor: any /* Class */): boolean {
		if (elementizedMap.has(this.el)) {
			const constructorList: Set<Symbol> = elementizedMap.get(this.el)!;
			return constructorList.has(constructor._name as Symbol);
		}
		return false;
	}

	/**
	 * baserJSのエレメント化したフラグを登録する
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	protected __elementize (constructor: any /* Class */): void {
		let constructorList: Set<Symbol>;
		if (elementizedMap.has(this.el)) {
			constructorList = elementizedMap.get(this.el)!;
		} else {
			constructorList = new Set();
		}
		constructorList.add(constructor._name as Symbol);
		elementizedMap.set(this.el, constructorList);
		console.log(constructor._name);

	}

}

export default BaserElement;
