import EventDispatcher from './EventDispatcher';
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
    private _id;
    /**
     * Abstract DOM Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    constructor(el: E);
    /**
     * DOM ID attribute
     *
     * @api DOM access
     * @version 1.0.0
     * @since 1.0.0
     */
    id: string;
    /**
     * add class
     *
     * @api DOM access
     * @version 1.0.0
     * @since 1.0.0
     *
     */
    addClass(classNames: string[]): this;
    /**
     * remove class
     *
     * @api DOM access
     * @version 1.0.0
     * @since 1.0.0
     *
     */
    removeClass(classNames: string[]): this;
    /**
     * is class contained?
     *
     * @api DOM access
     * @version 1.0.0
     * @since 1.0.0
     *
     */
    hasClass(className: string): boolean;
    /**
     * Set value to attribute
     *
     * @api DOM access
     * @param attrName Attribute name
     * @param value Attribute value
     */
    setAttr(attrName: string, value: string): void;
    /**
     * Get value from attribute
     *
     * @api DOM access
     * @param attrName Attribute name
     */
    getAttr(attrName: string): string | null;
    /**
     * Remove attribute
     *
     * @api DOM access
     * @param attrName Attribute name
     */
    removeAttr(attrName: string): void;
    /**
     * Get Descendant elemtns
     *
     * @api DOM access
     * @param selector match selector
     */
    find(selector: string): NodeListOf<Element>;
    /**
     * Callback on mutated attributes
     *
     * @param mutations Mutated record list
     * @param observer Mutation observer
     */
    protected _onMutateAttributes(mutations: MutationRecord[], observer: MutationObserver): void;
    /**
     * Assigned DOM Element
     *
     * @readonly
     */
    private readonly _el;
}
