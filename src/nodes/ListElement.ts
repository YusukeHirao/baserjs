import ARIAAttribute from '../states/ARIAAttribute';
import RegionElement from './RegionElement';


/**
 * List Element Wrapper Class
 *
 * @class ListElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
export default abstract class ListElement extends RegionElement {
	/**
	 * List Element Wrapper Class
	 *
	 * @version 1.0.0
	 * @since 1.0.0
	 * @param el Assigned DOM Element
	 * @template E DOM Element Interface
	 *
	 */
	constructor (el: Element) {
		super(el);
	}
}
