"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ARIAAttribute_1 = require("../states/ARIAAttribute");
var InteractiveNode_1 = require("./InteractiveNode");
/**
 * Abstract Accessible Element Wrapper Class
 *
 * @class AccessibleElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
var AccessibleElement = /** @class */ (function (_super) {
    __extends(AccessibleElement, _super);
    /**
     * Abstract Accessible Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function AccessibleElement(el) {
        var _this = _super.call(this, el) || this;
        /**
         * `aria-atomic`
         *
         * Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. See related aria-relevant.
         *
         * Both accessibility APIs and the Document Object Model [DOM] provide events to allow the assistive technologies to determine changed areas of the document.
         *
         * When the content of a live region changes, user agents SHOULD examine the changed element and traverse the ancestors to find the first element with aria-atomic set, and apply the appropriate behavior for the cases below.
         *
         * 1. If none of the ancestors have explicitly set aria-atomic, the default is that aria-atomic is false, and assistive technologies will only present the changed node to the user.
         * 2. If aria-atomic is explicitly set to false, assistive technologies will stop searching up the ancestor chain and present only the changed node to the user.
         * 3. If aria-atomic is explicitly set to true, assistive technologies will present the entire contents of the element.
         *
         * When aria-atomic is true, assistive technologies MAY choose to combine several changes and present the entire changed region at once.
         */
        _this.atomic = new ARIAAttribute_1.default(_this, 'aria-atomic');
        /**
         * Indicates whether an element, and its subtree, are currently being updated.
         *
         * The default is that aria-busy is false. If authors know that multiple parts of the same element need to be loaded or modified, they can set aria-busy to true when the first part is loaded, and then set aria-busy to false when the last part is loaded. When a widget is missing required owned elements due to script execution or loading, authors MUST mark a containing element with aria-busy equal to true. For example, until a page is fully initialized and complete, an author could mark the document element as busy. If there is an error updating the element, author MAY set the aria-invalid attribute to true.
         */
        _this.busy = new ARIAAttribute_1.default(_this, 'aria-busy');
        return _this;
    }
    return AccessibleElement;
}(InteractiveNode_1.default));
exports.default = AccessibleElement;
