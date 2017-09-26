import ARIAAttribute from '../states/ARIAAttribute';
import StructureElement from './StructureElement';
/**
 * Abstract Section Head Element Wrapper Class
 *
 * @class SectionHeadElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
export default abstract class SectionHeadElement<E extends Element = Element> extends StructureElement<E> {
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
    readonly expanded: ARIAAttribute<"aria-expanded">;
    /**
     * Abstract Section Head Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    constructor(el: E);
}
