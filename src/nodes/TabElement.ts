import ARIAAttribute from '../states/ARIAAttribute';
import SectionHeadElement from './SectionHeadElement';

/**
 * Tab Element Wrapper Class
 *
 * `<element role="tab" />`
 *
 * @see https://www.w3.org/TR/wai-aria/roles#tab
 *
 * > A grouping label providing a mechanism for selecting the tab content that is to be rendered to the user.
 * >
 * > If a tabpanel or item in a tabpanel has focus, the associated tab is the currently active tab in the tablist, as defined in Managing Focus. tablist elements, which contain a set of associated tab elements, are typically placed near a series of tabpanel elements, usually preceding it. See the WAI-ARIA Authoring Practices Guide [ARIA-PRACTICES] for details on implementing a tab set design pattern.
 *
 * @class TabElements
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
export default class TabElements<E extends Element = Element> extends SectionHeadElement<E> {
	/**
	 * `aria-selected`
	 *
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-selected
	 *
	 * > Indicates the current "selected" state of various widgets. See related aria-checked and aria-pressed.
	 * >
	 * > This attribute is used with single-selection and multiple-selection widgets:
	 * > 1. Single-selection containers where the currently focused item is not selected. The selection normally follows the focus, and is managed by the user agent.
	 * > 2. Multiple-selection containers. Authors SHOULD ensure that any selectable descendant of a container in which the aria-multiselectable attribute is true specifies a value of either true or false for the aria-selected attribute.
	 * >
	 * > Any explicit assignment of aria-selected takes precedence over the implicit selection based on focus. If no DOM element in the widget is explicitly marked as selected, assistive technologies MAY convey implicit selection which follows the keyboard focus of the managed focus widget. If any DOM element in the widget is explicitly marked as selected, the user agent MUST NOT convey implicit selection for the widget.
	 */
	public readonly selected = new ARIAAttribute(this, 'aria-selected');

	/**
	 * Tab Element Wrapper Class
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
