import useWordPressResource from './useWordPressResource';
import { getMediaPath } from './apiPaths';

/**
 * A hook to fetch multiple WordPress media based on the provided query options.
 *
 * @param {object} queryOptions - Optional query options for filtering the results.
 *
 * @returns {object} The react-query query object containing the media data and status.
 */
const useMedia = (queryOptions = {}) => {
	return useWordPressResource('media', () => getMediaPath(queryOptions));
};

export default useMedia;
