import ARIAAttribute from '../states/ARIAAttribute';
import InteractiveNode from './InteractiveNode';
/**
 * Abstract Accessible Element Wrapper Class
 *
 * @class AccessibleElement
 * @version 1.0.0
 * @since 1.0.0
 * @template E DOM Element Interface
 *
 */
export default abstract class AccessibleElement<E extends Element = Element> extends InteractiveNode<E> {
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
    readonly atomic: ARIAAttribute<"aria-atomic">;
    /**
     * `aria-busy`
     *
     * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-busy
     *
     * > Indicates whether an element, and its subtree, are currently being updated.
     * >
     * > The default is that aria-busy is false. If authors know that multiple parts of the same element need to be loaded or modified, they can set aria-busy to true when the first part is loaded, and then set aria-busy to false when the last part is loaded. When a widget is missing required owned elements due to script execution or loading, authors MUST mark a containing element with aria-busy equal to true. For example, until a page is fully initialized and complete, an author could mark the document element as busy. If there is an error updating the element, author MAY set the aria-invalid attribute to true.
     */
    readonly busy: ARIAAttribute<"aria-busy">;
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
    readonly controls: ARIAAttribute<"aria-controls">;
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
    readonly describedBy: ARIAAttribute<"aria-describedby">;
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
    readonly disabled: ARIAAttribute<"aria-disabled">;
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
    readonly dropEffect: ARIAAttribute<"aria-dropeffect">;
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
    readonly flowTo: ARIAAttribute<"aria-flowto">;
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
    readonly grabbed: ARIAAttribute<"aria-grabbed">;
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
    readonly hasPopup: ARIAAttribute<"aria-haspopup">;
    /**
     * `aria-hidden`
     *
     * @see https://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
     *
     * > Indicates that the element and all of its descendants are not visible or perceivable to any user as implemented by the author. See related aria-disabled.
     * >
     * > If an element is only visible after some user action, authors MUST set the aria-hidden attribute to true. When the element is presented, authors MUST set the aria-hidden attribute to false or remove the attribute, indicating that the element is visible. Some assistive technologies access WAI-ARIA information directly through the DOM and not through platform accessibility supported by the browser. Authors MUST set aria-hidden="true" on content that is not displayed, regardless of the mechanism used to hide it. This allows assistive technologies or user agents to properly skip hidden elements in the document.
     */
    readonly hidden: ARIAAttribute<"aria-hidden">;
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
    readonly invalid: ARIAAttribute<"aria-invalid">;
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
    readonly label: ARIAAttribute<"aria-label">;
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
    readonly labelledBy: ARIAAttribute<"aria-labelledby">;
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
    readonly live: ARIAAttribute<"aria-live">;
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
    readonly owns: ARIAAttribute<"aria-owns">;
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
    readonly relevant: ARIAAttribute<"aria-relevant">;
    /**
     * Abstract Accessible Element Wrapper Class
     *
     * @version 1.0.0
     * @since 1.0.0
     * @param el Assigned DOM Element
     * @template E DOM Element Interface
     *
     */
    constructor(el: E);
}
