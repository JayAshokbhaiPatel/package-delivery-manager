import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { PackagesProvider } from '@components/PackagesContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PackagesProvider>
      <App />
    </PackagesProvider>
  </StrictMode>,
);
