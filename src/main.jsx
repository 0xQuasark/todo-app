import React from 'react';
import ReactDOM from 'react-dom/client';
import SettingsProvider from './context/Settings/SettingsProvider';
import '@mantine/core/styles.css'

import { BrowserRouter, Route, Link } from 'react-router-dom';

import { MantineProvider} from '@mantine/core';
import AuthProvider from './context/auth/AuthProvider.jsx'
import Auth from './Components/Auth/Auth'

import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <MantineProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </MantineProvider>
      </SettingsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
