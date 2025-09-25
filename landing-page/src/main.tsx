import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import { loadChatWidget } from './lib/chatWidget.ts';

// Preload the external chat widget script
// void loadChatWidget();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
