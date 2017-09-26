"use strict";
// TODO: IntersectionObserve
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
var CoreNode_1 = require("./CoreNode");
/**
 * Abstract Interactive Element Wrapper Class
 *
 * @class InteractiveNode
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
var InteractiveNode = /** @class */ (function (_super) {
    __extends(InteractiveNode, _super);
    /**
     * Abstract Interactive Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function InteractiveNode(el) {
        var _this = _super.call(this, el) || this;
        el.addEventListener('click', function (e) {
            var t = _this.trigger('click', [e.currentTarget.id]);
            if (t.isDefaultPrevented()) {
                e.preventDefault();
            }
        }, false);
        return _this;
    }
    InteractiveNode.prototype.onClick = function (eventHandler, preventDefault) {
        this.on('click', function (e, id) {
            eventHandler(id);
            if (preventDefault) {
                e.preventDefault();
            }
        });
    };
    return InteractiveNode;
}(CoreNode_1.default));
exports.default = InteractiveNode;
