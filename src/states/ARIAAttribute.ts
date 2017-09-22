import AccessibleElement from '../nodes/AccessibleElement';

export interface ARIAAttributeTypes {
	/**
	 * Value representing either true or false, with a default "false" value.
	 */
	boolean: 'true' | 'false';

	// /**
	//  * Value representing true or false, with an intermediate "mixed" value. Default value is "false" unless otherwise specified.
	//  */
	// tristate: 'true' | 'false' | 'mixed';

	// /**
	//  * Value representing true or false, with a default "undefined" value indicating the state or property is not relevant.
	//  */
	// OptionalBoolean: 'true' | 'false' | undefined;

	// /**
	//  * Reference to the ID of another element in the same document.
	//  */
	// IDReference: string;

	// /**
	//  * A list of one or more ID references. (space separator)
	//  */
	// IDReferenceList: string;

	// /**
	//  * A numerical value without a fractional component.
	//  */
	// Integer: number;

	// /**
	//  * Any real numerical value.
	//  */
	// Number: number;

	// /**
	//  * Unconstrained value type.
	//  */
	// String: string;

	// /**
	//  * One of a limited set of allowed values.
	//  */
	// Token: string;

	// /**
	//  * A list of one or more tokens.
	//  */
	// TokenList: string;
}

export interface ARIAAttributeRelation {
	/**
	 * `aria-atomic`
	 *
	 * Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. See related aria-relevant.
	 *
	 * Both accessibility APIs and the Document Object Model [DOM] provide events to allow the assistive technologies to determine changed areas of the document.
	 *
	 * When the content of a live region changes, user agents SHOULD examine the changed element and traverse the ancestors to find the first element with aria-atomic set, and apply the appropriate behavior for the cases below.
	 *
	 * 1. If none of the ancestors have explicitly set aria-atomic, the default is that aria-atomic is false, and assistive technologies will only present the changed node to the user.
	 * 2. If aria-atomic is explicitly set to false, assistive technologies will stop searching up the ancestor chain and present only the changed node to the user.
	 * 3. If aria-atomic is explicitly set to true, assistive technologies will present the entire contents of the element.
	 *
	 * When aria-atomic is true, assistive technologies MAY choose to combine several changes and present the entire changed region at once.
	 */
	'aria-atomic': 'boolean';

	/**
	 * Indicates whether an element, and its subtree, are currently being updated.
	 *
	 * The default is that aria-busy is false. If authors know that multiple parts of the same element need to be loaded or modified, they can set aria-busy to true when the first part is loaded, and then set aria-busy to false when the last part is loaded. When a widget is missing required owned elements due to script execution or loading, authors MUST mark a containing element with aria-busy equal to true. For example, until a page is fully initialized and complete, an author could mark the document element as busy. If there is an error updating the element, author MAY set the aria-invalid attribute to true.
	 */
	'aria-busy': 'boolean';
}

export type ARIAAttributeValue = {[P in keyof ARIAAttributeRelation]: ARIAAttributeTypes[ARIAAttributeRelation[P]]};

export type ARIAAttributeValueOptimizer = {[A in keyof ARIAAttributeTypes]: (value: string | number | undefined) => ARIAAttributeTypes[A]};

const relation: ARIAAttributeRelation = {
	'aria-atomic': 'boolean',
	'aria-busy': 'boolean',
};

const defaultValues: ARIAAttributeValue = {
	'aria-atomic': 'false',
	'aria-busy': 'false',
};

const optimizer: ARIAAttributeValueOptimizer = {
	boolean: (v) => {
		return v === 'true' ? v : 'false';
	},
	// tristate: (v) => {
	// 	switch (v) {
	// 		case 'true':
	// 		case 'false':
	// 		case 'mixin': {
	// 			return v;
	// 		}
	// 		default: {
	// 			return 'false';
	// 		}
	// 	}
	// },
};

export default class ARIAAttribute<A extends keyof ARIAAttributeRelation> {

	private _owner: AccessibleElement;

	private _name: A;

	private _value: ARIAAttributeTypes[ARIAAttributeRelation[A]];

	constructor (owner: AccessibleElement, attrName: A) {
		this._owner = owner;
		this._name = attrName;
		this._value = defaultValues[this._name];
	}

	public set (value: ARIAAttributeRelation[A]) {
		const a = optimizer[relation[this._name]](value);
	}

	public get () {
		return this._value;
	}

	private _getValueFromDOMElement () {
		const raw = this._owner.getAttr(this._name);
	}
}
