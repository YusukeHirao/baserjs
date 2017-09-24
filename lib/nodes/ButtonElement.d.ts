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
     * Button Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    constructor(el: E);
}
