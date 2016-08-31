import BaserElement from '../BaserElement';

class BaserElementCollection<E extends HTMLElement> {

	private _nodeList: BaserElement<E>[] = [];

	// public static each (elementList: HTMLCollection): BaserElementCollection {
	// 	const baserElList: BaserElement[] = [];
	// 	for (let i: number = 0, l: number = elementList.length; i < l; i++) {
	// 		baserElList.push(new BaserElement(elementList[i] as HTMLElement));
	// 	}
	// 	return new BaserElementCollection(baserElList);
	// }

	constructor (nodeList: NodeListOf<E>) {

		for (let i: number = 0, l: number = nodeList.length; i < l; i++) {
			const el: E = nodeList.item(i);
			const baserEl: BaserElement<E> = new BaserElement<E>(el);
			this._nodeList.push(baserEl);
		}

	}

	public [Symbol.iterator] () {
		return this._nodeList.values();
	}

}

export default BaserElementCollection;
