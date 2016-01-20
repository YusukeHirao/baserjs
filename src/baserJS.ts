/**
 * babel-polyfillは使わずにcore-jsから必要な機能だけ読み取る
 * 読み込むモジュールをできるだけ少なくしてファイルサイズを極力抑える
 */
import 'core-js/es6/symbol';
import 'core-js/fn/set';
import 'core-js/fn/map';

import baser = require('./baser');
window['baser'] = baser;

import './Class/JQueryAdapter';
