import createUID from '../utils/createUID';
import EventDispatcher from './EventDispatcher';

const elements: WeakMap<CoreNode, Element> = new WeakMap();
const detachedChildren: WeakMap<CoreNode, DocumentFragment> = new WeakMap();

/**
 * Abstract DOM Element Wrapper Class
 *
 * @class CoreNode
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
export default abstract class CoreNode<E extends Element = Element> extends EventDispatcher {

	/**
	 * DOM ID Attribute
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 *
	 */
	private _id: string;

	/**
	 * Abstract DOM Element Wrapper Class
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 * @param el Assigned DOM Element
	 * @template E DOM Element Interface
	 *
	 */
	constructor (el: E) {
		super();

		if (!(el instanceof Element)) {
			throw new TypeError(`A argument is not Element.`);
		}

		/**
		 * `this.el` is readonly
		 *
		 * Virtual `this.el = el`;
		 */
		elements.set(this, el);

		// id属性の抽出 & 生成
		if (el.id) {
			this._id = el.id;
		} else {
			this._id = createUID();
			el.id = this._id;
		}

		const mo = new MutationObserver((mutations, observer) => this._onMutateAttributes(mutations, observer));
		mo.observe(this._el, {attributes: true});
	}

	/**
	 * DOM ID attribute
	 *
	 * @api DOM access
	 * @version 1.0.0
	 * @since 1.0.0
	 */
	public set id (id: string) {
		if (this._id !== id) {
			const isExist = !!document.getElementById(id);
			if (isExist) {
				throw new Error(`ID "${id}" was existing.`);
			}
			this._id = id;
			this._el.id = id;
		}
	}

	public get id () {
		return this._id;
	}

	/**
	 * add class
	 *
	 * @api DOM access
	 * @version 1.0.0
	 * @since 1.0.0
	 *
	 */
	public addClass (classNames: string[]) {
		this._el.classList.add(...classNames);
		return this;
	}

	/**
	 * remove class
	 *
	 * @api DOM access
	 * @version 1.0.0
	 * @since 1.0.0
	 *
	 */
	public removeClass (classNames: string[]) {
		this._el.classList.remove(...classNames);
		return this;
	}

	/**
	 * is class contained?
	 *
	 * @api DOM access
	 * @version 1.0.0
	 * @since 1.0.0
	 *
	 */
	public hasClass (className: string) {
		return this._el.classList.contains(className);
	}

	/**
	 * Set value to attribute
	 *
	 * @api DOM access
	 * @param attrName Attribute name
	 * @param value Attribute value
	 */
	public setAttr (attrName: string, value: string) {
		this._el.setAttribute(attrName, value);
	}

	/**
	 * Get value from attribute
	 *
	 * @api DOM access
	 * @param attrName Attribute name
	 */
	public getAttr (attrName: string) {
		return this._el.getAttribute(attrName);
	}

	/**
	 * Callback on mutated attributes
	 *
	 * @param mutations Mutated record list
	 * @param observer Mutation observer
	 */
	protected _onMutateAttributes (mutations: MutationRecord[], observer: MutationObserver) {
		if (mutations && mutations.length) {
			for (const mutation of mutations) {
				if (mutation.type === 'attributes' && mutation.attributeName) {
					this.trigger(mutation.attributeName, [this._el.getAttribute(mutation.attributeName)]);
				}
			}
		}
	}

	/**
	 * Assigned DOM Element
	 *
	 * @readonly
	 */
	private get _el (): E {
		return elements.get(this)! as E;
	}
}
