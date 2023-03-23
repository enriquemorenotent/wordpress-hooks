import { rest } from 'msw';
import { db } from './data';

const handlers = [
	rest.get('*/wp-json/wp/v2/posts/:id', (req, res, ctx) => {
		const { id } = req.params;

		if (id === '1')
			return res(
				ctx.status(200),
				ctx.json({
					id: parseInt(id, 10),
					title: 'Sample Post',
					content: 'This is a sample post',
				})
			);

		return res(ctx.status(404));
	}),
	rest.get('*/wp-json/wp/v2/pages/:id', (req, res, ctx) => {
		const { id } = req.params;

		if (id === '1')
			return res(
				ctx.status(200),
				ctx.json({
					id: parseInt(id, 10),
					title: 'Sample Page',
					content: 'This is a sample page',
				})
			);

		return res(ctx.status(404));
	}),
	rest.get('*/wp-json/wp/v2/posts', (req, res, ctx) => {
		const author = req.url.searchParams.get('author');
		const category = req.url.searchParams.get('categories');
		const tag = req.url.searchParams.get('tags');
		const per_page = req.url.searchParams.get('per_page');
		const orderby = req.url.searchParams.get('orderby');
		const order = req.url.searchParams.get('order');

		let filteredPosts = db.posts;

		if (author) {
			filteredPosts = filteredPosts.filter(
				(post) => post.author === parseInt(author, 10)
			);
		}

		if (category) {
			filteredPosts = filteredPosts.filter(
				(post) => post.category === category
			);
		}

		if (tag) {
			filteredPosts = filteredPosts.filter((post) => post.tag === tag);
		}

		if (orderby) {
			const orderMultiplier = order === 'asc' ? 1 : -1;
			filteredPosts.sort((a, b) => {
				if (a[orderby] < b[orderby]) {
					return -1 * orderMultiplier;
				} else if (a[orderby] > b[orderby]) {
					return 1 * orderMultiplier;
				}
				return 0;
			});
		}

		if (per_page) {
			filteredPosts = filteredPosts.slice(0, parseInt(per_page, 10));
		}

		return res(ctx.status(200), ctx.json(filteredPosts));
	}),
	rest.get('*/wp-json/wp/v2/pages', (req, res, ctx) => {
		const per_page = req.url.searchParams.get('per_page');
		const orderby = req.url.searchParams.get('orderby');
		const order = req.url.searchParams.get('order');

		let filteredPages = db.pages;

		if (orderby) {
			const orderMultiplier = order === 'asc' ? 1 : -1;
			filteredPages.sort((a, b) => {
				if (a[orderby] < b[orderby]) {
					return -1 * orderMultiplier;
				} else if (a[orderby] > b[orderby]) {
					return 1 * orderMultiplier;
				}
				return 0;
			});
		}

		if (per_page) {
			filteredPages = filteredPages.slice(0, parseInt(per_page, 10));
		}

		return res(ctx.status(200), ctx.json(filteredPages));
	}),
];

export { handlers };
