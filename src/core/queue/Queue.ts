export class Queue<T> {
	private readonly queue: T[] = []

	constructor (elements: T[]) {
		elements.forEach(e => this.append(e))
	}

	public get length () {
		return this.queue.length
	}

	public append (element: T) {
		this.queue.push(element)
	}

	public next () {
		return this.queue.shift()
	}

	public hasNext() {
		return this.queue.length > 0
	}
}