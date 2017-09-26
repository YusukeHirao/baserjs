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
var ListElement_1 = require("./ListElement");
/**
 * Directory Element Wrapper Class
 *
 * @class DirectoryElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
var DirectoryElement = /** @class */ (function (_super) {
    __extends(DirectoryElement, _super);
    /**
     * Directory Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function DirectoryElement(el) {
        return _super.call(this, el) || this;
    }
    return DirectoryElement;
}(ListElement_1.default));
exports.default = DirectoryElement;
