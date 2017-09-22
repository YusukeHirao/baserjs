import _BaserElement from './Classes/BaserElement';
import _GoogleMaps from './Classes/GoogleMaps';
import _Progressive from './Classes/Progressive';
import _Scroll from './Classes/Scroll';
import _Sequencer from './Classes/Sequencer';
import _Slideshow from './Classes/Slideshow';
import _YouTube from './Classes/YouTube';

export const BaserElement = _BaserElement;
export const GoogleMaps = _GoogleMaps;
export const Progressive = _Progressive;
export const Scroll = _Scroll;
export const Sequencer = _Sequencer;
export const Slideshow = _Slideshow;
export const YouTube = _YouTube;

export function auto () {
	return new Promise<void>((resolve) => {
		if (document.readyState !== 'loading') {
			_auto();
			resolve();
			return;
		}
		addEventListener('DOMContentLoaded', () => {
			_auto();
			resolve();
		});
	});
}

function _auto () {
	const nodesGoogleMaps = document.querySelectorAll('[data-baser="google-maps"]');
	for (const node of Array.from(nodesGoogleMaps)) {
		const g = new GoogleMaps(node as HTMLDivElement);
	}

	const nodesYouTube = document.querySelectorAll('[data-baser="youtube"]');
	for (const node of Array.from(nodesYouTube)) {
		const g = new YouTube(node as HTMLDivElement);
	}
}
