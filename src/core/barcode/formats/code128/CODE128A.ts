import type { BarcodeInputOptions } from '../../options';
import CODE128 from './CODE128.js';
import { A_START_CHAR, A_CHARS } from './constants';

class CODE128A extends CODE128 {
	constructor(string: string, options: BarcodeInputOptions) {
		super(A_START_CHAR + string, options);
	}

	public override valid() {
		return (new RegExp(`^${A_CHARS}+$`)).test(this.data);
	}
}

export default CODE128A;
