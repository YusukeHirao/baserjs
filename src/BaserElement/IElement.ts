import IEventDispatcher from '../EventDispatcher/IEventDispatcher';

interface IElement<E extends HTMLElement> extends IEventDispatcher {
	id: string;
	name: string;
	el: E;
	addClass (blockNames: string, elementNames?: string, modifierName?: string): void;
	getBoolAttr (attrName: string): boolean;
}

export default IElement;
