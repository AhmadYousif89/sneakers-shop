import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { ScrollToTop } from './components/ui/scroll-to-top';
import './index.css';

const container = document.getElementById('root') as HTMLElement;
const Root = ReactDOM.createRoot(container);

Root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </React.StrictMode>,
);
