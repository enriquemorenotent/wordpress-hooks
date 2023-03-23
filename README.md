# ReactPress

ReactPress is a collection of React hooks to easily fetch data from a WordPress REST API. It uses the React context API and the react-query library to fetch and manage the data.

## Features

- Simple to use React hooks for fetching WordPress data
- Built-in caching and data management with react-query
- Customizable API config

## Installation

```
npm install reactpress
```

## Usage

Wrap your app with the ReactPressProvider and provide an `apiConfig` object with the `apiUrl` property.

```js
import { ReactPressProvider } from 'reactpress';

const apiConfig = {
  apiUrl: 'https://example.com/wp-json',
};

ReactDOM.render(
  <React.StrictMode>
    <ReactPressProvider apiConfig={apiConfig}>
      <App />
    </ReactPressProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

```

Use the provided hooks to fetch WordPress data:

* usePost
* usePosts
* usePage
* usePages
* useCategories
* useTags
* useMedia
* useUsers
* useComments

```js
import { usePost, usePosts } from 'reactpress';

const Post = ({ id }) => {
  const { data: post, isLoading } = usePost(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <h1>{post.title.rendered}</h1>;
};

const Posts = () => {
  const { data: posts, isLoading } = usePosts({ per_page: 5 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title.rendered}</li>
      ))}
    </ul>
  );
};
```
## API

### Hooks

All hooks accept an optional queryOptions object for filtering the results.

* `usePost(id)` - Fetch a single post by ID or slug.
* `usePosts(queryOptions)` - Fetch multiple posts.
* `usePage(id)` - Fetch a single page by ID or slug.
* `usePages(queryOptions)` - Fetch multiple pages.
* `useCategories(queryOptions)` - Fetch multiple categories.
* `useTags(queryOptions)` - Fetch multiple tags.
* `useMedia(queryOptions)` - Fetch multiple media items.
* `useUsers(queryOptions)` - Fetch multiple users.
* `useComments(queryOptions)` - Fetch multiple comments.

### ReactPressProvider

The ReactPressProvider component should be used to wrap your app and provide the apiConfig object. The apiConfig object must include the apiUrl property.

### useReactPress

The useReactPress hook provides access to the ReactPress context. This can be useful for advanced usage or custom hooks.


## License

This project is licensed under the MIT License.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository on GitHub.
2. Clone the forked repository to your local machine.
3. Create a new branch for your feature or bugfix.
4. Make your changes in the new branch.
5. Commit and push your changes to the new branch.
6. Open a pull request on the original repository, comparing your branch to the main branch.

Please ensure that your code follows the existing coding style, and make sure to include tests and documentation for any new features.

## Support
If you encounter any issues or have questions, please open an issue on GitHub. We will do our best to address your concerns as quickly as possible.

## Acknowledgements
This project was inspired by and built upon the concepts from the WordPress REST API and the react-query library.