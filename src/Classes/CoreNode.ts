import 'intersection-observer';

import EventDispatcher from './EventDispatcher';

import createUID from '../fn/createUID';
import hyphenize from '../fn/hyphenize';
import isDOMValue from '../fn/isDOMValue';
import isFalsy from '../fn/isFalsy';
import parse from '../fn/parse';

const elements: WeakMap<CoreNode, Element> = new WeakMap();
const detachedChildren: WeakMap<CoreNode, DocumentFragment> = new WeakMap();

const inViewportElementMap: WeakMap<Element, CoreNode> = new WeakMap();
const inViewportChangeMethodMap: WeakMap<CoreNode, (isInViewport: boolean) => void> = new WeakMap();
let masterIntersection: IntersectionObserver;

export interface CoreNodeAttributes {
	hidden: boolean;
	disabled: boolean;
	// tslint:disable-next-line:no-any
	[attrName: string]: any;
}

/**
 * DOM要素の抽象クラス
 *
 * @class CoreNode
 * @version 1.0.0
 * @since 0.0.1
 * @template E 管理するDOM要素のインターフェイス
 *
 */
export default abstract class CoreNode<E extends Element = Element, C = {}> extends EventDispatcher {

	/**
	 * 管理するDOM要素のid属性値
	 *
	 * @version 0.0.1
	 * @since 0.0.1
	 *
	 */
	public id: string;

	/**
	 * data-{*}-state属性のキー
	 */
	protected stateKeyName = 'baser-element';

	/**
	 *
	 */
	protected _config: C;

	/**
	 *
	 */
	private _options: {[P in keyof C]?: C[P]};

	/**
	 *
	 */
	private _isInViewport: boolean;

	/**
	 *
	 */
	private _hasBeenInViewportOneTime = false;

	/**
	 *
	 */
	private _inViewportResolver: () => void | undefined;

	/**
	 * コンストラクタ
	 *
	 * @version 1.0.0
	 * @since 0.0.1
	 * @param {E} el 管理するDOM要素
	 * @template E 管理するDOM要素のインターフェイス
	 *
	 */
	constructor (el: E, options: {[P in keyof C]?: C[P]} = {}) {
		super();

		if (!(el instanceof Element)) {
			throw new TypeError(`A argument is not Element.`);
		}

		// 以下と同等扱いだがthis.elはreadonly
		// this.el = el;
		elements.set(this, el);

		// id属性の抽出 & 生成
		if (el.id) {
			this.id = el.id;
		} else {
			this.id = createUID();
			el.id = this.id;
		}

		this._options = options;

		this._create();

		if (window.document.contains(el)) {
			this._onMount();
		} else if ('MutationObserver' in window) {
			const mo = new MutationObserver(() => this._onMount());
			mo.observe(this.el, { attributes: true });
		}
	}

	/**
	 * 管理するDOM要素
	 *
	 * @readonly
	 */
	public get el (): E {
		return elements.get(this)! as E;
	}

	/**
	 * クラス名を付加する
	 *
	 * @version 1.0.0
	 * @since 0.1.0
	 *
	 */
	public addClass (className: string) {
		this.el.classList.add(...className.split(/\s+/g));
		return this;
	}

	/**
	 * クラス名を付加する
	 *
	 * @version 1.0.0
	 * @since 0.1.0
	 *
	 */
	public removeClass (className: string) {
		this.el.classList.remove(...className.split(/\s+/g));
		return this;
	}

	/**
	 * 要素の属性の真偽を判定する
	 *
	 * DOM APIの標準で判定できるものはそれで判断
	 * 値なし属性の場合は存在すれば真
	 * 値あり属性の場合は偽相等の文字列でなければ全て真とする
	 * ただし値なし属性の場合は値が空文字列のため、偽相等の文字列の例外とする
	 *
	 * @version 1.0.0
	 * @since 0.2.0
	 * @param elem 対象のDOM要素
	 * @param attrName 確認したい属性名
	 * @return 結果
	 *
	 */
	public getBoolAttr (attrName: string): boolean {
		const value = this.pullProp(attrName);
		return value === '' || !isFalsy(value);
	}

	/**
	 * プロパティの値を取得する
	 *
	 * 1. DOMインターフェイスの属性値
	 * 2. HTMLのタグに記述された属性値
	 * 3. data-*属性値
	 * 4. オプションに渡されたオブジェクト内の値
	 *
	 * 上記の優先順位で有効な値が返る
	 *
	 * ⚠️ DOMインターフェイスの属性値は大文字小文字を区別するため注意が必要
	 *
	 * data-*属性の場合次の2通りの取得方法があります。
	 *
	 * 1. `CoreNode.pullProp("data-foo-bar");`
	 * 2. `CoreNode.pullProp("fooBar");`
	 *
	 * オプションに渡されたオブジェクト内の値が、
	 * ハッシュマップだった場合は`Object.assign`を利用して
	 * 2階層目までマージされます。
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 *
	 */
	// tslint:disable-next-line:no-any
	public pullProp<P extends keyof CoreNodeAttributes> (propName: P, ...options: { [x: string]: any }[]): CoreNodeAttributes[P] {
		const el = this.el;

		// 1. DOMインターフェイスの属性値
		if (propName in el) {
			// tslint:disable-next-line:no-any
			return (el as any)[propName];
		}

		// 2. HTMLのタグに記述された属性値
		const htmlAttrVal = el.getAttribute(propName);
		// 2-B. HTMLのタグに記述された属性値（小文字）
		const htmlAttrValLower = el.getAttribute(propName.toLowerCase());
		// 2-C. HTMLのタグに記述された属性値（ハイフンケース）
		const htmlAttrValHyphenized = el.getAttribute(hyphenize(propName));

		let value: CoreNodeAttributes[P];

		// 判定
		if (htmlAttrVal !== null) {
			value = parse(htmlAttrVal);
		} else if (htmlAttrValLower !== null) {
			value = parse(htmlAttrValLower);
		} else if (htmlAttrValHyphenized !== null) {
			value = parse(htmlAttrValHyphenized);
		} else if (el instanceof HTMLElement && el.dataset) {
			const dataVal = el.dataset[propName as string];
			if (dataVal !== undefined) {
				value = parse(dataVal);
			}
		} else {
			// jsdomはElement::datasetをサポートしない
			const dataVal = el.getAttribute(`data-${hyphenize(propName)}`);
			if (dataVal !== null) {
				value = parse(dataVal);
			}
		}
		if (isDOMValue(value)) {
			return value;
		}
		if (Array.isArray(options)) {
			for (const option of options) {
				if (option && option.hasOwnProperty(propName)) {
					const optVal = option[propName];
					if (optVal !== undefined) {
						if (isDOMValue(optVal)) {
							return optVal;
						} else {
							value = Object.assign(optVal, value);
						}
					}
				}
			}
		}
		return value;
	}

	/**
	 * プロパティをマージしたデータを返す
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public merge<T extends {[P in keyof CoreNodeAttributes]?: CoreNodeAttributes[P]}, U extends {[P in keyof T]?: T[P]}> (defaultData: T, optionalData: U): T & U {
		const map = Object.assign({}, optionalData, defaultData);
		for (const key in map) {
			if (map.hasOwnProperty(key)) {
				map[key] = this.pullProp(key, optionalData, defaultData);
			}
		}
		return map;
	}

	/**
	 * 子要素をDOMツリーから切り離す
	 *
	 * 切り離された子要素（厳密には`Node`すべて）は、`DocumentFragment`に移され
	 * `WeakMap` に保管される。
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public detachChildren () {
		const children = this.el.childNodes;
		const container = document.createDocumentFragment();
		detachedChildren.set(this, container);
		for (const child of Array.from(children)) {
			container.appendChild(child);
		}
		return this;
	}

	public detachedChildrenMap<R> (each: (el: Element) => R) {
		const map: R[] = [];
		for (const el of Array.from(detachedChildren.get(this)!.children)) {
			map.push(each.apply(this, [el]));
		}
		return map;
	}

	public detachedChildrenEach (each: (el: Element) => void) {
		this.detachedChildrenMap<void>(each);
		return this;
	}

	public changeState<S extends string> (state: S) {
		this.el.setAttribute(`data-${this.stateKeyName}-state`, state);
		return this;
	}

	protected _create (defaults?: C) {
		// tslint:disable-next-line:no-object-literal-type-assertion
		this._config = defaults ? this.merge(defaults, this._options) : {} as C;
	}

	/**
	 * スクロール位置を監視する
	 *
	 * 引数に`false`を渡すことで監視を回避できる。
	 * Promiseのthenメソッドに渡す前提のAPI。
	 */
	protected inViewportFirstTime<T> (watch: boolean = true) {
		return (result?: T) => {
			if (!watch || this._hasBeenInViewportOneTime) {
				return Promise.resolve(result);
			}
			return new Promise<T | void>((resolve) => {
				this._inViewportResolver = () => {
					resolve(result);
				};
			});
		};
	}

	protected inViewport (isInViewport: boolean) {
		if (this._isInViewport !== isInViewport) {
			this._isInViewport = isInViewport;
			this.el.setAttribute(`data-${this.stateKeyName}-inview`, `${isInViewport}`);
			if (!this._hasBeenInViewportOneTime) {
				this._hasBeenInViewportOneTime = true;
			}
			if (this._inViewportResolver) {
				this._inViewportResolver();
			}
		}
	}

	private _onMount () {
		inViewportElementMap.set(this.el, this);
		inViewportChangeMethodMap.set(this, this.inViewport.bind(this));
		if ('IntersectionObserver' in window) {
			masterIntersection = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						const bel = inViewportElementMap.get(entry.target);
						if (!bel) {
							return;
						}
						const changeMethod = inViewportChangeMethodMap.get(bel);
						if (!changeMethod) {
							return;
						}
						changeMethod(!!entry.intersectionRatio);
					});
				},
				{
					threshold: [0, 1],
				},
			);
			masterIntersection.observe(this.el);
		}
	}
}
