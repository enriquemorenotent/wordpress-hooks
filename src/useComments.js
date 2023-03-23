import useWordPressResource from './useWordPressResource';
import { getCommentsPath } from './apiPaths';

/**
 * A hook to fetch multiple WordPress comments based on the provided query options.
 *
 * @param {object} queryOptions - Optional query options for filtering the results.
 *
 * @returns {object} The react-query query object containing the comments data and status.
 */
const useComments = (queryOptions = {}) => {
	return useWordPressResource('comments', () =>
		getCommentsPath(queryOptions)
	);
};

export default useComments;
