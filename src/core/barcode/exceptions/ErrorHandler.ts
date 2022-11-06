/*eslint no-console: 0 */

import type { API } from "../api";

class ErrorHandler{
    api: API;
	constructor(api: API){
		this.api = api;
	}

	handleCatch(e: Error){
		// If babel supported extending of Error in a correct way instanceof would be used here
		if(e.name === "InvalidInputException"){
            throw e.message;
		}
		else{
			throw e;
		}
	}

	wrapBarcodeCall<T>(func: Function): T | API{
		try{
			var result = func(...arguments);
			this.api._options.valid(true);
			return result;
		}
		catch(_e){
            const error = _e as Error
			this.handleCatch(error);

			return this.api;
		}
	}
}

export default ErrorHandler;
