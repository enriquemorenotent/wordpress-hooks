import useWordPressResource from './useWordPressResource';
import { getPostsPath } from './apiPaths';

/**
 * A hook to fetch multiple WordPress posts based on the provided query options.
 *
 * @param {object} queryOptions - Optional query options for filtering the results.
 *
 * @returns {object} The react-query query object containing the posts data and status.
 */
const usePosts = (queryOptions = {}) => {
	return useWordPressResource('posts', () => getPostsPath(queryOptions));
};

export default usePosts;
