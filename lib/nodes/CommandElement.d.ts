import WidgetElement from './WidgetElement';
/**
 * Abstract Command Element Wrapper Class
 *
 * @class CommandElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
export default abstract class CommandElement<E extends Element = Element> extends WidgetElement<E> {
    /**
     * Abstract Command Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    constructor(el: E);
}
