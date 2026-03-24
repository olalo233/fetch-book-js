import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Create a div to mount the app
const appContainer = document.createElement('div');
appContainer.id = 'fetch-book-app';
document.body.appendChild(appContainer);

// Render the app using React Portal
ReactDOM.createRoot(appContainer).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
