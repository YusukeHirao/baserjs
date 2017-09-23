import CoreNode from './CoreNode';
/**
 * Abstract Interactive Element Wrapper Class
 *
 * @class InteractiveNode
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
export default abstract class InteractiveNode<E extends Element = Element> extends CoreNode<E> {
    /**
     * Abstract Interactive Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    constructor(el: E);
}
