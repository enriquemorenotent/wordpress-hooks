const posts = [
	// author, tag, category
	[1, 'tag1', 'category1'],
	[1, 'tag1', 'category2'],
	[1, 'tag2', 'category1'],
	[1, 'tag2', 'category2'],
	[2, 'tag1', 'category1'],
	[2, 'tag1', 'category2'],
	[2, 'tag2', 'category1'],
	[2, 'tag2', 'category2'],
	[3, 'tag1', 'category1'],
];

const pages = [
	// author, tag, category
	[1, 'tag1', 'category1'],
	[1, 'tag1', 'category2'],
	[1, 'tag2', 'category1'],
	[1, 'tag2', 'category2'],
	[2, 'tag1', 'category1'],
	[2, 'tag1', 'category2'],
	[2, 'tag2', 'category1'],
	[2, 'tag2', 'category2'],
	[3, 'tag1', 'category1'],
];

const createDateFromId = (id) => new Date(2023, 0, id).toISOString();

const createSampleEntry = (type) => (id, author, tag, category) => ({
	id,
	type,
	title: `Sample ${type} ${id}`,
	content: `This is a sample post ${id}`,
	author,
	category,
	tag,
	date: createDateFromId(id),
});

export const createSamplePost = createSampleEntry('post');
export const createSamplePage = createSampleEntry('page');

export const db = {
	posts: posts.map((post, id) => createSamplePost(id + 1, ...post)),
	pages: pages.map((page, id) => createSamplePage(id + 1, ...page)),
};
