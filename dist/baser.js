/**!
	* baserjs - v1.0.0-beta.0
	* revision: cbfd8c9043022b11e3586462d089935b55d041cf
	* update: 2017-09-26
	* Author: baserCMS Users Community [https://github.com/baserproject/]
	* Github: https://github.com/baserproject/baserjs
	* License: Licensed under the MIT License
	*/

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var relation = {
    'aria-atomic': 'boolean',
    'aria-busy': 'boolean',
    'aria-controls': 'idReferenceList',
    'aria-describedby': 'idReferenceList',
    'aria-disabled': 'boolean',
    'aria-dropeffect': 'ariaDropeffectTokenList',
    'aria-flowto': 'idReferenceList',
    'aria-grabbed': 'optionalBoolean',
    'aria-haspopup': 'boolean',
    'aria-hidden': 'boolean',
    'aria-invalid': 'ariaInvalidToken',
    'aria-label': 'string',
    'aria-labelledby': 'idReferenceList',
    'aria-live': 'ariaLiveToken',
    'aria-owns': 'idReferenceList',
    'aria-relevant': 'ariaRelevantTokenList',
    'aria-pressed': 'tristate',
    'aria-expanded': 'optionalBoolean',
    'aria-selected': 'optionalBoolean',
    'aria-activedescendant': 'idReference',
};
var defaultValues = {
    'aria-atomic': false,
    'aria-busy': false,
    'aria-controls': [],
    'aria-describedby': [],
    'aria-disabled': false,
    'aria-dropeffect': new Set(['none']),
    'aria-flowto': [],
    'aria-grabbed': undefined,
    'aria-haspopup': false,
    'aria-hidden': false,
    'aria-invalid': false,
    'aria-label': '',
    'aria-labelledby': [],
    'aria-live': 'off',
    'aria-owns': [],
    'aria-relevant': new Set(['additions', 'text']),
    'aria-pressed': undefined,
    'aria-expanded': undefined,
    'aria-selected': undefined,
    'aria-activedescendant': '',
};
var optimizer = {
    boolean: function (v) {
        return v === 'true' ? true : v === 'false' ? false : !!v;
    },
    tristate: function (v) {
        if (v === 'mixed') {
            return v;
        }
        return optimizer.boolean(v);
    },
    optionalBoolean: function (v) {
        if (v == null) {
            return;
        }
        return optimizer.boolean(v);
    },
    idReference: function (v) {
        return optimizer.string(v);
    },
    idReferenceList: function (v) {
        if (Array.isArray(v)) {
            return v.map(function (i) { return optimizer.idReference(i); });
        }
        return optimizer.idReference(v).split(/\s+/g).map(function (i) { return optimizer.idReference(i); });
    },
    string: function (v) {
        return ("" + v).trim();
    },
    ariaDropeffectTokenList: function (v) {
        if (v instanceof Set) {
            v = Array.from(v).slice();
        }
        var a = Array.isArray(v) ? v : ("" + v).split(/\s+/g);
        var list = ['copy', 'move', 'link', 'execute', 'popup', 'none'];
        var values = a.map(function (val) { return list.includes("" + val) ? "" + val : ''; }).filter(function (val) { return val; });
        return new Set(values);
    },
    ariaInvalidToken: function (v) {
        switch (v) {
            case 'grammar':
            case 'spelling':
                return v;
        }
        return !!v;
    },
    ariaLiveToken: function (v) {
        switch (v) {
            case 'polite':
            case 'assertive':
                return v;
        }
        return 'off';
    },
    ariaRelevantTokenList: function (v) {
        if (v instanceof Set) {
            v = Array.from(v).slice();
        }
        var a = Array.isArray(v) ? v : ("" + v).split(/\s+/g);
        var list = ['additions', 'removals', 'text', 'all'];
        var values = a.map(function (val) { return list.includes("" + val) ? "" + val : ''; }).filter(function (val) { return val; });
        return new Set(values);
    },
};
var ARIAAttribute = /** @class */ (function () {
    function ARIAAttribute(owner, attrName) {
        this._owner = owner;
        this._name = attrName;
        this.set(this._owner.getAttr(this._name) || defaultValues[this._name]);
    }
    ARIAAttribute.prototype.set = function (value) {
        this._value = this.optimize(value);
        var attrValue = this.toString();
        if (attrValue === '') {
            this._owner.removeAttr(this._name);
        }
        else {
            this._owner.setAttr(this._name, attrValue);
        }
    };
    ARIAAttribute.prototype.get = function () {
        return this._value;
    };
    ARIAAttribute.prototype.optimize = function (value) {
        return optimizer[relation[this._name]](value);
    };
    ARIAAttribute.prototype.toString = function () {
        var v = this._value;
        if (v instanceof Set) {
            v = Array.from(v).slice();
        }
        if (Array.isArray(v)) {
            return v.join(' ');
        }
        if (v == null) {
            return '';
        }
        return "" + v;
    };
    return ARIAAttribute;
}());
exports.default = ARIAAttribute;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
var ARIAAttribute_1 = __webpack_require__(0);
var InteractiveNode_1 = __webpack_require__(2);
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
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-atomic
         *
         * > Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. See related aria-relevant.
         * >
         * > Both accessibility APIs and the Document Object Model [DOM] provide events to allow the assistive technologies to determine changed areas of the document.
         * >
         * > When the content of a live region changes, user agents SHOULD examine the changed element and traverse the ancestors to find the first element with aria-atomic set, and apply the appropriate behavior for the cases below.
         * >
         * > 1. If none of the ancestors have explicitly set aria-atomic, the default is that aria-atomic is false, and assistive technologies will only present the changed node to the user.
         * > 2. If aria-atomic is explicitly set to false, assistive technologies will stop searching up the ancestor chain and present only the changed node to the user.
         * > 3. If aria-atomic is explicitly set to true, assistive technologies will present the entire contents of the element.
         * >
         * > When aria-atomic is true, assistive technologies MAY choose to combine several changes and present the entire changed region at once.
         */
        _this.atomic = new ARIAAttribute_1.default(_this, 'aria-atomic');
        /**
         * `aria-busy`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-busy
         *
         * > Indicates whether an element, and its subtree, are currently being updated.
         * >
         * > The default is that aria-busy is false. If authors know that multiple parts of the same element need to be loaded or modified, they can set aria-busy to true when the first part is loaded, and then set aria-busy to false when the last part is loaded. When a widget is missing required owned elements due to script execution or loading, authors MUST mark a containing element with aria-busy equal to true. For example, until a page is fully initialized and complete, an author could mark the document element as busy. If there is an error updating the element, author MAY set the aria-invalid attribute to true.
         */
        _this.busy = new ARIAAttribute_1.default(_this, 'aria-busy');
        /**
         * `aria-controls`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-controls
         *
         * > Identifies the element (or elements) whose contents or presence are controlled by the current element. See related aria-owns.
         * >
         * > For example:
         * > - A table of contents tree view may control the content of a neighboring document pane.
         * > - A group of checkboxes may control what commodity prices are tracked live in a table or graph.
         * > - A tab controls the display of its associated tab panel.
         */
        _this.controls = new ARIAAttribute_1.default(_this, 'aria-controls');
        /**
         * `aria-describedby`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-describedby
         *
         * > Identifies the element (or elements) that describes the object. See related aria-labelledby.
         * >
         * > The aria-labelledby attribute is similar to aria-describedby in that both reference other elements to calculate a text alternative, but a label should be concise, where a description is intended to provide more verbose information.
         * >
         * > The element or elements referenced by the aria-describedby comprise the entire description. Include ID references to multiple elements if necessary, or enclose a set of elements (e.g., paragraphs) with the element referenced by the ID.
         */
        _this.describedBy = new ARIAAttribute_1.default(_this, 'aria-describedby');
        /**
         * `aria-disabled`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-describedby
         *
         * > Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable. See related aria-hidden and aria-readonly.
         * >
         * > For example, irrelevant options in a radio group may be disabled. Disabled elements might not receive focus from the tab order. For some disabled elements, applications might choose not to support navigation to descendants. In addition to setting the aria-disabled attribute, authors SHOULD change the appearance (grayed out, etc.) to indicate that the item has been disabled.
         * >
         * > The state of being disabled applies to the current element and all focusable descendant elements of the element on which the aria-disabled attribute is applied.
         */
        _this.disabled = new ARIAAttribute_1.default(_this, 'aria-disabled');
        /**
         * `aria-dropeffect`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-dropeffect
         *
         * > Indicates what functions can be performed when the dragged object is released on the drop target. This allows assistive technologies to convey the possible drag options available to users, including whether a pop-up menu of choices is provided by the application. Typically, drop effect functions can only be provided once an object has been grabbed for a drag operation as the drop effect functions available are dependent on the object being dragged.
         * >
         * > More than one drop effect may be supported for a given element. Therefore, the value of this attribute is a space-delimited set of tokens indicating the possible effects, or none if there is no supported operation. In addition to setting the aria-dropeffect attribute, authors SHOULD show a visual indication of potential drop targets.
         * >
         * > |Value|Description
         * > |---|---
         * > |`copy`|A duplicate of the source object will be dropped into the target.
         * > |`move`|The source object will be removed from its current location and dropped into the target.
         * > |`link`|A reference or shortcut to the dragged object will be created in the target object.
         * > |`execute`|A function supported by the drop target is executed, using the drag source as an input.
         * > |`popup`|There is a popup menu or dialog that allows the user to choose one of the drag operations (copy, move, link, execute) and any other drag functionality, such as cancel.
         * > |`none` (default)|No operation can be performed; effectively cancels the drag operation if an attempt is made to drop on this object. Ignored if combined with any other token value. e.g. 'none copy' is equivalent to a 'copy' value.
         */
        _this.dropEffect = new ARIAAttribute_1.default(_this, 'aria-dropeffect');
        /**
         * `aria-flowto`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-flowto
         *
         * > Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion, allows assistive technology to override the general default of reading in document source order.
         * >
         * > When aria-flowto has a single IDREF, it allows assistive technologies to, at the user's request, forego normal document reading order and go to the targeted object. However, when aria-flowto is provided with multiple IDREFS, assistive technologies SHOULD present the referenced elements as path choices.
         * >
         * > In the case of one or more IDREFS, user agents or assistive technologies SHOULD give the user the option of navigating to any of the targeted elements. The name of the path can be determined by the name of the target element of the aria-flowto attribute. Accessibility APIs can provide named path relationships.
         */
        _this.flowTo = new ARIAAttribute_1.default(_this, 'aria-flowto');
        /**
         * `aria-grabbed`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-grabbed
         *
         * > Indicates an element's "grabbed" state in a drag-and-drop operation.
         * >
         * > When it is set to true it has been selected for dragging, false indicates that the element can be grabbed for a drag-and-drop operation, but is not currently grabbed, and undefined (or no value) indicates the element cannot be grabbed (default).
         * >
         * > When aria-grabbed is set to true, authors SHOULD update the aria-dropeffect attribute of all potential drop targets. When an element is not grabbed (the value is set to false, undefined, or the attribute is removed), authors SHOULD revert the aria-dropeffect attributes of the associated drop targets to none.
         */
        _this.grabbed = new ARIAAttribute_1.default(_this, 'aria-grabbed');
        /**
         * `aria-haspopup`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-haspopup
         *
         * > Indicates that the element has a popup context menu or sub-level menu.
         * >
         * > This means that activation renders conditional content. Note that ordinary tooltips are not considered popups in this context.
         * >
         * > A popup is generally presented visually as a group of items that appears to be on top of the main page content.
         */
        _this.hasPopup = new ARIAAttribute_1.default(_this, 'aria-haspopup');
        /**
         * `aria-hidden`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
         *
         * > Indicates that the element and all of its descendants are not visible or perceivable to any user as implemented by the author. See related aria-disabled.
         * >
         * > If an element is only visible after some user action, authors MUST set the aria-hidden attribute to true. When the element is presented, authors MUST set the aria-hidden attribute to false or remove the attribute, indicating that the element is visible. Some assistive technologies access WAI-ARIA information directly through the DOM and not through platform accessibility supported by the browser. Authors MUST set aria-hidden="true" on content that is not displayed, regardless of the mechanism used to hide it. This allows assistive technologies or user agents to properly skip hidden elements in the document.
         */
        _this.hidden = new ARIAAttribute_1.default(_this, 'aria-hidden');
        /**
         * `aria-invalid`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-invalid
         *
         * > Indicates the entered value does not conform to the format expected by the application.
         * >
         * > If the value is computed to be invalid or out-of-range, the application author SHOULD set this attribute to true. User agents SHOULD inform the user of the error. Application authors SHOULD provide suggestions for corrections if they are known. Authors MAY prevent form submission when an associated form element has its aria-invalid attribute set to true.
         * >
         * > When the user attempts to submit data involving a field for which aria-required is true, authors MAY use the aria-invalid attribute to signal there is an error. However, if the user has not attempted to submit the form, authors SHOULD NOT set the aria-invalid attribute on required widgets simply because the user has not yet entered data.
         * >
         * > For future expansion, the aria-invalid attribute is an enumerated type. Any value not recognized in the list of allowed values MUST be treated by user agents as if the value true had been provided. If the attribute is not present, or its value is false, or its value is an empty string, the default value of false applies.
         * >
         * > |Value|Description
         * > |---|---
         * > |`grammar`|A grammatical error was detected.
         * > |`false` (default)|There are no detected errors in the value.
         * > |`spelling`|A spelling error was detected.
         * > |`true`|The value entered by the user has failed validation.
         */
        _this.invalid = new ARIAAttribute_1.default(_this, 'aria-invalid');
        /**
         * `aria-label`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-label
         *
         * > Defines a string value that labels the current element. See related aria-labelledby.
         * >
         * > The purpose of aria-label is the same as that of aria-labelledby. It provides the user with a recognizable name of the object. The most common accessibility API mapping for a label is the accessible name property.
         * >
         * > If the label text is visible on screen, authors SHOULD use aria-labelledby and SHOULD NOT use aria-label. There may be instances where the name of an element cannot be determined programmatically from the content of the element, and there are cases where providing a visible label is not the desired user experience. Most host languages provide an attribute that could be used to name the element (e.g., the title attribute in HTML [HTML]), yet this could present a browser tooltip. In the cases where a visible label or visible tooltip is undesirable, authors MAY set the accessible name of the element using aria-label. As required by the text alternative computation, user agents give precedence to aria-labelledby over aria-label when computing the accessible name property.
         */
        _this.label = new ARIAAttribute_1.default(_this, 'aria-label');
        /**
         * `aria-labelledby`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby
         *
         * > Identifies the element (or elements) that labels the current element. See related aria-label and aria-describedby.
         * >
         * > The purpose of aria-labelledby is the same as that of aria-label. It provides the user with a recognizable name of the object. The most common accessibility API mapping for a label is the accessible name property.
         * >
         * > If the label text is visible on screen, authors SHOULD use aria-labelledby and SHOULD NOT use aria-label. Use aria-label only if the interface is such that it is not possible to have a visible label on the screen. As required by the text alternative computation, user agents give precedence to aria-labelledby over aria-label when computing the accessible name property.
         */
        _this.labelledBy = new ARIAAttribute_1.default(_this, 'aria-labelledby');
        /**
         * `aria-live`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-live
         *
         * > Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region.
         * >
         * > The values of this attribute are expressed in degrees of importance. When regions are specified as polite, assistive technologies will notify users of updates but generally do not interrupt the current task, and updates take low priority. When regions are specified as assertive, assistive technologies will immediately notify the user, and could potentially clear the speech queue of previous updates. Please refer to Live Region Properties and How to Use Them ([ARIA-PRACTICES], Section 5.2.1).
         * >
         * > |Value|Description
         * > |---|---
         * > |`off` (default)|Updates to the region will not be presented to the user unless the assistive technology is currently focused on that region.
         * > |`polite`|(Background change) Assistive technologies SHOULD announce updates at the next graceful opportunity, such as at the end of speaking the current sentence or when the user pauses typing.
         * > |`assertive`|This information has the highest priority and assistive technologies SHOULD notify the user immediately. Because an interruption may disorient users or cause them to not complete their current task, authors SHOULD NOT use the assertive value unless the interruption is imperative.
         */
        _this.live = new ARIAAttribute_1.default(_this, 'aria-live');
        /**
         * `aria-owns`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-owns
         *
         * > Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship between DOM elements where the DOM hierarchy cannot be used to represent the relationship. See related aria-controls.
         * >
         * > The value of the aria-owns attribute is a space-separated list of IDREFS that reference one or more elements in the document by ID. The reason for adding aria-owns is to expose a parent/child contextual relationship to assistive technologies that is otherwise impossible to infer from the DOM.
         * >
         * > Authors SHOULD NOT use aria-owns as a replacement for the DOM hierarchy. If the relationship is represented in the DOM, do not use aria-owns. Authors MUST ensure that an element's ID is not specified in more than one other element's aria-owns attribute at any time. In other words, an element can have only one explicit owner.
         */
        _this.owns = new ARIAAttribute_1.default(_this, 'aria-owns');
        /**
         * `aria-relevant`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-relevant
         *
         * > Indicates what user agent change notifications (additions, removals, etc.) assistive technologies will receive within a live region. See related aria-atomic.
         * >
         * > The attribute is represented as a space delimited list of the following values: additions, removals, text; or a single catch-all value all.
         * >
         * > |Value|Description
         * > |---|---
         * > |`additions`|Element nodes are added to the DOM within the live region.
         * > |`removals`|Text or element nodes within the live region are removed from the DOM.
         * > |`text`|Text is added to any DOM descendant nodes of the live region.
         * > |`all`|Equivalent to the combination of all values, "additions removals text".
         * > |`additions text` (default)|Equivalent to the combination of values, "additions text".
         */
        _this.relevant = new ARIAAttribute_1.default(_this, 'aria-relevant');
        return _this;
    }
    return AccessibleElement;
}(InteractiveNode_1.default));
exports.default = AccessibleElement;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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
var CoreNode_1 = __webpack_require__(3);
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
        return _super.call(this, el) || this;
    }
    return InteractiveNode;
}(CoreNode_1.default));
exports.default = InteractiveNode;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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
var createUID_1 = __webpack_require__(10);
var EventDispatcher_1 = __webpack_require__(4);
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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DispatchEvent_1 = __webpack_require__(11);
var EventHandler_1 = __webpack_require__(12);
/**
 * イベントを検知してハンドラを発火させることができるクラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 * ```
 * let dispatcher = new EventDispatcher();
 *
 * dispatcher.on('event', (e) -> {
 * 	// handler
 * });
 *
 * dispatcher.trigger('event');
 * ```
 *
 */
var EventDispatcher = /** @class */ (function () {
    /**
     * コンストラクタ
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    function EventDispatcher() {
        // void
    }
    /**
     * イベントハンドラを登録する
     *
     * @version 0.9.0
     * @since 0.0.10
     * @param type イベントのタイプ（複数可）
     * @param handler
     * @return インスタンス自身
     *
     */
    EventDispatcher.prototype.on = function (types, handler) {
        var typeList = typeof types === 'string' ? types.split(/\s+/g) : types;
        for (var _i = 0, typeList_1 = typeList; _i < typeList_1.length; _i++) {
            var type = typeList_1[_i];
            var eventHandler = new EventHandler_1.default(this, type, handler);
            EventDispatcher.eventHandlers[eventHandler.id] = eventHandler;
            if (!EventDispatcher.types[type]) {
                EventDispatcher.types[type] = [];
            }
            EventDispatcher.types[type].push(eventHandler);
        }
        return this;
    };
    /**
     * イベントハンドラを削除する
     *
     * @version 1.0.0
     * @since 0.0.10
     * @param type イベントのタイプ（複数可）
     * @return インスタンス自身
     *
     */
    EventDispatcher.prototype.off = function (types) {
        var typeList = typeof types === 'string' ? types.split(/\s+/g) : types;
        for (var _i = 0, typeList_2 = typeList; _i < typeList_2.length; _i++) {
            var type = typeList_2[_i];
            delete EventDispatcher.types[type];
        }
        return this;
    };
    /**
     * イベントハンドラを発火させる
     *
     * @version 1.0.0
     * @since 0.0.10
     * @param type イベントのタイプ
     * @param args イベントハンドラに渡す引数
     * @param context イベントハンドラのコンテキスト
     * @return インスタンス自身
     *
     */
    EventDispatcher.prototype.trigger = function (type, args, context) {
        if (args === void 0) { args = []; }
        context = context || this;
        var typeName;
        var e;
        if (typeof type === 'string') {
            typeName = type;
            e = new DispatchEvent_1.default(type);
        }
        else {
            e = type;
            typeName = e.type;
        }
        if (EventDispatcher.types[typeName]) {
            // sliceをつかってオブジェクトのコピーを渡し参照を切る
            var handlers = EventDispatcher.types[typeName].slice();
            while (handlers.length) {
                var eventHandler = handlers.shift();
                if (eventHandler && eventHandler.context === this) {
                    var isCancel = eventHandler.fire(context, e, args);
                    if (isCancel) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                    // イベントの伝達抑制状態であればループ抜けて以降の処理を行わない
                    if (e.isImmediatePropagationStopped()) {
                        break;
                    }
                }
            }
        }
        return this;
    };
    /**
     * イベント駆動できるクラス
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    EventDispatcher.eventHandlers = {}; // tslint:disable-line:no-any
    /**
     * イベント駆動できるクラス
     *
     * @version 0.7.0
     * @since 0.7.0
     *
     */
    EventDispatcher.types = {}; // tslint:disable-line:no-any
    return EventDispatcher;
}());
exports.default = EventDispatcher;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

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
var WidgetElement_1 = __webpack_require__(6);
/**
 * Abstract Command Element Wrapper Class
 *
 * @class CommandElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
var CommandElement = /** @class */ (function (_super) {
    __extends(CommandElement, _super);
    /**
     * Abstract Command Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function CommandElement(el) {
        return _super.call(this, el) || this;
    }
    return CommandElement;
}(WidgetElement_1.default));
exports.default = CommandElement;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

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
var AccessibleElement_1 = __webpack_require__(1);
/**
 * Abstract Widget Element Wrapper Class
 *
 * @class WidgetElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
var WidgetElement = /** @class */ (function (_super) {
    __extends(WidgetElement, _super);
    /**
     * Abstract Widget Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function WidgetElement(el) {
        return _super.call(this, el) || this;
    }
    return WidgetElement;
}(AccessibleElement_1.default));
exports.default = WidgetElement;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

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
var AccessibleElement_1 = __webpack_require__(1);
/**
 * Abstract Structure Element Wrapper Class
 *
 * @class StructureElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
var StructureElement = /** @class */ (function (_super) {
    __extends(StructureElement, _super);
    /**
     * Abstract Structure Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function StructureElement(el) {
        return _super.call(this, el) || this;
    }
    return StructureElement;
}(AccessibleElement_1.default));
exports.default = StructureElement;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var baser = __webpack_require__(9);
window.baser = baser;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var AccessibleElement_1 = __webpack_require__(1);
var ButtonElement_1 = __webpack_require__(14);
var CommandElement_1 = __webpack_require__(5);
var CoreNode_1 = __webpack_require__(3);
var EventDispatcher_1 = __webpack_require__(4);
var InteractiveNode_1 = __webpack_require__(2);
var TabsComponent_1 = __webpack_require__(15);
var WidgetElement_1 = __webpack_require__(6);
exports.AccessibleElement = AccessibleElement_1.default;
exports.ButtonElement = ButtonElement_1.default;
exports.CommandElement = CommandElement_1.default;
exports.CoreNode = CoreNode_1.default;
exports.EventDispatcher = EventDispatcher_1.default;
exports.InteractiveNode = InteractiveNode_1.default;
exports.WidgetElement = WidgetElement_1.default;
exports.TabsComponent = TabsComponent_1.default;
function auto() {
    return new Promise(function (resolve) {
        if (document.readyState !== 'loading') {
            _auto();
            resolve();
            return;
        }
        addEventListener('DOMContentLoaded', function () {
            _auto();
            resolve();
        });
    });
}
exports.auto = auto;
function _auto() {
    // const nodesGoogleMaps = document.querySelectorAll('[data-baser="google-maps"]');
    // for (const node of Array.from(nodesGoogleMaps)) {
    // 	const g = new GoogleMaps(node as HTMLDivElement);
    // }
    // const nodesYouTube = document.querySelectorAll('[data-baser="youtube"]');
    // for (const node of Array.from(nodesYouTube)) {
    // 	const g = new YouTube(node as HTMLDivElement);
    // }
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ユニークIDを発行する
 *
 * @version 1.0.0
 * @since 0.0.1
 * @param prefix 接頭辞
 * @return ユニークID
 *
 */
function createUID(prefix) {
    if (prefix === void 0) { prefix = 'uid-'; }
    var random = Math.random() * 1e8;
    var seed = new Date().valueOf();
    var uniqueNumber = Math.abs(Math.floor(random + seed));
    return "" + prefix + uniqueNumber.toString(24);
}
exports.default = createUID;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * イベントオブジェクトのクラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 */
var DispatchEvent = /** @class */ (function () {
    /**
     * コンストラクタ
     *
     * @version 0.3.0
     * @since 0.0.10
     *
     */
    function DispatchEvent(type) {
        /**
         * イベントの伝達が止められているかどうか
         *
         * @version 0.0.10
         * @since 0.0.10
         *
         */
        this._isImmediatePropagationStopped = false;
        /**
         * デフォルトのイベントの発火が止められているかどうか
         *
         * @version 0.9.0
         * @since 0.9.0
         *
         */
        this._isDefaultPrevented = false;
        this.type = type;
    }
    /**
     * イベントの伝達を止める
     *
     * @version 0.0.10
     * @since 0.0.10
     *
     */
    DispatchEvent.prototype.stopImmediatePropagation = function () {
        this._isImmediatePropagationStopped = true;
    };
    /**
     * イベントの伝達が止められているかどうか
     *
     * @version 0.0.10
     * @since 0.0.10
     * @return イベントの伝達が止められているかどうか
     *
     */
    DispatchEvent.prototype.isImmediatePropagationStopped = function () {
        return this._isImmediatePropagationStopped;
    };
    /**
     * デフォルトのイベントの発火を止める
     * ※EventDispatcher.triggerでの実装に依る
     *
     * @version 0.9.0
     * @since 0.9.0
     *
     */
    DispatchEvent.prototype.preventDefault = function () {
        this._isDefaultPrevented = true;
    };
    /**
     * デフォルトのイベントの発火が止められているかどうか
     *
     * @version 0.9.0
     * @since 0.9.0
     * @return デフォルトのイベントの発火が止められているかどうか
     *
     */
    DispatchEvent.prototype.isDefaultPrevented = function () {
        return this._isDefaultPrevented;
    };
    return DispatchEvent;
}());
exports.default = DispatchEvent;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var createUID_1 = __webpack_require__(13);
/**
 * イベントハンドラのラッパークラス
 *
 * @version 0.9.0
 * @since 0.0.10
 *
 */
var EventHandler = /** @class */ (function () {
    /**
     * ハンドラ
     *
     * @version 1.0.0
     * @since 0.0.10
     * @param context 紐づくディスパッチャーオブジェクト
     * @param type イベントのタイプ
     * @param handler ハンドラ
     */
    function EventHandler(context, type, handler) {
        this.context = context;
        this.id = createUID_1.default();
        this.type = type;
        this._handler = handler;
    }
    /**
     * ハンドラを実行する
     *
     * @version 1.0.0
     * @since 0.0.10
     * @param context 紐づくディスパッチャーオブジェクト
     * @param type イベントのタイプ
     * @param handler ハンドラ
     * @return イベントの伝達を止めるかどうか
     */
    EventHandler.prototype.fire = function (context, e, args) {
        var applyArgs = [];
        applyArgs.push(e);
        applyArgs = applyArgs.concat(args);
        var handlerReturn = this._handler.apply(context, applyArgs);
        return handlerReturn !== undefined && !handlerReturn;
    };
    return EventHandler;
}());
exports.default = EventHandler;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ユニークIDを発行する
 *
 * @version 1.0.0
 * @since 0.0.1
 * @param prefix 接頭辞
 * @return ユニークID
 *
 */
function createUID(prefix) {
    if (prefix === void 0) { prefix = 'uid-'; }
    var random = Math.random() * 1e8;
    var seed = new Date().valueOf();
    var uniqueNumber = Math.abs(Math.floor(random + seed));
    return "" + prefix + uniqueNumber.toString(24);
}
exports.default = createUID;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

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
var ARIAAttribute_1 = __webpack_require__(0);
var CommandElement_1 = __webpack_require__(5);
/**
 * Button Element Wrapper Class
 *
 * @class ButtonElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
var ButtonElement = /** @class */ (function (_super) {
    __extends(ButtonElement, _super);
    /**
     * Button Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function ButtonElement(el) {
        var _this = _super.call(this, el) || this;
        /**
         * `aria-pressed`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-pressed
         *
         * > Indicates the current "pressed" state of toggle buttons. See related aria-checked and aria-selected.
         * >
         * > Toggle buttons require a full press-and-release cycle to change their value. Activating it once changes the value to true, and activating it another time changes the value back to false. A value of mixed means that the values of more than one item controlled by the button do not all share the same value. Examples of mixed-state buttons are described in WAI-ARIA Authoring Practices [ARIA-PRACTICES]. If the attribute is not present, the button is not a toggle button.
         * >
         * > The aria-pressed attribute is similar but not identical to the aria-checked attribute. Operating systems support pressed on buttons and checked on checkboxes.
         */
        _this.pressed = new ARIAAttribute_1.default(_this, 'aria-pressed');
        /**
         * `aria-expanded`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-expanded
         *
         * > Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.
         * >
         * > For example, this indicates whether a portion of a tree is expanded or collapsed. In other instances, this may be applied to page sections to mark expandable and collapsible regions that are flexible for managing content density. Simplifying the user interface by collapsing sections may improve usability for all, including those with cognitive or developmental disabilities.
         * >
         * > If the element with the aria-expanded attribute controls the expansion of another grouping container that is not 'owned by' the element, the author SHOULD reference the container by using the aria-controls attribute.
         */
        _this.expanded = new ARIAAttribute_1.default(_this, 'aria-expanded');
        return _this;
    }
    return ButtonElement;
}(CommandElement_1.default));
exports.default = ButtonElement;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

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
var StructureError_1 = __webpack_require__(16);
var Component_1 = __webpack_require__(17);
var TabElement_1 = __webpack_require__(18);
var TabListElement_1 = __webpack_require__(20);
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


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

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
var StructureError = /** @class */ (function (_super) {
    __extends(StructureError, _super);
    function StructureError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = _this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(_this, _this.constructor);
        }
        else {
            _this.stack = (new Error(message)).stack;
        }
        return _this;
    }
    return StructureError;
}(Error));
exports.default = StructureError;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

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
var InteractiveNode_1 = __webpack_require__(2);
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


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

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
var ARIAAttribute_1 = __webpack_require__(0);
var SectionHeadElement_1 = __webpack_require__(19);
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


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

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
var ARIAAttribute_1 = __webpack_require__(0);
var StructureElement_1 = __webpack_require__(7);
/**
 * Abstract Section Head Element Wrapper Class
 *
 * @class SectionHeadElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
var SectionHeadElement = /** @class */ (function (_super) {
    __extends(SectionHeadElement, _super);
    /**
     * Abstract Section Head Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function SectionHeadElement(el) {
        var _this = _super.call(this, el) || this;
        /**
         * `aria-expanded`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-expanded
         *
         * > Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.
         * >
         * > For example, this indicates whether a portion of a tree is expanded or collapsed. In other instances, this may be applied to page sections to mark expandable and collapsible regions that are flexible for managing content density. Simplifying the user interface by collapsing sections may improve usability for all, including those with cognitive or developmental disabilities.
         * >
         * > If the element with the aria-expanded attribute controls the expansion of another grouping container that is not 'owned by' the element, the author SHOULD reference the container by using the aria-controls attribute.
         */
        _this.expanded = new ARIAAttribute_1.default(_this, 'aria-expanded');
        return _this;
    }
    return SectionHeadElement;
}(StructureElement_1.default));
exports.default = SectionHeadElement;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

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
var ARIAAttribute_1 = __webpack_require__(0);
var DirectoryElement_1 = __webpack_require__(21);
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


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

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
var ListElement_1 = __webpack_require__(22);
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


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

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
var RegionElement_1 = __webpack_require__(23);
/**
 * List Element Wrapper Class
 *
 * @class ListElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
var ListElement = /** @class */ (function (_super) {
    __extends(ListElement, _super);
    /**
     * List Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function ListElement(el) {
        return _super.call(this, el) || this;
    }
    return ListElement;
}(RegionElement_1.default));
exports.default = ListElement;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

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
var SectionElement_1 = __webpack_require__(24);
/**
 * Region Element Wrapper Class
 *
 * @class RegionElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
var RegionElement = /** @class */ (function (_super) {
    __extends(RegionElement, _super);
    /**
     * Region Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function RegionElement(el) {
        return _super.call(this, el) || this;
    }
    return RegionElement;
}(SectionElement_1.default));
exports.default = RegionElement;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

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
var ARIAAttribute_1 = __webpack_require__(0);
var StructureElement_1 = __webpack_require__(7);
/**
 * Abstract Section Element Wrapper Class
 *
 * @class SectionElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
var SectionElement = /** @class */ (function (_super) {
    __extends(SectionElement, _super);
    /**
     * Abstract Section Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    function SectionElement(el) {
        var _this = _super.call(this, el) || this;
        /**
         * `aria-expanded`
         *
         * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-expanded
         *
         * > Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed.
         * >
         * > For example, this indicates whether a portion of a tree is expanded or collapsed. In other instances, this may be applied to page sections to mark expandable and collapsible regions that are flexible for managing content density. Simplifying the user interface by collapsing sections may improve usability for all, including those with cognitive or developmental disabilities.
         * >
         * > If the element with the aria-expanded attribute controls the expansion of another grouping container that is not 'owned by' the element, the author SHOULD reference the container by using the aria-controls attribute.
         */
        _this.expanded = new ARIAAttribute_1.default(_this, 'aria-expanded');
        return _this;
    }
    return SectionElement;
}(StructureElement_1.default));
exports.default = SectionElement;


/***/ })
/******/ ]);