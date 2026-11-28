import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/app/App';
import { PortfolioProvider } from '@/app/providers/PortfolioContext';
import { AdminPageShell } from '@modules/admin';
import './index.css';

const path = window.location.pathname.toLowerCase();
const isAdminRoute = path === '/admin' || path === '/admin/' || path === '/admin.html';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {isAdminRoute ? (
      <PortfolioProvider>
        <AdminPageShell />
      </PortfolioProvider>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
