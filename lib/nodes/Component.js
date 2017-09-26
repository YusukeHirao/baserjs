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
var InteractiveNode_1 = require("./InteractiveNode");
/**
 * Abstract Interactive Element Structure Class
 *
 * @class Component
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 * @template C Config
 *
 */
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    /**
     * Abstract Interactive Element Structure Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function Component(el, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, el) || this;
        /**
         *
         */
        _this.defaultConfig = Object.freeze({
            autoId: true,
        });
        var config = Object.assign({}, _this.defaultConfig, options);
        _this._config = Object.freeze(config);
        return _this;
    }
    return Component;
}(InteractiveNode_1.default));
exports.default = Component;
