import SectionElement from './SectionElement';

/**
 * Region Element Wrapper Class
 *
 * @class RegionElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
export default abstract class RegionElement extends SectionElement<Element> {
	/**
	 * Region Element Wrapper Class
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
