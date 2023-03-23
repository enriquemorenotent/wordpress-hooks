import useWordPressResource from './useWordPressResource';
import { getPagesPath } from './apiPaths';

/**
 * A hook to fetch multiple WordPress pages based on the provided query options.
 *
 * @param {object} queryOptions - Optional query options for filtering the results.
 *
 * @returns {object} The react-query query object containing the pages data and status.
 */
const usePages = (queryOptions = {}) => {
	return useWordPressResource('pages', () => getPagesPath(queryOptions));
};

export default usePages;
