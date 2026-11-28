import React from 'react';
import ReactDOM from 'react-dom/client';
import { PortfolioProvider } from '@/app/providers/PortfolioContext';
import { AdminPageShell } from '@modules/admin';
import '../index.css';

ReactDOM.createRoot(document.getElementById('admin-root')!).render(
  <React.StrictMode>
    <PortfolioProvider>
      <AdminPageShell />
    </PortfolioProvider>
  </React.StrictMode>
);
