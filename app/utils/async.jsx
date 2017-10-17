//export const fetchGet = (url) => fetch(url).then(response => response.json());
export const fetchGet = async (url) => await (await fetch(url)).json();

export function setSSE(url) {
	const source = new EventSource(url);
	let deferred;

	source.onmessage = event => {
		if (deferred) {
			deferred.resolve(JSON.parse(event.data));
			deferred = null;
		}
	};

	return {
		nextMessage() {
			if (!deferred) {
				deferred = {}
				deferred.promise = new Promise(resolve => deferred.resolve = resolve);
			}
			return deferred.promise;
		}
	}
}