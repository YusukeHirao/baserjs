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
var SectionHeadElement_1 = require("./SectionHeadElement");
/**
 * Tab Element Wrapper Class
 *
 * `<element role="tab" />`
 *
 * @see https://www.w3.org/TR/wai-aria/roles#tab
 *
 * > A grouping label providing a mechanism for selecting the tab content that is to be rendered to the user.
 * >
 * > If a tabpanel or item in a tabpanel has focus, the associated tab is the currently active tab in the tablist, as defined in Managing Focus. tablist elements, which contain a set of associated tab elements, are typically placed near a series of tabpanel elements, usually preceding it. See the WAI-ARIA Authoring Practices Guide [ARIA-PRACTICES] for details on implementing a tab set design pattern.
 *
 * @class TabElements
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
var TabElements = /** @class */ (function (_super) {
    __extends(TabElements, _super);
    /**
     * Tab Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function TabElements(el) {
        var _this = _super.call(this, el) || this;
        /**
         * `aria-selected`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-selected
         *
         * > Indicates the current "selected" state of various widgets. See related aria-checked and aria-pressed.
         * >
         * > This attribute is used with single-selection and multiple-selection widgets:
         * > 1. Single-selection containers where the currently focused item is not selected. The selection normally follows the focus, and is managed by the user agent.
         * > 2. Multiple-selection containers. Authors SHOULD ensure that any selectable descendant of a container in which the aria-multiselectable attribute is true specifies a value of either true or false for the aria-selected attribute.
         * >
         * > Any explicit assignment of aria-selected takes precedence over the implicit selection based on focus. If no DOM element in the widget is explicitly marked as selected, assistive technologies MAY convey implicit selection which follows the keyboard focus of the managed focus widget. If any DOM element in the widget is explicitly marked as selected, the user agent MUST NOT convey implicit selection for the widget.
         */
        _this.selected = new ARIAAttribute_1.default(_this, 'aria-selected');
        return _this;
    }
    return TabElements;
}(SectionHeadElement_1.default));
exports.default = TabElements;
