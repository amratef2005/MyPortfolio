import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PortfolioProvider } from './context/PortfolioContext';
import { AdminPage } from './admin/AdminPage';
import './index.css';

const path = window.location.pathname.toLowerCase();
const isAdminRoute = path === '/admin' || path === '/admin/' || path === '/admin.html';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isAdminRoute ? (
      <PortfolioProvider>
        <AdminPage />
      </PortfolioProvider>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
