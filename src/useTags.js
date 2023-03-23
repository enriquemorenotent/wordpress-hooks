import useWordPressResource from './useWordPressResource';
import { getTagsPath } from './apiPaths';

/**
 * A hook to fetch multiple WordPress tags based on the provided query options.
 *
 * @param {object} queryOptions - Optional query options for filtering the results.
 *
 * @returns {object} The react-query query object containing the tags data and status.
 */
const useTags = (queryOptions = {}) => {
	return useWordPressResource('tags', () => getTagsPath(queryOptions));
};

export default useTags;
