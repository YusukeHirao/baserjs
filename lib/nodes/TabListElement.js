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
var DirectoryElement_1 = require("./DirectoryElement");
/**
 * Tab List Element Wrapper Class
 *
 * @class TabListElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
var TabListElement = /** @class */ (function (_super) {
    __extends(TabListElement, _super);
    /**
     * Tab List Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function TabListElement(el) {
        var _this = _super.call(this, el) || this;
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
        _this.activeDescendant = new ARIAAttribute_1.default(_this, 'aria-activedescendant');
        return _this;
    }
    return TabListElement;
}(DirectoryElement_1.default));
exports.default = TabListElement;
