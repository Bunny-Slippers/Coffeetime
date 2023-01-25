import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './components/App';
import '../public/styles.css';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <div>hello world</div>,
//   },
// ]);

const root = createRoot(document.getElementById('root'));

root.render(
  <div>
    <App />
  </div>
);
