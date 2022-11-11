import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import '_/config/firebase'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
    <App />
  </React.StrictMode>
);

serviceWorkerRegistration.register();