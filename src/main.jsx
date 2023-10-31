import React from 'react';
import ReactDOM from 'react-dom/client';
import SettingsProvider from './context/Settings/SettingsProvider';
import '@mantine/core/styles.css'

import { MantineProvider} from '@mantine/core';

import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SettingsProvider>
      <MantineProvider>
         <App />
      </MantineProvider>
    </SettingsProvider>
  </React.StrictMode>
);
