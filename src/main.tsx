import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartCtxProvider } from './context/cart.context';
import { ProductCtxProvider } from './context/products.context';
import { UICtxProvider } from './context/ui.context';
import { UserCtxProvider } from './context/user.context';
import './index.css';

const container = document.getElementById('root') as HTMLElement;
const Root = ReactDOM.createRoot(container);

Root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductCtxProvider>
        <UserCtxProvider>
          <CartCtxProvider>
            <UICtxProvider>
              <App />
            </UICtxProvider>
          </CartCtxProvider>
        </UserCtxProvider>
      </ProductCtxProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
