"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Array_1 = require('../Util/Array');
var BaserElement_1 = require('../BaserElement');
var Browser_1 = require('../Browser');
/**
 * YouTube要素
 *
 * TODO: YouTubeのURLパラメータのinterfaceをつくる
 *
 * @version 0.10.0
 * @since 0.0.7
 *
 */

var YouTube = function (_BaserElement_1$defau) {
    _inherits(YouTube, _BaserElement_1$defau);

    /**
     * コンストラクタ
     *
     * use: jQuery
     *
     * @version 1.0.0
     * @since 0.0.7
     * @param el 管理するDOM要素
     * @param options オプション
     *
     */
    function YouTube(el, options) {
        _classCallCheck(this, YouTube);

        /**
         * プレイヤーが有効になっているかどうか
         *
         * @version 0.5.0
         * @since 0.5.0
         *
         */
        var _this = _possibleConstructorReturn(this, (YouTube.__proto__ || Object.getPrototypeOf(YouTube)).call(this, el));

        _this.isEmbeded = false;
        // 既にエレメント化されていた場合は何もしない
        if (_this._elementized) {
            return _possibleConstructorReturn(_this);
        }
        if (_this._init(options)) {
            YouTube.movies.push(_this);
            $(_this.el).addClass(YouTube.className);
            $(_this.el).data(YouTube.className, _this);
        }
        return _this;
    }
    /**
     * YouTubeのiframeのソースURIを生成する
     *
     * @version 1.0.0
     * @since 0.9.1
     */


    _createClass(YouTube, [{
        key: 'reload',

        /**
         * 再設定する
         *
         * @version 0.0.7
         * @since 0.0.7
         * @param options オプション
         *
         */
        value: function reload(options) {
            this._init(options);
        }
        /**
         * ミュートする
         *
         * @version 0.8.0
         * @since 0.5.0
         *
         */

    }, {
        key: 'mute',
        value: function mute() {
            this.player.mute();
            this._isMuted = true;
            this.trigger('onmute', [this.player]);
        }
        /**
         * ミュートを解除する
         *
         * @version 0.8.0
         * @since 0.5.0
         *
         */

    }, {
        key: 'unMute',
        value: function unMute() {
            this.player.unMute();
            this._isMuted = false;
            this.trigger('onunmute', [this.player]);
        }
        /**
         * ミュートのオンオフを要素にアサインする
         *
         * TODO: 別のクラスにする
         *
         * @version 1.0.0
         * @since 0.5.0
         * @param el アサインするDOM要素
         * @param options オプション
         *
         */

    }, {
        key: 'muteController',
        value: function muteController(el, options) {
            var _this2 = this;

            var defaults = {
                eventType: 'click',
                mutedClass: 'is-muted',
                unmutedClass: 'is-unmuted',
                baseClass: 'youtube-mute-ctrl'
            };
            var conf = $.extend(defaults, options);
            BaserElement_1.default.addClass(el, conf.baseClass);
            var update = function update() {
                if (_this2._isMuted) {
                    BaserElement_1.default.addClass(el, conf.baseClass, '', conf.mutedClass);
                    BaserElement_1.default.removeClass(el, conf.baseClass, '', conf.unmutedClass);
                } else {
                    BaserElement_1.default.addClass(el, conf.baseClass, '', conf.unmutedClass);
                    BaserElement_1.default.removeClass(el, conf.baseClass, '', conf.mutedClass);
                }
            };
            var bindCtrl = function bindCtrl() {
                el.addEventListener(conf.eventType, function () {
                    if (_this2._isMuted) {
                        _this2.unMute();
                    } else {
                        _this2.mute();
                    }
                    update();
                }, false);
                update();
            };
            this.on('onmute onunmute', function () {
                update();
            });
            if (this.isEmbeded) {
                bindCtrl();
            } else {
                this.on('embeded', function (e, ytp) {
                    _this2.off(e.type);
                    bindCtrl();
                });
            }
        }
        /**
         * 既にbaserJSのエレメント化しているかどうか確認する
         *
         * @version 1.0.0
         * @since 1.0.0
         */

    }, {
        key: '_isElementized',
        value: function _isElementized() {
            return this.__isElementized(YouTube);
        }
        /**
         * baserJSのエレメント化したフラグを登録する
         *
         * @version 1.0.0
         * @since 1.0.0
         */

    }, {
        key: '_elementize',
        value: function _elementize() {
            this.__elementize(YouTube);
        }
        /**
         * 初期化
         *
         * @version 1.0.0
         * @since 0.0.7
         * @param $el 管理するDOM要素のjQueryオブジェクト
         * @param options オプション
         * @return 初期化が成功したかどうか
         *
         */

    }, {
        key: '_init',
        value: function _init(options) {
            this.movieOption = this.mergeOptions({
                rel: false,
                autoplay: true,
                stopOnInactive: false,
                controls: false,
                loop: true,
                showinfo: false,
                mute: false,
                id: '',
                width: 400,
                height: 300,
                index: 0,
                poster: null,
                posterHighQuality: false,
                startSeconds: 0,
                suggestedQuality: 'default',
                shuffle: false,
                preEmbed: true
            }, options);
            if (Browser_1.default.getBrowser().spec.ua.iOS) {
                this.movieOption.autoplay = false;
                this.movieOption.preEmbed = true;
            }
            var movieIdList = this.movieOption.id ? this.movieOption.id.split(/\s*,\s*/) : [];
            if (this.movieOption.shuffle) {
                movieIdList = Array_1.default.shuffle(movieIdList);
            }
            var movieId = movieIdList[this.movieOption.index || 0];
            var param = {
                version: 3,
                rel: this.movieOption.rel ? 1 : 0,
                autoplay: 0,
                controls: this.movieOption.controls ? 1 : 0,
                disablekb: 1,
                iv_load_policy: 3,
                loop: this.movieOption.loop ? 1 : 0,
                modestbranding: 1,
                showinfo: this.movieOption.showinfo ? 1 : 0,
                wmode: 'transparent',
                enablejsapi: 1
            };
            this.src = YouTube.getURI(movieId, param);
            this.movieId = movieIdList;
            this.playerDomId = this.id + '-Player';
            if (this.movieOption.poster !== null && !this.movieOption.autoplay) {
                this._createPosterImage(movieId);
            } else {
                this._createPlayerFrame();
                this._loadYouTubeAPI();
            }
            return true;
        }
        /**
         * ポスターイメージの生成
         *
         * use: JQuery
         *
         * data-poster属性の中からポスター画像を生成する
         *
         * data-posterが 値なし もしくは 空文字 の場合、YouTubeのサムネイル画像を参照する
         * data-posterの値が `/^@contents?$/i` にマッチする場合、要素の中身をそのまま使う
         * それ以外の場合は パスと見なして画像を参照する
         *
         * @version 0.10.2
         * @since 0.9.1
         * @param movieId 動画のID
         *
         */

    }, {
        key: '_createPosterImage',
        value: function _createPosterImage(movieId) {}
        // const posterContainer: HTMLElement = $('<div class="-bc-element -bc-youtube-pseudo-poster-element" />');
        // if (this.movieOption.width) {
        // 	posterContainer.width(this.movieOption.width);
        // }
        // if (this.movieOption.height) {
        // 	posterContainer.height(this.movieOption.height);
        // }
        // posterContainer.css({
        // 	position: 'absolute',
        // 	top: 0,
        // 	left: 0,
        // 	pointerEvents: Browser.getBrowser().spec.ua.iOS ? 'none' : 'all',
        // 	cursor: 'pointer',
        // });
        // if (/^@contents?$/i.test(this.movieOption.poster)) {
        // 	const children: NodeListOf<HTMLElement> = this.el.children().detach();
        // 	if (this.movieOption.preEmbed) {
        // 		this._createPlayerFrame();
        // 		this._loadYouTubeAPI();
        // 	}
        // 	posterContainer.appendChild(children);
        // 	this.el.appendChild(posterContainer);
        // } else {
        // 	if (this.movieOption.poster === '') {
        // 		this.movieOption.poster = YouTube.getPosterImage(movieId, this.movieOption.posterHighQuality);
        // 	}
        // 	if (this.movieOption.preEmbed) {
        // 		this.$el.empty();
        // 		this._createPlayerFrame();
        // 		this._loadYouTubeAPI();
        // 	} else {
        // 		posterContainer.css({
        // 			position: 'relative',
        // 		});
        // 	}
        // 	posterContainer.appendTo(this.$el);
        // 	if (this.movieOption.width) {
        // 		posterContainer.width(this.movieOption.width);
        // 	}
        // 	if (this.movieOption.height) {
        // 		posterContainer.height(this.movieOption.height);
        // 	}
        // 	posterContainer.css({
        // 		position: 'absolute',
        // 		top: 0,
        // 		left: 0,
        // 		width: '100%',
        // 		height: '100%',
        // 		backgroundImage: `url("${this.movieOption.poster}")`,
        // 		backgroundRepeat: 'no-repeat',
        // 		backgroundSize: 'cover',
        // 		backgroundPosition: 'center center',
        // 		backgroundColor: '#000',
        // 		pointerEvents: 'none',
        // 		cursor: 'pointer',
        // 	});
        // }
        // if (this.movieOption.preEmbed) {
        // 	posterContainer.on('click', () => {
        // 		if (this.player) {
        // 			posterContainer.off('click');
        // 			this._$posterContainer.addClass('-bc-youtube-pseudo-poster-element--loading');
        // 			this.player.playVideo();
        // 		}
        // 	});
        // } else {
        // 	posterContainer.css({
        // 		pointerEvents: 'all',
        // 	});
        // 	if (/^@contents?$/i.test(this.movieOption.poster)) {
        // 		const $children: JQuery = this.$el.children().detach();
        // 		posterContainer.append($children);
        // 		posterContainer.appendTo(this.$el);
        // 	}
        // 	posterContainer.on('click', () => {
        // 		this.movieOption.autoplay = true;
        // 		this._createPlayerFrame();
        // 		this._loadYouTubeAPI();
        // 	});
        // }
        // this._$posterContainer = posterContainer;

        /**
         * プレイヤーフレームを生成する
         *
         * @version 0.10.3
         * @since 0.9.1
         */

    }, {
        key: '_createPlayerFrame',
        value: function _createPlayerFrame() {
            var $frame = $('<iframe class="-bc-youtube-player-frame-element" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen />');
            $frame.prop({
                src: this.src,
                id: this.playerDomId
            });
            $frame.css({
                position: 'relative',
                display: 'block',
                width: '100%',
                height: '100%'
            });
            $frame.prependTo(this.el);
            if (this.movieOption.width) {
                $frame.width(this.movieOption.width);
                $frame.data('width', this.movieOption.width);
            }
            if (this.movieOption.height) {
                $frame.height(this.movieOption.height);
                $frame.data('height', this.movieOption.height);
            }
            this._$frame = $frame;
        }
        /**
         * YouTube APIをロードする
         *
         * @version 0.10.2
         * @since 0.9.1
         */

    }, {
        key: '_loadYouTubeAPI',
        value: function _loadYouTubeAPI() {
            var _this3 = this;

            if (!('YT' in window && YT.Player)) {
                $.getScript('' + Browser_1.default.getBrowser().availableScheme + YouTube.API_URL);
            }
            var intervalTimer = setInterval(function () {
                if (!_this3.player && 'YT' in window && YT.Player) {
                    _this3._createPlayer(_this3.playerDomId);
                }
                if (_this3.player && _this3.player.pauseVideo && _this3.player.playVideo) {
                    clearInterval(intervalTimer);
                    _this3._onEmbeded();
                }
            }, 300);
        }
        /**
         * プレイヤーを生成する
         *
         * use: jQuery
         *
         * @version 0.10.3
         * @since 0.8.0
         * @param playerID プレイヤーのDOM ID
         *
         */

    }, {
        key: '_createPlayer',
        value: function _createPlayer(playerID) {
            var _this4 = this;

            this.player = new YT.Player(playerID, {
                events: {
                    onStateChange: function onStateChange(e) {
                        switch (e.data) {
                            case -1:
                                {
                                    _this4.trigger('unstarted', [_this4.player]);
                                    var listIndex = _this4.player.getPlaylistIndex();
                                    if (_this4.currentCueIndex !== listIndex) {
                                        _this4.trigger('changecue', [_this4.player]);
                                    }
                                    _this4.currentCueIndex = listIndex;
                                }
                                break;
                            case YT.PlayerState.BUFFERING:
                                {
                                    if (_this4._$posterContainer) {
                                        _this4._$posterContainer.addClass('-bc-youtube-pseudo-poster-element--loading');
                                    }
                                    _this4.trigger('buffering', [_this4.player]);
                                }
                                break;
                            case YT.PlayerState.CUED:
                                {
                                    _this4.trigger('cued', [_this4.player]);
                                }
                                break;
                            case YT.PlayerState.ENDED:
                                {
                                    _this4.trigger('ended', [_this4.player]);
                                    if (_this4.movieId.length > 1 && _this4.movieOption.loop && _this4.currentCueIndex === _this4.movieId.length - 1) {
                                        _this4.player.playVideoAt(0);
                                    } else if (_this4.movieOption.loop) {
                                        _this4.player.playVideo();
                                    }
                                }
                                break;
                            case YT.PlayerState.PAUSED:
                                {
                                    _this4.trigger('paused', [_this4.player]);
                                }
                                break;
                            case YT.PlayerState.PLAYING:
                                {
                                    _this4._hidePoster();
                                    _this4.trigger('playing', [_this4.player]);
                                    _this4.currentCueIndex = _this4.player.getPlaylistIndex();
                                }
                                break;
                            default:
                                {
                                    if ('console' in window) {
                                        console.warn('YouTube Player state is unknown.');
                                    }
                                }
                        }
                    }
                }
            });
        }
        /**
         * プレイヤーの生成が完了して実行可能になったときに呼ばれる処理
         *
         * use: jQuery
         *
         * TODO: embeddedyoutubeplayイベント廃止予定(v1.0.0)
         *
         * @version 0.10.3
         * @since 0.8.0
         *
         */

    }, {
        key: '_onEmbeded',
        value: function _onEmbeded() {
            var _this5 = this;

            this.isEmbeded = true;
            this._isMuted = this.player.isMuted();
            if (this.movieOption.mute) {
                this.mute();
            }
            if (this.movieOption.stopOnInactive) {
                $(window).on('blur', function () {
                    _this5.player.pauseVideo();
                }).on('focus', function () {
                    _this5.player.playVideo();
                });
            }
            if (this.movieId.length >= 2) {
                // TODO: youtube.d.ts に loadPlaylist() と cuePlaylist() が登録されていない
                var _player = this.player;
                if (this.movieOption.autoplay) {
                    _player.loadPlaylist(this.movieId, this.movieOption.index, this.movieOption.startSeconds, this.movieOption.suggestedQuality);
                } else {
                    _player.cuePlaylist(this.movieId, this.movieOption.index, this.movieOption.startSeconds, this.movieOption.suggestedQuality);
                }
            } else if (this.movieOption.autoplay) {
                this.player.playVideo();
            }
            this.trigger('embeded', [this.player]);
        }
        /**
         * ポスター要素を非表示にする
         *
         * @version 0.10.2
         * @since 0.10.0
         */

    }, {
        key: '_hidePoster',
        value: function _hidePoster() {
            if (this._$posterContainer) {
                this._$posterContainer.removeClass('-bc-youtube-pseudo-poster-element--loading');
                this._$posterContainer.detach();
            }
        }
    }], [{
        key: 'getURI',
        value: function getURI(movieId, param) {
            var paramQuery = $.param(param);
            return '' + Browser_1.default.getBrowser().availableScheme + YouTube.PLAYER_URL + movieId + '?' + paramQuery;
        }
        /**
         * YouTubeのサムネイル画像を取得する
         *
         * @version 1.0.0
         * @since 0.9.1
         *
         */

    }, {
        key: 'getPosterImage',
        value: function getPosterImage(movieId) {
            var highQuality = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var THUMB_URL = highQuality ? '//i.ytimg.com/vi/' : '//img.youtube.com/vi/';
            var THUMB_FILE_NAME = highQuality ? '/maxresdefault.jpg' : '/0.jpg';
            return '' + Browser_1.default.getBrowser().availableScheme + THUMB_URL + movieId + THUMB_FILE_NAME;
        }
    }]);

    return YouTube;
}(BaserElement_1.default);
/**
 * 管理対象の要素に付加するclass属性値のプレフィックス
 *
 * @version 0.0.7
 * @since 0.0.7
 *
 */


YouTube.className = '-bc-youtube-element';
/**
 * Player URL
 *
 * @version 0.0.7
 * @since 0.0.7
 *
 */
YouTube.PLAYER_URL = '//www.youtube.com/embed/';
/**
 * API URL
 *
 * @version 0.0.7
 * @since 0.0.7
 *
 */
YouTube.API_URL = '//www.youtube.com/player_api';
/**
 * 管理対象の要素
 *
 * @version 0.0.7
 * @since 0.0.7
 *
 */
YouTube.movies = [];
/**
 * クラス名
 *
 * @override
 * @version 1.0.0
 * @since 1.0.0
 */
YouTube._name = Symbol('YouTube');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = YouTube;