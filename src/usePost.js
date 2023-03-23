import useWordPressResource from './useWordPressResource';
import { getPostPath } from './apiPaths';

/**
 * A hook to fetch a single WordPress post by id or slug.
 *
 * @param {number} id - The id or slug of the WordPress post.
 *
 * @returns {object} The react-query query object containing the post data and status.
 */
const usePost = (id) => {
	return useWordPressResource('post', () => getPostPath(id));
};

export default usePost;
