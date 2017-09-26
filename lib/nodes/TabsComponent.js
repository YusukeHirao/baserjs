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
var StructureError_1 = require("../error/StructureError");
var Component_1 = require("./Component");
var TabElement_1 = require("./TabElement");
var TabListElement_1 = require("./TabListElement");
/**
 * Tabs Component Class
 *
 * @class Component
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 * @template C Config
 *
 */
var TabsComponent = /** @class */ (function (_super) {
    __extends(TabsComponent, _super);
    /**
     * Tabs Component Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function TabsComponent(el, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, el) || this;
        /**
         *
         */
        _this.defaultConfig = Object.freeze({
            autoId: true,
        });
        _this._$tabs = new Set();
        _this._traversal();
        console.log(_this);
        return _this;
    }
    TabsComponent.prototype._traversal = function () {
        var tabList = this.find('[role="tablist"]');
        if (tabList.length > 1) {
            throw new StructureError_1.default("Two or more role \"tablist\" were found in the component.");
        }
        else if (tabList.length < 1) {
            throw new StructureError_1.default("Role \"tablist\" is not found in the component.");
        }
        this._$tabList = new TabListElement_1.default(tabList.item(0));
        var tabs = this._$tabList.find('[role="tab"]');
        if (tabs.length < 1) {
            throw new StructureError_1.default("Role \"tab\" is not found in the component.");
        }
        for (var _i = 0, _a = Array.from(tabs); _i < _a.length; _i++) {
            var tab = _a[_i];
            var $tab = new TabElement_1.default(tab);
            $tab.owns.set(this._$tabList.id);
            this._$tabs.add($tab);
        }
    };
    return TabsComponent;
}(Component_1.default));
exports.default = TabsComponent;
