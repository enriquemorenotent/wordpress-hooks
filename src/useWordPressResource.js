import { useQuery } from 'react-query';
import { useReactPress } from './ReactPressProvider';
import fetchResource from './fetchResource';

/**
 * A generic hook to fetch WordPress resources using react-query.
 *
 * @param {string} resourceType - The type of the WordPress resource (e.g., 'post', 'page').
 * @param {function} getPath - A function that returns the API path for the resource.
 * @param {object} queryOptions - Optional query options for filtering the results.
 *
 * @returns {object} The react-query query object containing the resource data and status.
 */
const useWordPressResource = (resourceType, getPath, queryOptions = {}) => {
	const { apiUrl } = useReactPress();
	const path = getPath(queryOptions);

	return useQuery([resourceType, path], () => fetchResource(apiUrl, path), {
		keepPreviousData: true,
		staleTime: 5 * 60 * 1000, // 5 minutes
		cacheTime: 60 * 60 * 1000, // 1 hour
	});
};

export default useWordPressResource;
