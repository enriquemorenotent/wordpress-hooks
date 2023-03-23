import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactPressProvider } from '../../ReactPressProvider';
import { server } from '../utils/server';
import { createSamplePost } from '../utils/data';
import usePosts from '../../usePosts';

const retry = false; // Disable retries for testing
const queries = { retry };
const defaultOptions = { queries };
const queryClient = new QueryClient({ defaultOptions });

const TestWrapper = ({ children, apiUrl = 'http://localhost' }) => (
	<QueryClientProvider client={queryClient}>
		<ReactPressProvider apiConfig={{ apiUrl }}>
			{children}
		</ReactPressProvider>
	</QueryClientProvider>
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderHookOptions = { wrapper: TestWrapper };

describe('usePosts', () => {
	beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {}));

	afterAll(() => console.error.mockRestore());

	it('should fetch posts by author', async () => {
		const { result } = renderHook(
			() => usePosts({ author: 1 }),
			renderHookOptions
		);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).toBe('success'));

		expect(result.current.data).toEqual([
			{
				id: 1,
				title: 'Sample post 1',
				content: 'This is a sample post 1',
				author: 1,
				category: 'category1',
				tag: 'tag1',
				date: '2022-12-31T23:00:00.000Z',
				type: 'post',
			},
			{
				id: 2,
				title: 'Sample post 2',
				content: 'This is a sample post 2',
				author: 1,
				category: 'category2',
				tag: 'tag1',
				date: '2023-01-01T23:00:00.000Z',
				type: 'post',
			},
			{
				id: 3,
				title: 'Sample post 3',
				content: 'This is a sample post 3',
				author: 1,
				category: 'category1',
				tag: 'tag2',
				date: '2023-01-02T23:00:00.000Z',
				type: 'post',
			},
			{
				id: 4,
				title: 'Sample post 4',
				content: 'This is a sample post 4',
				author: 1,
				category: 'category2',
				tag: 'tag2',
				date: '2023-01-03T23:00:00.000Z',
				type: 'post',
			},
		]);
	});

	it('should fetch posts by category', async () => {
		const { result } = renderHook(
			() => usePosts({ category: 'category1' }),
			renderHookOptions
		);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).toBe('success'));

		expect(result.current.data).toEqual([
			createSamplePost(1, 1, 'tag1', 'category1'),
			createSamplePost(2, 1, 'tag1', 'category2'),
			createSamplePost(3, 1, 'tag2', 'category1'),
			createSamplePost(4, 1, 'tag2', 'category2'),
			createSamplePost(5, 2, 'tag1', 'category1'),
			createSamplePost(6, 2, 'tag1', 'category2'),
			createSamplePost(7, 2, 'tag2', 'category1'),
			createSamplePost(8, 2, 'tag2', 'category2'),
			createSamplePost(9, 3, 'tag1', 'category1'),
		]);
	});

	it('should fetch posts by tag', async () => {
		const { result } = renderHook(
			() => usePosts({ tag: 'tag1' }),
			renderHookOptions
		);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).toBe('success'));

		expect(result.current.data).toEqual([
			createSamplePost(1, 1, 'tag1', 'category1'),
			createSamplePost(2, 1, 'tag1', 'category2'),
			createSamplePost(3, 1, 'tag2', 'category1'),
			createSamplePost(4, 1, 'tag2', 'category2'),
			createSamplePost(5, 2, 'tag1', 'category1'),
			createSamplePost(6, 2, 'tag1', 'category2'),
			createSamplePost(7, 2, 'tag2', 'category1'),
			createSamplePost(8, 2, 'tag2', 'category2'),
			createSamplePost(9, 3, 'tag1', 'category1'),
		]);
	});

	it('should fetch posts by author, category, and tag', async () => {
		const { result } = renderHook(
			() =>
				usePosts({
					author: '1',
					categories: 'category1',
					tags: 'tag1',
				}),
			renderHookOptions
		);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).toBe('success'));

		expect(result.current.data).toEqual([
			createSamplePost(1, 1, 'tag1', 'category1'),
		]);
	});

	it('should fetch posts with a limit on the number of items per page', async () => {
		const { result } = renderHook(
			() => usePosts({ per_page: 4 }),
			renderHookOptions
		);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).toBe('success'));

		expect(result.current.data).toHaveLength(4);

		// You can also check if the fetched posts have the correct properties and values
		// according to the per_page limit and the data in your mock server.
		expect(result.current.data).toEqual([
			createSamplePost(1, 1, 'tag1', 'category1'),
			createSamplePost(2, 1, 'tag1', 'category2'),
			createSamplePost(3, 1, 'tag2', 'category1'),
			createSamplePost(4, 1, 'tag2', 'category2'),
		]);
	});

	it('should fetch posts sorted by date in ascending order', async () => {
		const { result } = renderHook(
			() => usePosts({ orderby: 'date', order: 'asc' }),
			renderHookOptions
		);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).toBe('success'));

		const sortedData = [...result.current.data].sort((a, b) => {
			return new Date(a.date) - new Date(b.date);
		});

		expect(result.current.data).toEqual(sortedData);
	});

	it('should fetch posts sorted by date in descending order', async () => {
		const { result } = renderHook(
			() => usePosts({ orderby: 'date', order: 'desc' }),
			renderHookOptions
		);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).toBe('success'));

		const sortedData = [...result.current.data].sort((a, b) => {
			return new Date(b.date) - new Date(a.date);
		});

		expect(result.current.data).toEqual(sortedData);
	});

	it('should fetch posts with filtering, sorting, and pagination', async () => {
		const { result } = renderHook(
			() =>
				usePosts({
					author: 1,
					categories: 'category1',
					tags: 'tag1',
					per_page: 2,
					orderby: 'date',
					order: 'asc',
				}),
			renderHookOptions
		);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).toBe('success'));

		expect(result.current.data).toEqual([
			createSamplePost(1, 1, 'tag1', 'category1'),
		]);
	});

	it('should return an empty array if no posts match the query', async () => {
		const { result } = renderHook(
			() => usePosts({ author: 22 }),
			renderHookOptions
		);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).toBe('success'));

		expect(result.current.data).toEqual([]);
	});
});
