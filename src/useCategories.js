import useWordPressResource from './useWordPressResource';
import { getCategoriesPath } from './apiPaths';

/**
 * A hook to fetch multiple WordPress categories based on the provided query options.
 *
 * @param {object} queryOptions - Optional query options for filtering the results.
 *
 * @returns {object} The react-query query object containing the categories data and status.
 */
const useCategories = (queryOptions = {}) => {
	return useWordPressResource('categories', () =>
		getCategoriesPath(queryOptions)
	);
};

export default useCategories;
