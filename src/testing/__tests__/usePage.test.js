import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactPressProvider } from '../../ReactPressProvider';
import { server } from '../utils/server';
import usePage from '../../usePage';

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

describe('usePage', () => {
	beforeAll(() => jest.spyOn(console, 'error').mockImplementation(() => {}));

	afterAll(() => console.error.mockRestore());

	it('should fetch a page by id', async () => {
		const { result } = renderHook(() => usePage(1), renderHookOptions);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).toBe('success'));

		expect(result.current.data).toEqual({
			id: 1,
			title: 'Sample Page',
			content: 'This is a sample page',
		});
	});

	// 404 case
	it('should return an error if the page is not found', async () => {
		const { result } = renderHook(() => usePage(2), renderHookOptions);

		expect(result.current.status).toBe('loading');

		await waitFor(() => expect(result.current.status).not.toBe('loading'));

		expect(result.current.status).toBe('error');
	});
});
