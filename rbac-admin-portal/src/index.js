import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { CssBaseline } from '@mui/material';

// Mock API initialization (MirageJS)
import './mock-api/mockServer';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
