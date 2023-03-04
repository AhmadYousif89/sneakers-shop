import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SuccessIcon } from '../components/icons/success';
import { useCart } from '../context/cart.context';

export const Success = () => {
  const navigate = useNavigate();
  const {
    state: { cart },
  } = useCart();

  useEffect(() => {
    if (cart.length > 0) navigate('/checkout');
  }, []);

  return (
    <section className="my-40 mx-8 xl:my-60">
      <div className="grid justify-items-center items-center text-center gap-8">
        <h2 className="text-5xl leading-snug capitalize text-transparent bg-gradient-to-br from-Very_dark_blue via-green-400 to-Very_dark_blue bg-clip-text font-bold">
          thank you for your purchase
        </h2>
        <SuccessIcon className="w-96 h-96 stroke-indigo-400" />

        <p className="text-xl text-Grayish_blue space-x-2 xl:text-2xl xl:max-w-2xl">
          <span>
            For any queries about your order please contact our customer support at
          </span>
          <a
            className="text-blue-400 opacity-75 hover:opacity-100"
            href="mailto:support@sneakers.com">
            support@sneakers.com
          </a>
        </p>
      </div>
    </section>
  );
};
