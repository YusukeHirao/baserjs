import AccessibleElement from './AccessibleElement';
/**
 * Abstract Widget Element Wrapper Class
 *
 * @class WidgetElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
export default abstract class WidgetElement<E extends Element = Element> extends AccessibleElement<E> {
    /**
     * Abstract Widget Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    constructor(el: E);
}
