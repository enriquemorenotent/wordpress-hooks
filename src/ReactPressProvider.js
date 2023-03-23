import React, { createContext, useContext, useMemo } from 'react';

// Create a context for the ReactPressProvider.
const ReactPressContext = createContext();

// ReactPressProvider component provides the ReactPressContext to its children.
const ReactPressProvider = ({ apiConfig, children }) => {
	const contextValue = useMemo(() => {
		if (!apiConfig || !apiConfig.apiUrl) {
			throw new Error(
				'ReactPressProvider requires the apiUrl property in apiConfig prop'
			);
		}

		return apiConfig;
	}, [apiConfig]);

	return (
		<ReactPressContext.Provider value={contextValue}>
			{children}
		</ReactPressContext.Provider>
	);
};

// useReactPress is a custom hook to access the ReactPressContext.
const useReactPress = () => {
	const context = useContext(ReactPressContext);

	if (!context) {
		throw new Error(
			'useReactPress must be used within a ReactPressProvider'
		);
	}

	return context;
};

export { ReactPressProvider, useReactPress };
