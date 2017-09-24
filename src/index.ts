import _AccessibleElement from './nodes/AccessibleElement';
import _ButtonElement from './nodes/ButtonElement';
import _CommandElement from './nodes/CommandElement';
import _CoreNode from './nodes/CoreNode';
import _EventDispatcher from './nodes/EventDispatcher';
import _InteractiveNode from './nodes/InteractiveNode';
import _WidgetElement from './nodes/WidgetElement';

export const AccessibleElement = _AccessibleElement;
export const ButtonElement = _ButtonElement;
export const CommandElement = _CommandElement;
export const CoreNode = _CoreNode;
export const EventDispatcher = _EventDispatcher;
export const InteractiveNode = _InteractiveNode;
export const WidgetElement = _WidgetElement;

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
	// const nodesGoogleMaps = document.querySelectorAll('[data-baser="google-maps"]');
	// for (const node of Array.from(nodesGoogleMaps)) {
	// 	const g = new GoogleMaps(node as HTMLDivElement);
	// }

	// const nodesYouTube = document.querySelectorAll('[data-baser="youtube"]');
	// for (const node of Array.from(nodesYouTube)) {
	// 	const g = new YouTube(node as HTMLDivElement);
	// }
}
