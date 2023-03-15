import { Route, Routes } from 'react-router-dom';

import { NotFound } from './pages/404.page';
import { Checkout } from './pages/checkout.page';
import { Product } from './pages/product.page';
import { Success } from './pages/success.page';
import { Orders } from './pages/orders.page';
import { Home } from './pages/home.page';

import { Shop } from './components/shop';

function App() {
  return (
    <Routes>
      <Route element={<Shop />}>
        {['/', 'home'].map(route => (
          <Route key={route} path={route} element={<Home />} />
        ))}
        <Route path="product" element={<Product />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="orders/:id" element={<Orders />} />
        <Route path="checkout/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
