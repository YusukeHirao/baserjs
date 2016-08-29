"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Math_1 = require('./Util/Math');
var Timer_1 = require('./Timer');
var Browser_1 = require('./Browser');
var BaserElement_1 = require('./BaserElement');
var AlignedBoxes_1 = require('./AlignedBoxes');
var BackgroundContainer_1 = require('./BackgroundContainer');
var Select_1 = require('./Select');
var Scroll_1 = require('./Scroll');
var GoogleMaps_1 = require('./GoogleMaps');
var YouTube_1 = require('./YouTube');

var JQueryAdapter = function () {
    function JQueryAdapter() {
        _classCallCheck(this, JQueryAdapter);
    }

    _createClass(JQueryAdapter, [{
        key: 'bcBackground',

        /**
         * 自信の要素を基準に、指定の子要素を背景のように扱う
         *
         * TODO: BaserElement化する
         *
         * CSSの`background-size`の`contain`と`cover`の振る舞いに対応
         *
         * 基準も縦横のセンター・上下・左右に指定可能
         *
         * @version 1.0.0
         * @since 0.0.9
         * @param {Object} options オプション
         *
         * * * *
         *
         * ## Sample
         *
         * ### Target HTML
         *
         * ```html
         * <div class="sample" data-id="rb0zOstIiyU" data-width="3840" data-height="2160"></div>
         * ```
         *
         * ### Execute
         *
         * ```js
         * $('.sample').bcYoutube().find('iframe').bcKeepAspectRatio();
         * ```
         *
         * ### Result
         *
         * comming soon...
         *
         */
        value: function bcBackground(options) {
            var self = $(this);
            return self.each(function (i, elem) {
                /* tslint:disable */
                new BackgroundContainer_1.default(elem, options);
                /* tslint:enable */
            });
        }
        /**
         * 要素の高さを揃える
         *
         * @version 0.7.0
         * @since 0.0.15
         *
         */

    }, {
        key: 'bcBoxAlignHeight',
        value: function bcBoxAlignHeight() {
            var columnOrKeyword = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
            var detailTarget = arguments[1];
            var callback = arguments[2];

            var self = $(this);
            if (typeof columnOrKeyword === 'string') {
                var keyword = columnOrKeyword;
                switch (keyword) {
                    case 'destroy':
                        {
                            var boxes = self.data();
                            boxes.destroy();
                        }
                        break;
                    default:
                        {}
                }
            } else {
                (function () {
                    var column = columnOrKeyword;
                    // 要素群の高さを揃え、setsに追加
                    if (detailTarget) {
                        var $detailTarget = self.find(detailTarget);
                        if ($detailTarget.length) {
                            self.each(function () {
                                var $split = $(this).find(detailTarget);
                                /* tslint:disable */
                                new AlignedBoxes_1.default($split[0], column, callback);
                                /* tslint:enable */
                            });
                        }
                    } else {
                        /* tslint:disable */
                        new AlignedBoxes_1.default(self[0], column, callback);
                    }
                })();
            }
            return self;
        }
        // @version 1.0.0
        // @since 0.1.0

    }, {
        key: 'bcBoxLink',
        value: function bcBoxLink() {
            return $(this).on('click', function (e) {
                var $elem = $(this);
                var $link = $elem.find('a, area').eq(0);
                var href = $link.prop('href');
                if ($link.length && href) {
                    var isBlank = $link.prop('target') === '_blank';
                    Browser_1.default.getBrowser().jumpTo(href, isBlank);
                    e.preventDefault();
                }
            });
        }
        /**
         * WAI-ARIAに対応した装飾可能な汎用要素でラップしたセレクトボックスに変更する
         *
         * @version 0.9.2
         * @since 0.0.1
         *
         * * * *
         *
         * ## Sample
         *
         * comming soon...
         *
         */

    }, {
        key: 'bcSelect',
        value: function bcSelect(options) {
            var self = $(this);
            return self.each(function (i, elem) {
                // const $elem: JQuery = $(elem);
                if (typeof options === 'string') {
                    switch (options) {
                        case 'update':
                            {}
                            break;
                        default:
                            {}
                    }
                } else if (elem.nodeName === 'SELECT') {
                    /* tslint:disable */
                    new Select_1.default(elem, options);
                } else if ('console' in window) {
                    console.warn('TypeError: A Node is not HTMLSelectElement');
                }
            });
        }
        /**
         * 要素内の画像の読み込みが完了してからコールバックを実行する
         *
         * @version 0.9.0
         * @since 0.0.9
         *
         * * * *
         *
         * ## Sample
         *
         * comming soon...
         *
         */

    }, {
        key: 'bcImageLoaded',
        value: function bcImageLoaded(success, error) {
            var self = $(this);
            return self.each(function (i, elem) {
                var $elem = $(elem);
                var manifest = [];
                var $imgs = $elem.filter('img').add($elem.find('img'));
                if ($imgs.length) {
                    $imgs.hide();
                    $imgs.each(function () {
                        var loaded = $.Deferred();
                        var img = new Image();
                        img.onload = function () {
                            loaded.resolve();
                            img = null; // GC
                        };
                        img.onabort = img.onerror = function (e) {
                            loaded.reject(e);
                            img = null; // GC
                        };
                        img.src = this.src;
                        manifest.push(loaded.promise());
                    });
                    $.when.apply($, manifest).done(function () {
                        $imgs.show();
                        success.call(elem);
                    }).fail(function (e) {
                        if (error) {
                            error.call(elem, e);
                        }
                    });
                } else {
                    success.call(elem);
                }
            });
        }
        /**
         * 親のコンテナ要素の幅に合わせて、自信の縦横比を保ったまま幅の変更に対応する
         *
         * iframeなどの縦横比を保ちたいが、幅を変更しても高さが変化しない要素などに有効
         *
         * @version 0.0.9
         * @since 0.0.9
         *
         * * * *
         *
         * ## Sample
         *
         * ### Target HTML
         *
         * ```html
         * <div class="sample" data-id="rb0zOstIiyU" data-width="3840" data-height="2160"></div>
         * ```
         *
         * ### Execute
         *
         * ```js
         * $('.sample').bcYoutube().find('iframe').bcKeepAspectRatio();
         * ```
         *
         * ### Result
         *
         * comming soon...
         *
         */

    }, {
        key: 'bcKeepAspectRatio',
        value: function bcKeepAspectRatio() {
            var $w = $(window);
            var self = $(this);
            self.each(function (i, elem) {
                var $elem = $(elem);
                var baseWidth = +$elem.data('width');
                var baseHeight = +$elem.data('height');
                var aspectRatio = baseWidth / baseHeight;
                $w.on('resize', function () {
                    var width = $elem.width();
                    $elem.css({
                        width: '100%',
                        height: width / aspectRatio
                    });
                }).trigger('resize');
            });
            Timer_1.default.wait(30, function () {
                $w.trigger('resize');
            });
            return self;
        }
        /**
         * リンク要素からのアンカーまでスムーズにスクロールをさせる
         *
         * @version 0.1.0
         * @since 0.0.8
         *
         * * * *
         *
         * ## Sample
         *
         * comming soon...
         *
         */

    }, {
        key: 'bcScrollTo',
        value: function bcScrollTo(options) {
            var self = $(this);
            return self.on('click', function (e) {
                var $this = $(this);
                var href = $this.attr('href');
                var scroll = new Scroll_1.default();
                if (href) {
                    // キーワードを一番に優先する
                    if (options && options.keywords && $.isPlainObject(options.keywords)) {
                        for (var keyword in options.keywords) {
                            if (options.keywords.hasOwnProperty(keyword)) {
                                var target = options.keywords[keyword];
                                if (keyword === href) {
                                    scroll.to(target, options);
                                    e.preventDefault();
                                    return;
                                }
                            }
                        }
                    }
                    // 「/pathname/#hash」のリンクパターンの場合
                    // 「/pathname/」が現在のURLだった場合「#hash」に飛ばすようにする
                    var absPath = $this.prop('href');
                    var currentReferer = location.protocol + '//' + location.host + location.pathname + location.search;
                    href = absPath.replace(currentReferer, '');
                    // #top はHTML5ではページトップを意味する
                    if (href === '#top') {
                        scroll.to(0, options);
                        e.preventDefault();
                        return;
                    }
                    // セレクタとして要素が存在する場合はその要素に移動
                    // 「/」で始まるなどセレクターとして不正な場合、例外を投げることがあるので無視する
                    try {
                        var _target = document.querySelector(href);
                        if (_target) {
                            scroll.to(_target, options);
                            e.preventDefault();
                            return;
                        }
                    } catch (err) {}
                }
                return;
            });
        }
        /**
         * リストを均等に分割する
         *
         * @version 0.2.0
         * @since 0.0.14
         *
         */

    }, {
        key: 'bcSplitList',
        value: function bcSplitList(columnSize, options) {
            var self = $(this);
            var CLASS_NAME = 'splited-list';
            var CLASS_NAME_NTH = 'nth';
            var CLASS_NAME_ITEM = 'item';
            var config = $.extend({
                dataKey: '-bc-split-list-index',
                splitChildren: true
            }, options);
            self.each(function (index, elem) {
                var $container = $(elem);
                var $list = $container.find('>ul');
                var $items = void 0;
                if (!config.splitChildren) {
                    // 直下のliのみ取得
                    $items = $list.find('>li').detach();
                } else {
                    // 入れ子のliも含めて全て取得
                    $items = $list.find('li').detach();
                    // 入れ子のulの削除
                    $items.find('ul').remove();
                }
                // リストアイテムの総数
                var size = $items.length;
                var splited = Math_1.default.split(size, columnSize);
                var itemArray = $items.toArray();
                for (var i = 0; i < columnSize; i++) {
                    var sizeByColumn = splited[i];
                    var col = document.createElement('ul');
                    BaserElement_1.default.addClass(col, CLASS_NAME);
                    BaserElement_1.default.addClass(col, CLASS_NAME, '', CLASS_NAME_NTH + columnSize);
                    col.appendChild(elem);
                    for (var j = 0; j < sizeByColumn; j++) {
                        var item = itemArray.shift();
                        if (item) {
                            col.appendChild(item);
                            // TODO: item.data(config.dataKey, i);
                            BaserElement_1.default.addClass(item, CLASS_NAME, CLASS_NAME_ITEM);
                            BaserElement_1.default.addClass(item, CLASS_NAME, CLASS_NAME_ITEM, CLASS_NAME_NTH + i);
                        }
                    }
                }
                $list.remove();
            });
            return self;
        }
        /**
         * マップを埋め込む
         *
         * 現在の対応はGoogleMapsのみ
         *
         * @version 0.9.0
         * @since 0.0.8
         *
         * * * *
         *
         * ## Sample
         *
         * ### Target HTML
         *
         * ```html
         * <div class="sample" data-lat="33.606785" data-lng="130.418314"></div>
         * ```
         *
         * ### Execute
         *
         * ```js
         * $('.sample').bcMaps();
         * ```
         *
         * ### Result
         *
         * comming soon...
         *
         */

    }, {
        key: 'bcMaps',
        value: function bcMaps(options) {
            var self = $(this);
            return self.each(function (i, elem) {
                var $elem = $(elem);
                var data = $elem.data(GoogleMaps_1.default.className);
                if (data) {
                    data.reload(options);
                } else {
                    /* tslint:disable */
                    new GoogleMaps_1.default(elem, options);
                }
            });
        }
        /**
         * YouTubeを埋め込む
         *
         * @version 0.9.0
         * @since 0.0.8
         *
         * * * *
         *
         * ## Sample
         *
         * ### Target HTML
         *
         * ```html
         * <div class="sample" data-id="rb0zOstIiyU" data-width="720" data-height="480"></div>
         * ```
         *
         * ### Execute
         *
         * ```js
         * $('.sample').bcYoutube();
         * ```
         *
         */

    }, {
        key: 'bcYoutube',
        value: function bcYoutube(options) {
            var self = $(this);
            return self.each(function (i, elem) {
                var $elem = $(elem);
                var data = $elem.data(YouTube_1.default.className);
                if (data) {
                    data.reload(options);
                } else {
                    /* tslint:disable */
                    new YouTube_1.default(elem, options);
                }
            });
        }
    }], [{
        key: 'bcScrollTo',
        value: function bcScrollTo(selector, options) {
            var scroll = new Scroll_1.default();
            scroll.to(selector, options);
        }
    }]);

    return JQueryAdapter;
}();

$.extend($, JQueryAdapter);
$.extend($.fn, JQueryAdapter.prototype);