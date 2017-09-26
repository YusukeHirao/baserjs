import AccessibleElement from '../nodes/AccessibleElement';
export interface ARIAAttributeTypes {
    /**
     * "true/false"
     *
     * @see https://www.w3.org/TR/wai-aria/states_and_properties#valuetype_true-false
     *
     * > Value representing either true or false, with a default "false" value.
     */
    boolean: 'true' | 'false';
    /**
     * "tristate"
     *
     * @see https://www.w3.org/TR/wai-aria/states_and_properties#valuetype_tristate
     *
     * Value representing true or false, with an intermediate "mixed" value. Default value is "false" unless otherwise specified.
     */
    tristate: 'true' | 'false' | 'mixed' | undefined;
    /**
     * "true/false/undefined"
     *
     * @see https://www.w3.org/TR/wai-aria/states_and_properties#valuetype_true-false-undefined
     *
     * > Value representing true or false, with a default "undefined" value indicating the state or property is not relevant.
     */
    optionalBoolean: 'true' | 'false' | undefined;
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
    idReferenceList: string;
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
    ariaDropeffectTokenList: string;
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
    ariaInvalidToken: 'grammar' | 'false' | 'spelling' | 'true';
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
    ariaRelevantTokenList: string;
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
export declare type ARIAAttributeValue = {
    [P in keyof ARIAAttributeRelation]: ARIAAttributeTypes[ARIAAttributeRelation[P]];
};
export declare type ARIAAttributeValueOptimizer = {
    [A in keyof ARIAAttributeTypes]: (value: string | number | undefined) => ARIAAttributeTypes[A];
};
export default class ARIAAttribute<A extends keyof ARIAAttributeRelation> {
    private _owner;
    private _name;
    private _value;
    constructor(owner: AccessibleElement, attrName: A);
    set(value: ARIAAttributeTypes[ARIAAttributeRelation[A]]): void;
    get(): ARIAAttributeTypes[ARIAAttributeRelation[A]];
    private _getValueFromDOMElement();
}
