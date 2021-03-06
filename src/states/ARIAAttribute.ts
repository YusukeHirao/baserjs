import AccessibleElement from '../nodes/AccessibleElement';

export interface ARIAAttributeTypes {
	/**
	 * "true/false"
	 *
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#valuetype_true-false
	 *
	 * > Value representing either true or false, with a default "false" value.
	 */
	boolean: true | false;

	/**
	 * "tristate"
	 *
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#valuetype_tristate
	 *
	 * Value representing true or false, with an intermediate "mixed" value. Default value is "false" unless otherwise specified.
	 */
	tristate: true | false | 'mixed' | undefined;

	/**
	 * "true/false/undefined"
	 *
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#valuetype_true-false-undefined
	 *
	 * > Value representing true or false, with a default "undefined" value indicating the state or property is not relevant.
	 */
	optionalBoolean: true | false | undefined;

	/**
	 * "ID reference"
	 *
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#valuetype_idref
	 *
	 * Reference to the ID of another element in the same document.
	 */
	idReference: string;

	/**
	 * "ID reference list"
	 *
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#valuetype_idref_list
	 *
	 * > A list of one or more ID references. (space separator)
	 */
	idReferenceList: string[];

	// /**
	//  * A numerical value without a fractional component.
	//  */
	// Integer: number;

	// /**
	//  * Any real numerical value.
	//  */
	// Number: number;

	/**
	 * "string"
	 *
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#valuetype_string
	 *
	 * > Unconstrained value type.
	 */
	string: string;

	/**
	 * Token list for `aria-dropeffect`
	 *
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#valuetype_token_list
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-dropeffect
	 *
	 * > |Value|Description
	 * > |---|---
	 * > |`copy`|A duplicate of the source object will be dropped into the target.
	 * > |`move`|The source object will be removed from its current location and dropped into the target.
	 * > |`link`|A reference or shortcut to the dragged object will be created in the target object.
	 * > |`execute`|A function supported by the drop target is executed, using the drag source as an input.
	 * > |`popup`|There is a popup menu or dialog that allows the user to choose one of the drag operations (copy, move, link, execute) and any other drag functionality, such as cancel.
	 * > |`none` (default)|No operation can be performed; effectively cancels the drag operation if an attempt is made to drop on this object. Ignored if combined with any other token value. e.g. 'none copy' is equivalent to a 'copy' value.
	 */
	ariaDropeffectTokenList: Set<'copy' | 'move' | 'link' | 'execute' | 'popup' | 'none'>;

	/**
	 * Token for `aria-invalid`
	 *
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#valuetype_token
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-invalid
	 *
	 * > |Value|Description
	 * > |---|---
	 * > |`grammar`|A grammatical error was detected.
	 * > |`false` (default)|There are no detected errors in the value.
	 * > |`spelling`|A spelling error was detected.
	 * > |`true`|The value entered by the user has failed validation.
	 */
	ariaInvalidToken: 'grammar' | false | 'spelling' | true;

	/**
	 * Token for `aria-live`
	 *
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#valuetype_token
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-live
	 *
	 * > |Value|Description
	 * > |---|---
	 * > |`off` (default)|Updates to the region will not be presented to the user unless the assistive technology is currently focused on that region.
	 * > |`polite`|(Background change) Assistive technologies SHOULD announce updates at the next graceful opportunity, such as at the end of speaking the current sentence or when the user pauses typing.
	 * > |`assertive`|This information has the highest priority and assistive technologies SHOULD notify the user immediately. Because an interruption may disorient users or cause them to not complete their current task, authors SHOULD NOT use the assertive value unless the interruption is imperative.
	 */
	ariaLiveToken: 'off' | 'polite' | 'assertive';

	/**
	 * Token for `aria-relevant`
	 *
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#valuetype_token
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-relevant
	 *
	 * > |Value|Description
	 * > |---|---
	 * > |`additions`|Element nodes are added to the DOM within the live region.
	 * > |`removals`|Text or element nodes within the live region are removed from the DOM.
	 * > |`text`|Text is added to any DOM descendant nodes of the live region.
	 * > |`all`|Equivalent to the combination of all values, "additions removals text".
	 * > |`additions text` (default)|Equivalent to the combination of values, "additions text".
	 */
	ariaRelevantTokenList: Set<'additions' | 'removals' | 'text' | 'all'>;
}

export interface ARIAAttributeRelation {
	'aria-atomic': 'boolean';
	'aria-busy': 'boolean';
	'aria-controls': 'idReferenceList';
	'aria-describedby': 'idReferenceList';
	'aria-disabled': 'boolean';
	'aria-dropeffect': 'ariaDropeffectTokenList';
	'aria-flowto': 'idReferenceList';
	'aria-grabbed': 'optionalBoolean';
	'aria-haspopup': 'boolean';
	'aria-hidden': 'boolean';
	'aria-invalid': 'ariaInvalidToken';
	'aria-label': 'string';
	'aria-labelledby': 'idReferenceList';
	'aria-live': 'ariaLiveToken';
	'aria-owns': 'idReferenceList';
	'aria-relevant': 'ariaRelevantTokenList';
	'aria-pressed': 'tristate';
	'aria-expanded': 'optionalBoolean';
	'aria-selected': 'optionalBoolean';
	'aria-activedescendant': 'idReference';
}

export type Primitive = string | number | boolean;

export type NullablePrimitive = Primitive | undefined | null;

export type ExpectableType = NullablePrimitive | NullablePrimitive[];

export type ARIAAttributeValue = {[P in keyof ARIAAttributeRelation]: ARIAAttributeTypes[ARIAAttributeRelation[P]]};

export type ARIAAttributeValueOptimizer = {[A in keyof ARIAAttributeTypes]: (value: ExpectableType | ARIAAttributeTypes[A]) => ARIAAttributeTypes[A]};

const relation: ARIAAttributeRelation = {
	'aria-atomic': 'boolean',
	'aria-busy': 'boolean',
	'aria-controls': 'idReferenceList',
	'aria-describedby': 'idReferenceList',
	'aria-disabled': 'boolean',
	'aria-dropeffect': 'ariaDropeffectTokenList',
	'aria-flowto': 'idReferenceList',
	'aria-grabbed': 'optionalBoolean',
	'aria-haspopup': 'boolean',
	'aria-hidden': 'boolean',
	'aria-invalid': 'ariaInvalidToken',
	'aria-label': 'string',
	'aria-labelledby': 'idReferenceList',
	'aria-live': 'ariaLiveToken',
	'aria-owns': 'idReferenceList',
	'aria-relevant': 'ariaRelevantTokenList',
	'aria-pressed': 'tristate',
	'aria-expanded': 'optionalBoolean',
	'aria-selected': 'optionalBoolean',
	'aria-activedescendant': 'idReference',
};

const defaultValues: ARIAAttributeValue = {
	'aria-atomic': false,
	'aria-busy': false,
	'aria-controls': [],
	'aria-describedby': [],
	'aria-disabled': false,
	'aria-dropeffect': new Set(['none']) as ARIAAttributeTypes['ariaDropeffectTokenList'],
	'aria-flowto': [],
	'aria-grabbed': undefined,
	'aria-haspopup': false,
	'aria-hidden': false,
	'aria-invalid': false,
	'aria-label': '',
	'aria-labelledby': [],
	'aria-live': 'off',
	'aria-owns': [],
	'aria-relevant': new Set(['additions', 'text']) as ARIAAttributeTypes['ariaRelevantTokenList'],
	'aria-pressed': undefined,
	'aria-expanded': undefined,
	'aria-selected': undefined,
	'aria-activedescendant': '',
};

const optimizer: ARIAAttributeValueOptimizer = {
	boolean: (v) => {
		return v === 'true' ? true : v === 'false' ? false : !!v;
	},
	tristate: (v) => {
		if (v === 'mixed') {
			return v;
		}
		return optimizer.boolean(v);
	},
	optionalBoolean: (v) => {
		if (v == null) {
			return;
		}
		return optimizer.boolean(v);
	},
	idReference: (v) => {
		return optimizer.string(v);
	},
	idReferenceList: (v) => {
		if (Array.isArray(v)) {
			return (v as NullablePrimitive[]).map(i => optimizer.idReference(i));
		}
		return optimizer.idReference(v).split(/\s+/g).map(i => optimizer.idReference(i));
	},
	string: (v) => {
		return `${v}`.trim();
	},
	ariaDropeffectTokenList: (v) => {
		if (v instanceof Set) {
			v = [...Array.from(v)];
		}
		const a: NullablePrimitive[] = Array.isArray(v) ? v :  `${v}`.split(/\s+/g);
		const list = ['copy', 'move', 'link', 'execute', 'popup', 'none'];
		const values = a.map(val => list.includes(`${val}`) ? `${val}` : '').filter(val => val);
		return new Set(values) as ARIAAttributeTypes['ariaDropeffectTokenList'];
	},
	ariaInvalidToken: (v) => {
		switch (v) {
			case 'grammar':
			case 'spelling':
				return v;
		}
		return !!v;
	},
	ariaLiveToken: (v) => {
		switch (v) {
			case 'polite':
			case 'assertive':
				return v;
		}
		return 'off';
	},
	ariaRelevantTokenList: (v) => {
		if (v instanceof Set) {
			v = [...Array.from(v)];
		}
		const a: NullablePrimitive[] = Array.isArray(v) ? v :  `${v}`.split(/\s+/g);
		const list = ['additions', 'removals', 'text', 'all'];
		const values = a.map(val => list.includes(`${val}`) ? `${val}` : '').filter(val => val);
		return new Set(values) as ARIAAttributeTypes['ariaRelevantTokenList'];
	},
};

export default class ARIAAttribute<A extends keyof ARIAAttributeRelation> {

	private _owner: AccessibleElement;

	private _name: A;

	private _value: ARIAAttributeTypes[ARIAAttributeRelation[A]];

	constructor (owner: AccessibleElement, attrName: A) {
		this._owner = owner;
		this._name = attrName;
		this.set(this._owner.getAttr(this._name) || defaultValues[this._name]);
	}

	public set (value: ExpectableType | ARIAAttributeTypes[ARIAAttributeRelation[A]]) {
		this._value = this.optimize(value);
		const attrValue = this.toString();
		if (attrValue === '') {
			this._owner.removeAttr(this._name);
		} else {
			this._owner.setAttr(this._name, attrValue);
		}
	}

	public get () {
		return this._value;
	}

	public optimize (value: ExpectableType | ARIAAttributeTypes[ARIAAttributeRelation[A]]): ARIAAttributeTypes[ARIAAttributeRelation[A]] {
		return optimizer[relation[this._name]](value);
	}

	public toString () {
		let v = this._value;
		if (v instanceof Set) {
			v = [...Array.from(v)];
		}
		if (Array.isArray(v)) {
			return v.join(' ');
		}
		if (v == null) {
			return '';
		}
		return `${v}`;
	}
}
