"use strict";

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var YouTube = function (_super) {
    __extends(YouTube, _super);
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
        _super.call(this, el);
        /**
         * プレイヤーが有効になっているかどうか
         *
         * @version 0.5.0
         * @since 0.5.0
         *
         */
        this.isEmbeded = false;
        // 既にエレメント化されていた場合は何もしない
        if (this._elementized) {
            return;
        }
        if (this._init(options)) {
            YouTube.movies.push(this);
            $(this.el).addClass(YouTube.className);
            $(this.el).data(YouTube.className, this);
        }
    }
    /**
     * YouTubeのiframeのソースURIを生成する
     *
     * @version 1.0.0
     * @since 0.9.1
     */
    YouTube.getURI = function (movieId, param) {
        var paramQuery = $.param(param);
        return "" + Browser_1["default"].getBrowser().availableScheme + YouTube.PLAYER_URL + movieId + "?" + paramQuery;
    };
    /**
     * YouTubeのサムネイル画像を取得する
     *
     * @version 1.0.0
     * @since 0.9.1
     *
     */
    YouTube.getPosterImage = function (movieId, highQuality) {
        if (highQuality === void 0) {
            highQuality = false;
        }
        var THUMB_URL = highQuality ? '//i.ytimg.com/vi/' : '//img.youtube.com/vi/';
        var THUMB_FILE_NAME = highQuality ? '/maxresdefault.jpg' : '/0.jpg';
        return "" + Browser_1["default"].getBrowser().availableScheme + THUMB_URL + movieId + THUMB_FILE_NAME;
    };
    /**
     * 再設定する
     *
     * @version 0.0.7
     * @since 0.0.7
     * @param options オプション
     *
     */
    YouTube.prototype.reload = function (options) {
        this._init(options);
    };
    /**
     * ミュートする
     *
     * @version 0.8.0
     * @since 0.5.0
     *
     */
    YouTube.prototype.mute = function () {
        this.player.mute();
        this._isMuted = true;
        this.trigger('onmute', [this.player]);
    };
    /**
     * ミュートを解除する
     *
     * @version 0.8.0
     * @since 0.5.0
     *
     */
    YouTube.prototype.unMute = function () {
        this.player.unMute();
        this._isMuted = false;
        this.trigger('onunmute', [this.player]);
    };
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
    YouTube.prototype.muteController = function (el, options) {
        var _this = this;
        var defaults = {
            eventType: 'click',
            mutedClass: 'is-muted',
            unmutedClass: 'is-unmuted',
            baseClass: 'youtube-mute-ctrl'
        };
        var conf = $.extend(defaults, options);
        BaserElement_1["default"].addClass(el, conf.baseClass);
        var update = function update() {
            if (_this._isMuted) {
                BaserElement_1["default"].addClass(el, conf.baseClass, '', conf.mutedClass);
                BaserElement_1["default"].removeClass(el, conf.baseClass, '', conf.unmutedClass);
            } else {
                BaserElement_1["default"].addClass(el, conf.baseClass, '', conf.unmutedClass);
                BaserElement_1["default"].removeClass(el, conf.baseClass, '', conf.mutedClass);
            }
        };
        var bindCtrl = function bindCtrl() {
            el.addEventListener(conf.eventType, function () {
                if (_this._isMuted) {
                    _this.unMute();
                } else {
                    _this.mute();
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
                _this.off(e.type);
                bindCtrl();
            });
        }
    };
    /**
     * 既にbaserJSのエレメント化しているかどうか確認する
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    YouTube.prototype._isElementized = function () {
        return this.__isElementized(YouTube);
    };
    /**
     * baserJSのエレメント化したフラグを登録する
     *
     * @version 1.0.0
     * @since 1.0.0
     */
    YouTube.prototype._elementize = function () {
        this.__elementize(YouTube);
    };
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
    YouTube.prototype._init = function (options) {
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
        if (Browser_1["default"].getBrowser().spec.ua.iOS) {
            this.movieOption.autoplay = false;
            this.movieOption.preEmbed = true;
        }
        var movieIdList = this.movieOption.id ? this.movieOption.id.split(/\s*,\s*/) : [];
        if (this.movieOption.shuffle) {
            movieIdList = Array_1["default"].shuffle(movieIdList);
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
    };
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
    YouTube.prototype._createPosterImage = function (movieId) {
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
    };
    /**
     * プレイヤーフレームを生成する
     *
     * @version 0.10.3
     * @since 0.9.1
     */
    YouTube.prototype._createPlayerFrame = function () {
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
    };
    /**
     * YouTube APIをロードする
     *
     * @version 0.10.2
     * @since 0.9.1
     */
    YouTube.prototype._loadYouTubeAPI = function () {
        var _this = this;
        if (!('YT' in window && YT.Player)) {
            $.getScript("" + Browser_1["default"].getBrowser().availableScheme + YouTube.API_URL);
        }
        var intervalTimer = setInterval(function () {
            if (!_this.player && 'YT' in window && YT.Player) {
                _this._createPlayer(_this.playerDomId);
            }
            if (_this.player && _this.player.pauseVideo && _this.player.playVideo) {
                clearInterval(intervalTimer);
                _this._onEmbeded();
            }
        }, 300);
    };
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
    YouTube.prototype._createPlayer = function (playerID) {
        var _this = this;
        this.player = new YT.Player(playerID, {
            events: {
                onStateChange: function onStateChange(e) {
                    switch (e.data) {
                        case -1:
                            {
                                _this.trigger('unstarted', [_this.player]);
                                var listIndex = _this.player.getPlaylistIndex();
                                if (_this.currentCueIndex !== listIndex) {
                                    _this.trigger('changecue', [_this.player]);
                                }
                                _this.currentCueIndex = listIndex;
                            }
                            break;
                        case YT.PlayerState.BUFFERING:
                            {
                                if (_this._$posterContainer) {
                                    _this._$posterContainer.addClass('-bc-youtube-pseudo-poster-element--loading');
                                }
                                _this.trigger('buffering', [_this.player]);
                            }
                            break;
                        case YT.PlayerState.CUED:
                            {
                                _this.trigger('cued', [_this.player]);
                            }
                            break;
                        case YT.PlayerState.ENDED:
                            {
                                _this.trigger('ended', [_this.player]);
                                if (_this.movieId.length > 1 && _this.movieOption.loop && _this.currentCueIndex === _this.movieId.length - 1) {
                                    _this.player.playVideoAt(0);
                                } else if (_this.movieOption.loop) {
                                    _this.player.playVideo();
                                }
                            }
                            break;
                        case YT.PlayerState.PAUSED:
                            {
                                _this.trigger('paused', [_this.player]);
                            }
                            break;
                        case YT.PlayerState.PLAYING:
                            {
                                _this._hidePoster();
                                _this.trigger('playing', [_this.player]);
                                _this.currentCueIndex = _this.player.getPlaylistIndex();
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
    };
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
    YouTube.prototype._onEmbeded = function () {
        var _this = this;
        this.isEmbeded = true;
        this._isMuted = this.player.isMuted();
        if (this.movieOption.mute) {
            this.mute();
        }
        if (this.movieOption.stopOnInactive) {
            $(window).on('blur', function () {
                _this.player.pauseVideo();
            }).on('focus', function () {
                _this.player.playVideo();
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
    };
    /**
     * ポスター要素を非表示にする
     *
     * @version 0.10.2
     * @since 0.10.0
     */
    YouTube.prototype._hidePoster = function () {
        if (this._$posterContainer) {
            this._$posterContainer.removeClass('-bc-youtube-pseudo-poster-element--loading');
            this._$posterContainer.detach();
        }
    };
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
    return YouTube;
}(BaserElement_1["default"]);
exports.__esModule = true;
exports["default"] = YouTube;