import 'core-js/fn/symbol'
import 'core-js/fn/set'
import 'core-js/fn/weak-map'
import 'core-js/fn/promise'

import './JQueryAdapter'

/**
 * @namespace
 * @type {Object}
 */
var baser = window.baser || {}
window.baser = baser

import AlignedBoxes from './AlignedBoxes'
baser.AlignedBoxes = AlignedBoxes

import BackgroundContainer from './BackgroundContainer'
baser.BackgroundContainer = BackgroundContainer

import BaserElement from './BaserElement'
baser.BaserElement = BaserElement

import BaserElementCollection from './BaserElementCollection'
baser.BaserElementCollection = BaserElementCollection

import BreakPoints from './BreakPoints'
baser.BreakPoints = BreakPoints

import Browser from './Browser'
baser.Browser = Browser

import DispatchEvent from './DispatchEvent'
baser.DispatchEvent = DispatchEvent

import EventDispatcher from './EventDispatcher'
baser.EventDispatcher = EventDispatcher

import EventHandler from './EventHandler'
baser.EventHandler = EventHandler

import FormElement from './FormElement'
baser.FormElement = FormElement

import GoogleMaps from './GoogleMaps'
baser.GoogleMaps = GoogleMaps

import Locational from './Locational'
baser.Locational = Locational

import Scroll from './Scroll'
baser.Scroll = Scroll

import Select from './Select'
baser.Select = Select

import Sequence from './Sequence'
baser.Sequence = Sequence

import Timer from './Timer'
baser.Timer = Timer

import YouTube from './YouTube'
baser.YouTube = YouTube
