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
var BaserElement_1 = require("./BaserElement");
var Sequencer_1 = require("./Sequencer");
var panelGroupDOMElements = new WeakMap();
var Slideshow = /** @class */ (function (_super) {
    __extends(Slideshow, _super);
    function Slideshow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Slideshow.prototype.x = function (i) {
        this._seq.skipTo(i);
    };
    Object.defineProperty(Slideshow.prototype, "length", {
        get: function () {
            return this._seq.length;
        },
        enumerable: true,
        configurable: true
    });
    Slideshow.prototype._create = function () {
        _super.prototype._create.call(this, {
            speed: 400,
            wait: 800,
            repeat: false,
            autoPlay: false,
        });
        this._init(this.el);
    };
    Slideshow.prototype._init = function (el) {
        // Extracting resources & loading
        var imgs = el.querySelectorAll('img');
        var imgLoadPromises = [];
        for (var _i = 0, _a = Array.from(imgs); _i < _a.length; _i++) {
            var img = _a[_i];
            imgLoadPromises.push(imageLoader(img.src));
        }
        Promise.all(imgLoadPromises).then(this._loaded.bind(this));
        this._createDOM();
    };
    Slideshow.prototype._loaded = function () {
        this.el.setAttribute('data-slideshow-loaded', 'true');
    };
    Slideshow.prototype._createDOM = function () {
        var el = this.el;
        var g = el.firstElementChild;
        if (!g) {
            throw new Error('Invalid HTML Architecture of "Gallery" type.');
        }
        el.setAttribute('data-slideshow-loaded', 'false');
        el.setAttribute('aria-live', 'polite');
        panelGroupDOMElements.set(this, g);
        var panelEls = Array.from(g.children);
        var panels = [];
        for (var i = 0, l = panelEls.length; i < l; i++) {
            var panelEl = panelEls[i];
            panelEl.setAttribute('tabindex', '-1');
            var panel = new SlideshowPanel(panelEl);
            panels.push(panel);
            panel.appendTo(g);
            panel.hidden = i === 0;
        }
        this._setPanels(panels);
    };
    Slideshow.prototype._setPanels = function (panels) {
        this._seq = new Sequencer_1.default(panels, this._config.wait);
        this._seq
            .repeat(this._config.repeat != null)
            .onContinue(function (progress) {
            if (progress.list) {
                for (var _i = 0, _a = progress.list; _i < _a.length; _i++) {
                    var item = _a[_i];
                    item.position = 'prev';
                    item.hidden = true;
                }
            }
            progress.current.position = 'current';
            progress.current.hidden = true;
            if (progress.next) {
                progress.next.position = 'next';
                progress.next.hidden = false;
            }
        })
            .onStopped(function (progress) {
            console.log("stop: " + progress.index);
            if (progress.list) {
                for (var i = 0, l = progress.list.length; i < l; i++) {
                    var item = progress.list[i];
                    if (i === progress.index) {
                        item.position = 'current';
                        item.hidden = false;
                    }
                    else {
                        item.position = 'prev';
                        item.hidden = true;
                    }
                }
            }
        });
        if (this._config.autoPlay != null) {
            this._seq.start();
        }
    };
    return Slideshow;
}(BaserElement_1.default));
exports.default = Slideshow;
function imageLoader(imgPath) {
    return new Promise(function (resolve) {
        var img = new Image();
        img.onload = function () {
            resolve(img.src);
        };
        img.src = imgPath;
    });
}
function typeCasting(dataset) {
    var result = {};
    for (var prop in dataset) {
        if (prop in dataset) {
            var value = dataset[prop];
            if (value == null) {
                continue;
            }
            else if (value === 'true') {
                result[prop] = true;
            }
            else if (value === 'false') {
                result[prop] = false;
            }
            else if (!isNaN(parseFloat(value))) {
                result[prop] = +value;
            }
            else {
                result[prop] = value;
            }
        }
    }
    return result;
}
var panelDOMElements = new WeakMap();
var SlideshowPanel = /** @class */ (function () {
    function SlideshowPanel(el) {
        this._position = null;
        panelDOMElements.set(this, el);
        el.setAttribute('role', 'img');
        this.hidden = true;
    }
    SlideshowPanel.prototype.appendTo = function (g) {
        g.appendChild(panelDOMElements.get(this));
    };
    Object.defineProperty(SlideshowPanel.prototype, "position", {
        set: function (position) {
            this._position = position;
            var el = panelDOMElements.get(this);
            if (position) {
                el.setAttribute('data-slideshow-item-position', position);
            }
            else {
                el.removeAttribute('data-slideshow-item-position');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideshowPanel.prototype, "hidden", {
        set: function (hidden) {
            if (this._hidden !== hidden) {
                var el = panelDOMElements.get(this);
                el.setAttribute('aria-hidden', "" + hidden);
                this._hidden = hidden;
            }
        },
        enumerable: true,
        configurable: true
    });
    return SlideshowPanel;
}());
