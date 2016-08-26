import BaserElement from './BaserElement';

class BaserElementCollection {

	public nodeList: BaserElement[];

	public static each (elementList: HTMLCollection): BaserElementCollection {
		const baserElList: BaserElement[] = [];
		for (let i: number = 0, l: number = elementList.length; i < l; i++) {
			baserElList.push(new BaserElement(elementList[i] as HTMLElement));
		}
		return new BaserElementCollection(baserElList);
	}

	constructor (nodeList: BaserElement[]) {

		this.nodeList = nodeList;

	}

	public [Symbol.iterator] () {
		return this.nodeList.values();
	}

}

export default BaserElementCollection;
