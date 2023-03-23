import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactPressProvider } from '../../ReactPressProvider';
import { server } from '../utils/server';
import usePost from '../../usePost';

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

describe('usePost', () => {
	beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {}));

	afterAll(() => console.error.mockRestore());

	it('should fetch a post by id', async () => {
		const { result } = renderHook(() => usePost(1), renderHookOptions);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).toBe('success'));

		expect(result.current.data).toEqual({
			id: 1,
			title: 'Sample Post',
			content: 'This is a sample post',
		});
	});

	// 404 case
	it('should return an error if the post is not found', async () => {
		const { result } = renderHook(() => usePost(2), renderHookOptions);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).not.toBe('loading'));

		expect(result.current.status).toBe('error');
	});
});
