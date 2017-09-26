import ListElement from './ListElement';
/**
 * Directory Element Wrapper Class
 *
 * @class DirectoryElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
export default abstract class DirectoryElement extends ListElement {
    /**
     * Directory Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    constructor(el: Element);
}
