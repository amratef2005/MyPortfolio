import React from 'react';
import ReactDOM from 'react-dom/client';
import { PortfolioProvider } from '../context/PortfolioContext';
import { AdminPage } from './AdminPage';
import '../index.css';

ReactDOM.createRoot(document.getElementById('admin-root')!).render(
  <React.StrictMode>
    <PortfolioProvider>
      <AdminPage />
    </PortfolioProvider>
  </React.StrictMode>
);