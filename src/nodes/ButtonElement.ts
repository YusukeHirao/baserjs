import ARIAAttribute from '../states/ARIAAttribute';
import CommandElement from './CommandElement';

/**
 * Button Element Wrapper Class
 *
 * @class ButtonElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
export default class ButtonElement<E extends Element = Element> extends CommandElement<E> {
	/**
	 * `aria-pressed`
	 *
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-pressed
	 *
	 * > Indicates the current "pressed" state of toggle buttons. See related aria-checked and aria-selected.
	 * >
	 * > Toggle buttons require a full press-and-release cycle to change their value. Activating it once changes the value to true, and activating it another time changes the value back to false. A value of mixed means that the values of more than one item controlled by the button do not all share the same value. Examples of mixed-state buttons are described in WAI-ARIA Authoring Practices [ARIA-PRACTICES]. If the attribute is not present, the button is not a toggle button.
	 * >
	 * > The aria-pressed attribute is similar but not identical to the aria-checked attribute. Operating systems support pressed on buttons and checked on checkboxes.
	 */
	public readonly pressed = new ARIAAttribute(this, 'aria-pressed');

	/**
	 * `aria-expanded`
	 *
	 * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-expanded
	 *
	 * > Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.
	 * >
	 * > For example, this indicates whether a portion of a tree is expanded or collapsed. In other instances, this may be applied to page sections to mark expandable and collapsible regions that are flexible for managing content density. Simplifying the user interface by collapsing sections may improve usability for all, including those with cognitive or developmental disabilities.
	 * >
	 * > If the element with the aria-expanded attribute controls the expansion of another grouping container that is not 'owned by' the element, the author SHOULD reference the container by using the aria-controls attribute.
	 */
	public readonly expanded = new ARIAAttribute(this, 'aria-expanded');

	/**
	 * Button Element Wrapper Class
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
