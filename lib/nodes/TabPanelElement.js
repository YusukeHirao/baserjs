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
var RegionElement_1 = require("./RegionElement");
/**
 * Tab Panel Element Wrapper Class
 *
 * @class TabPanelElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
var TabPanelElement = /** @class */ (function (_super) {
    __extends(TabPanelElement, _super);
    /**
     * Tab Panel Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function TabPanelElement(el) {
        return _super.call(this, el) || this;
    }
    return TabPanelElement;
}(RegionElement_1.default));
exports.default = TabPanelElement;
