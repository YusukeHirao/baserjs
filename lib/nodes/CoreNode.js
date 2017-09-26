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
var createUID_1 = require("../utils/createUID");
var EventDispatcher_1 = require("./EventDispatcher");
var elements = new WeakMap();
var detachedChildren = new WeakMap();
/**
 * Abstract DOM Element Wrapper Class
 *
 * @class CoreNode
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
var CoreNode = /** @class */ (function (_super) {
    __extends(CoreNode, _super);
    /**
     * Abstract DOM Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function CoreNode(el) {
        var _this = _super.call(this) || this;
        if (!(el instanceof Element)) {
            throw new TypeError("A argument is not Element.");
        }
        /**
         * `this.el` is readonly
         *
         * Virtual `this.el = el`;
         */
        elements.set(_this, el);
        // id属性の抽出 & 生成
        if (el.id) {
            _this._id = el.id;
        }
        else {
            _this._id = createUID_1.default();
            el.id = _this._id;
        }
        var mo = new MutationObserver(function (mutations, observer) { return _this._onMutateAttributes(mutations, observer); });
        mo.observe(_this._el, { attributes: true });
        return _this;
    }
    Object.defineProperty(CoreNode.prototype, "id", {
        get: function () {
            return this._id;
        },
        /**
         * DOM ID attribute
         *
         * @api DOM access
         * @version 1.0.0
         * @since 1.0.0
         */
        set: function (id) {
            if (this._id !== id) {
                var isExist = !!document.getElementById(id);
                if (isExist) {
                    throw new Error("ID \"" + id + "\" was existing.");
                }
                this._id = id;
                this._el.id = id;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * add class
     *
     * @api DOM access
     * @version 1.0.0
     * @since 1.0.0
     *
     */
    CoreNode.prototype.addClass = function (classNames) {
        (_a = this._el.classList).add.apply(_a, classNames);
        return this;
        var _a;
    };
    /**
     * remove class
     *
     * @api DOM access
     * @version 1.0.0
     * @since 1.0.0
     *
     */
    CoreNode.prototype.removeClass = function (classNames) {
        (_a = this._el.classList).remove.apply(_a, classNames);
        return this;
        var _a;
    };
    /**
     * is class contained?
     *
     * @api DOM access
     * @version 1.0.0
     * @since 1.0.0
     *
     */
    CoreNode.prototype.hasClass = function (className) {
        return this._el.classList.contains(className);
    };
    /**
     * Set value to attribute
     *
     * @api DOM access
     * @param attrName Attribute name
     * @param value Attribute value
     */
    CoreNode.prototype.setAttr = function (attrName, value) {
        this._el.setAttribute(attrName, value);
    };
    /**
     * Get value from attribute
     *
     * @api DOM access
     * @param attrName Attribute name
     */
    CoreNode.prototype.getAttr = function (attrName) {
        return this._el.getAttribute(attrName);
    };
    /**
     * Remove attribute
     *
     * @api DOM access
     * @param attrName Attribute name
     */
    CoreNode.prototype.removeAttr = function (attrName) {
        return this._el.removeAttribute(attrName);
    };
    /**
     * Get Descendant elemtns
     *
     * @api DOM access
     * @param selector match selector
     */
    CoreNode.prototype.find = function (selector) {
        return this._el.querySelectorAll(selector);
    };
    /**
     * Callback on mutated attributes
     *
     * @param mutations Mutated record list
     * @param observer Mutation observer
     */
    CoreNode.prototype._onMutateAttributes = function (mutations, observer) {
        if (mutations && mutations.length) {
            for (var _i = 0, mutations_1 = mutations; _i < mutations_1.length; _i++) {
                var mutation = mutations_1[_i];
                if (mutation.type === 'attributes' && mutation.attributeName) {
                    this.trigger(mutation.attributeName, [this._el.getAttribute(mutation.attributeName)]);
                }
            }
        }
    };
    Object.defineProperty(CoreNode.prototype, "_el", {
        /**
         * Assigned DOM Element
         *
         * @readonly
         */
        get: function () {
            return elements.get(this);
        },
        enumerable: true,
        configurable: true
    });
    return CoreNode;
}(EventDispatcher_1.default));
exports.default = CoreNode;
