"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccessibleElement_1 = require("./nodes/AccessibleElement");
var ButtonElement_1 = require("./nodes/ButtonElement");
var CommandElement_1 = require("./nodes/CommandElement");
var CoreNode_1 = require("./nodes/CoreNode");
var EventDispatcher_1 = require("./nodes/EventDispatcher");
var InteractiveNode_1 = require("./nodes/InteractiveNode");
var WidgetElement_1 = require("./nodes/WidgetElement");
exports.AccessibleElement = AccessibleElement_1.default;
exports.ButtonElement = ButtonElement_1.default;
exports.CommandElement = CommandElement_1.default;
exports.CoreNode = CoreNode_1.default;
exports.EventDispatcher = EventDispatcher_1.default;
exports.InteractiveNode = InteractiveNode_1.default;
exports.WidgetElement = WidgetElement_1.default;
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
