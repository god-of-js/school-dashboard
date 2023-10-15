import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import UiLoader from './components/ui/UiLoader';
import './index.css';
import router from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<UiLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
);
