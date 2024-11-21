import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Or wherever your global styles are located

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(<App />);
