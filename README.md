baserJS
===

[![Build Status](https://travis-ci.org/YusukeHirao/baserjs.svg?branch=next%2Fv1.0.0)](https://travis-ci.org/YusukeHirao/baserjs)

コーポレートサイトにちょうどいいJavaScriptライブラリ

## Develop `v1.0.0` in progress

### Functions
- [ ] Components/Elements
	- [ ] Styled `<select>`
	- [ ] Modal window
	- [ ] Slideshow
	- [ ] Tooltip
	- [ ] Expander
	- [ ] Tabs
	- [ ] Dropdown Navigation
	- [ ] Maps
		- [ ] GoogleMaps
			- [x] Standard
			- [x] Multi pins
			- [x] Fit bounds
			- [x] Rendering then inview
			- [x] Pinning then inview
			- [x] Animation pinning
			- [ ] Info window
			- [ ] iFrame Render
	- [ ] Video
		- [ ] General API & UI `<video>`, YouTube and Vimeo
		- [ ] YouTube
			- [x] Standard
			- [x] Loading a thumbnail image
			- [ ] Multi Tracks
		- [ ] Vimeo
- [ ] Display Helper
	- [ ] Aligning height
	- [ ] Object Fit (CSS `object-fit`)
	- [ ] Nth letter (Separate by chars)
- [ ] Interaction Helper
	- [ ] Case by device width (breakpoints)
	- [ ] Hyperlink delegation
	- [ ] Detection when descendant image loaded
	- [ ] Detection when element resized
	- [x] Progressive Helper
	- [x] Smooth Scrolling
	- [x] Promise sequencer
	- [ ] Scroll spy and Inview for elements
		- [x] Standard
		- [x] High performance
		- [x] Support Scroll Event on `Passive Event Listener`
		- [x] Support `IntersectionObserver`
	- [ ] Converting units of length
- [ ] DOM Helper
	- [ ] Node walker
- [ ] Get browser state
	- [ ] Window dimensions
	- [ ] Timer
	- [ ] Counter
	- [ ] Storage
	- [ ] History
	- [ ] URL Hash
	- [ ] URL Query string
	- [ ] Exception Tracker

### Support Browsers
- IE11 & Edge
- Chrome
- Safari (last 2 version)
- Firefox
- Android Chrome
- iOS Safari (last 2 version)

## Usage

```js
import baser from 'baserjs';
```

```html
<script src="baser.js"></script>
```

* * *

## Development and Contribution

[How to Install](INSTALL.md)

Copyright © 2017 baserCMS Users Community, Licensed under the MIT License.
