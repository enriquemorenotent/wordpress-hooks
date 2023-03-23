import axios from 'axios';

const handleAxiosErrors = (error) => {
	if (error.response) {
		throw new Error(
			`Failed to fetch resource: ${error.response.status} ${error.response.statusText} - ${error.response.data}`
		);
	}
	throw error;
};

const axiosInstance = axios.create({
	timeout: 10000,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
});

export const setAxiosDefaults = (timeout, baseURL) => {
	axiosInstance.defaults.timeout = timeout;
	axiosInstance.defaults.baseURL = baseURL;
};

const fetchResource = async (apiUrl, path, options = {}, method = 'GET') => {
	const requestOptions = {
		...options,
		method,
		url: `${apiUrl}/${path}`,
	};

	try {
		const response = await axiosInstance(requestOptions);
		return response.data;
	} catch (error) {
		handleAxiosErrors(error);
	}
};

export default fetchResource;
