// Get the path for a single post based on its ID or slug.
export const getPostPath = (id) => `wp-json/wp/v2/posts/${id}`;

// Get the path for multiple posts based on the query options.
export const getPostsPath = (queryOptions) => {
	const params = new URLSearchParams(queryOptions).toString();
	return `wp-json/wp/v2/posts?${params}`;
};

// Get the path for a single page based on its ID or slug.
export const getPagePath = (id) => `wp-json/wp/v2/pages/${id}`;

// Get the path for multiple pages based on the query options.
export const getPagesPath = (queryOptions) => {
	const params = new URLSearchParams(queryOptions).toString();
	return `wp-json/wp/v2/pages?${params}`;
};

export const getCategoriesPath = (queryOptions) => {
	const params = new URLSearchParams(queryOptions).toString();
	return `wp-json/wp/v2/categories?${params}`;
};

export const getTagsPath = (queryOptions) => {
	const params = new URLSearchParams(queryOptions).toString();
	return `wp-json/wp/v2/tags?${params}`;
};

export const getUsersPath = (queryOptions) => {
	const params = new URLSearchParams(queryOptions).toString();
	return `wp-json/wp/v2/users?${params}`;
};

export const getMediaPath = (queryOptions) => {
	const params = new URLSearchParams(queryOptions).toString();
	return `wp-json/wp/v2/media?${params}`;
};

export const getCommentsPath = (queryOptions) => {
	const params = new URLSearchParams(queryOptions).toString();
	return `wp-json/wp/v2/comments?${params}`;
};
