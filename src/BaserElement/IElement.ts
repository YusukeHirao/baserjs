import IEventDispatcher from '../EventDispatcher/IEventDispatcher';

interface IElement extends IEventDispatcher {
	id: string;
	name: string;
	el: HTMLElement;
	addClass (blockNames: string, elementNames?: string, modifierName?: string): void;
	getBoolAttr (attrName: string): boolean;
}

export default IElement;
