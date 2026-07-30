const delLastParamsUrl = (url: string) => {
	if (url.lastIndexOf('?') === url.length - 1) {
		return url.substring(0, url.length - 1);
	}
	return url;
};

export const delParamsUrl = (url: string, name: string) => {
	const hashIndex = url.indexOf('#');
	const hash = hashIndex > -1 ? url.slice(hashIndex) : '';
	const urlWithoutHash = hashIndex > -1 ? url.slice(0, hashIndex) : url;
	const queryIndex = urlWithoutHash.indexOf('?');

	if (queryIndex === -1) {
		return delLastParamsUrl(url);
	}

	const baseUrl = urlWithoutHash.slice(0, queryIndex);
	const query = urlWithoutHash.slice(queryIndex + 1);
	if (!query) {
		return `${baseUrl}${hash}`;
	}

	const nextQuery = query
		.split('&')
		.filter(Boolean)
		.filter((item) => item.split('=')[0] !== name)
		.join('&');

	return `${baseUrl}${nextQuery ? `?${nextQuery}` : ''}${hash}`;
};
