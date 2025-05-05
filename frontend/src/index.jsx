// frontend/src/index.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          duration: 3000,
          theme: {
            primary: '#4CAF50',
          },
        },
        error: {
          duration: 4000,
          theme: {
            primary: '#E53E3E',
          },
        },
      }}
    />
    <App />
  </React.StrictMode>
);
