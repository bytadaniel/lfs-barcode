import type { BarcodeInputOptions } from '../../options';
import CODE128 from './CODE128.js';
import { B_START_CHAR, B_CHARS } from './constants';

class CODE128B extends CODE128 {
	constructor(string: string, options: BarcodeInputOptions) {
		super(B_START_CHAR + string, options);
	}

	public override valid() {
		return (new RegExp(`^${B_CHARS}+$`)).test(this.data);
	}
}

export default CODE128B;
