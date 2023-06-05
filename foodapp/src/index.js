import React from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './App';
import { UserProvider } from './UserContext'; // Import UserProvider
import './style/index.scss';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
  <UserProvider> {/* Add UserProvider wrapper */}
    <App />
  </UserProvider>
);
