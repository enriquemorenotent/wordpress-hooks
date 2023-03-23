import useWordPressResource from './useWordPressResource';
import { getPagePath } from './apiPaths';

/**
 * A hook to fetch a single WordPress page by id or slug.
 *
 * @param {number} id - The id or slug of the WordPress page.
 *
 * @returns {object} The react-query query object containing the page data and status.
 */
const usePage = (id) => {
	return useWordPressResource('page', () => getPagePath(id));
};

export default usePage;
