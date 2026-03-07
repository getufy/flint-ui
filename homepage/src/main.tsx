import React from 'react';
import { createRoot } from 'react-dom/client';
import '../../src/theme.css';
import '../../src/theme-dark.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
