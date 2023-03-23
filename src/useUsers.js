import useWordPressResource from './useWordPressResource';
import { getUsersPath } from './apiPaths';

/**
 * A hook to fetch multiple WordPress users based on the provided query options.
 *
 * @param {object} queryOptions - Optional query options for filtering the results.
 *
 * @returns {object} The react-query query object containing the users data and status.
 */
const useUsers = (queryOptions = {}) => {
	return useWordPressResource('users', () => getUsersPath(queryOptions));
};

export default useUsers;
