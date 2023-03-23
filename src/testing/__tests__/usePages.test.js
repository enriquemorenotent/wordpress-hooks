import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactPressProvider } from '../../ReactPressProvider';
import { server } from '../utils/server';
import { createSamplePage, createSamplePost } from '../utils/data';
import usePages from '../../usePages';

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

describe('usePages', () => {
	beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {}));

	afterAll(() => console.error.mockRestore());

	it('should fetch all pages', async () => {
		const { result } = renderHook(() => usePages(), renderHookOptions);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).toBe('success'));

		expect(result.current.data).toHaveLength(9);
		expect(result.current.data).toEqual([
			createSamplePage(1, 1, 'tag1', 'category1'),
			createSamplePage(2, 1, 'tag1', 'category2'),
			createSamplePage(3, 1, 'tag2', 'category1'),
			createSamplePage(4, 1, 'tag2', 'category2'),
			createSamplePage(5, 2, 'tag1', 'category1'),
			createSamplePage(6, 2, 'tag1', 'category2'),
			createSamplePage(7, 2, 'tag2', 'category1'),
			createSamplePage(8, 2, 'tag2', 'category2'),
			createSamplePage(9, 3, 'tag1', 'category1'),
		]);
	});

	it('should fetch pages with a limit on the number of items per page', async () => {
		const { result } = renderHook(
			() => usePages({ per_page: 3 }),
			renderHookOptions
		);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).toBe('success'));

		expect(result.current.data).toHaveLength(3);

		expect(result.current.data).toEqual([
			createSamplePage(1, 1, 'tag1', 'category1'),
			createSamplePage(2, 1, 'tag1', 'category2'),
			createSamplePage(3, 1, 'tag2', 'category1'),
		]);
	});

	it('should fetch pages sorted by date in ascending order', async () => {
		const { result } = renderHook(
			() => usePages({ orderby: 'date', order: 'asc' }),
			renderHookOptions
		);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).toBe('success'));

		const sortedData = [...result.current.data].sort((a, b) => {
			return new Date(a.date) - new Date(b.date);
		});

		expect(result.current.data).toEqual(sortedData);
	});

	it('should fetch pages sorted by date in descending order', async () => {
		const { result } = renderHook(
			() => usePages({ orderby: 'date', order: 'desc' }),
			renderHookOptions
		);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).toBe('success'));

		const sortedData = [...result.current.data].sort((a, b) => {
			return new Date(b.date) - new Date(a.date);
		});

		expect(result.current.data).toEqual(sortedData);
	});
});
