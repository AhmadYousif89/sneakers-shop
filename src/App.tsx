import { Route, Routes } from 'react-router-dom';

import { Shop } from './components/shop';
import { RequireAuth } from './components/auth/require-auth';
import { NotFound, Checkout, Product, Success, Orders, Home, Auth } from './pages';

function App() {
  return (
    <Routes>
      <Route element={<Shop />}>
        <Route index element={<Home />} />
        <Route path={'home'} element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="checkout" element={<Checkout />} />

        <Route element={<RequireAuth />}>
          <Route path="orders/:oId" element={<Orders />} />
          <Route path="checkout/success" element={<Success />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
