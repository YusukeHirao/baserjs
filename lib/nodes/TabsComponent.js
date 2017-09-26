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
var TabPanelElement_1 = require("./TabPanelElement");
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
        var _this = _super.call(this, el, options) || this;
        /**
         *
         */
        _this.defaultConfig = Object.freeze({
            autoId: true,
        });
        _this._tabRelations = new Map();
        _this._tabs = {};
        _this._traversal();
        return _this;
    }
    TabsComponent.prototype._traversal = function () {
        /**
         * Tab list
         */
        var tabList = this.find('[role="tablist"]');
        if (tabList.length > 1) {
            throw new StructureError_1.default("Two or more role \"tablist\" were found in the component.");
        }
        else if (tabList.length < 1) {
            throw new StructureError_1.default("Role \"tablist\" is not found in the component.");
        }
        this._tabList = new TabListElement_1.default(tabList.item(0));
        /**
         * Tabs
         */
        var tabs = this._tabList.find('[role="tab"]');
        var $tabs = [];
        var selectedTabs = [];
        if (tabs.length < 1) {
            throw new StructureError_1.default("Role \"tab\" is not found in the component.");
        }
        for (var i = 0, l = tabs.length; i < l; i++) {
            var $tab = new TabElement_1.default(tabs[i]);
            $tab.owns.set(this._tabList.id);
            $tabs.push($tab);
            this._tabs[$tab.id] = $tab;
            // selected state
            if ($tab.selected.get()) {
                selectedTabs.push(i);
            }
        }
        // default selected index is 0
        if (selectedTabs.length === 0) {
            selectedTabs.push(0);
        }
        /**
         * Tab panels
         */
        var panels = this.find('[role="tabpanel"]');
        var _setTab = this._setTab.bind(this);
        if (panels.length < 1) {
            throw new StructureError_1.default("Role \"tabpanel\" is not found in the component.");
        }
        else if (panels.length !== $tabs.length) {
            throw new StructureError_1.default("The number of role \"tab\" and role \"tabpanel\" must be the same.");
        }
        for (var i = 0, l = $tabs.length; i < l; i++) {
            var $tab = $tabs[i];
            var $panel = new TabPanelElement_1.default(panels[i]);
            $tab.controls.set($panel.id);
            $panel.owns.set($tab.id);
            this._tabRelations.set($tab, $panel);
            // selected and hidden
            var selected = selectedTabs.includes(i);
            $panel.hidden.set(!selected);
            // event
            $tab.onClick(_setTab, true);
        }
    };
    TabsComponent.prototype._setTab = function (id) {
        // all
        this._tabRelations.forEach(function (panel, tab) {
            tab.selected.set(tab.id === id);
            panel.hidden.set(tab.id !== id);
        });
    };
    return TabsComponent;
}(Component_1.default));
exports.default = TabsComponent;
