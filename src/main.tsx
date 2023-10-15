import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import UiLoader from './components/ui/UiLoader';
import './index.css';
import getStore from './modules';
import router from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <Provider store={getStore()}>
    <Suspense fallback={<UiLoader />}>
      <RouterProvider router={router} />
    </Suspense>
    </Provider>
  </React.StrictMode>,
);
