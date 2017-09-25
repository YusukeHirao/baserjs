import AccessibleElement from './AccessibleElement';

/**
 * Abstract Structure Element Wrapper Class
 *
 * @class StructureElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
export default abstract class StructureElement<E extends Element = Element> extends AccessibleElement<E> {
	/**
	 * Abstract Structure Element Wrapper Class
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 * @param el Assigned DOM Element
	 * @template E DOM Element Interface
	 *
	 */
	constructor (el: E) {
		super(el);
	}
}
