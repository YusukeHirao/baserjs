import ARIAAttribute from '../states/ARIAAttribute';
import WidgetElement from './WidgetElement';

/**
 * Abstract Composite Element Wrapper Class
 *
 * @class CompositeElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
export default abstract class CompositeElement<E extends Element = Element> extends WidgetElement<E> {
	/**
	 * `aria-activedescendant`
	 *
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-activedescendant
	 *
	 * > Identifies the currently active descendant of a composite widget.
	 * >
	 * > This is used when a composite widget is responsible for managing its current active child to reduce the overhead of having all children be focusable. Examples include: multi-level lists, trees, and grids. In some implementations the user agent may use aria-activedescendant to tell assistive technologies that the active descendant has focus. Authors MAY use the aria-activedescendant attribute on the focused descendant of a composite widget; for example, on a textbox descendant of a combo box.
	 * >
	 * > Authors SHOULD ensure that the element targeted by the aria-activedescendant attribute is either a descendant of the container in the DOM, or is a logical descendant as indicated by the aria-owns attribute. The user agent is not expected to validate that the active descendant is a descendant of the container. Authors SHOULD ensure that the currently active descendant is visible and in view (or scrolls into view) when focused.
	 */
	public readonly activeDescendant = new ARIAAttribute(this, 'aria-activedescendant');

	/**
	 * Abstract Composite Element Wrapper Class
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
