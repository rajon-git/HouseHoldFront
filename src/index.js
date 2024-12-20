import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import { Toaster } from 'react-hot-toast';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(

  <Provider store={store}>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        success: {
          duration: 3000,
          style: { background: 'green', color: 'white' },
        },
        error: {
          duration: 5000,
          style: { background: 'red', color: 'white' },
        },
      }}
    />
  </Provider>
 
);

