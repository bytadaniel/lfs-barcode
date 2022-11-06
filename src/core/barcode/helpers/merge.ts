export function merge<R extends Record<string, any>, T extends Record<any, any>, K extends Record<any, any>>(
	old: T, replaceObj = {} as K
): R {
	const newMerge = {} as R
	for (const k in old) {
		if (old.hasOwnProperty(k)) {
			newMerge[k] = old[k];
		}
	}
	for (const k in replaceObj) {
		if(replaceObj.hasOwnProperty(k) && typeof replaceObj[k] !== "undefined"){
			newMerge[k] = replaceObj[k];
		}
	}
	return newMerge;
}