import {
  useRef,
  useState,
  forwardRef,
  ForwardedRef,
  PointerEventHandler,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from 'react';
import { Link } from 'react-router-dom';
import { VariantProps, cva } from 'cva';
import { cm } from '../../utils/class-merger';

type Ripple = { size: number; x: number; y: number };
type LinkHrefs = '/home' | '/product' | '/success' | '/checkout' | '/' | '';

interface ButtonAttributes extends ButtonHTMLAttributes<HTMLButtonElement> {}
interface LinkAttributes extends AnchorHTMLAttributes<HTMLAnchorElement> {}

// prettier-ignore
type ButtonProps = {
  href?: LinkHrefs;
  hasRipple?:boolean;
} & ButtonAttributes & LinkAttributes & VariantProps<typeof buttonVariants>;

const buttonVariants = cva(
  'relative block text-2xl text-Light_grayish_blue text-center transition-all outline-none outline-offset-0 focus:outline-none focus-visible:outline-offset-0 focus-visible:outline-1 focus-visible:outline-Dark_grayish_blue',
  {
    variants: {
      variant: {
        cart_chk:
          'overflow-hidden bg-Orange px-3 py-6 rounded-xl font-bold capitalize active:translate-y-px max-w-xl mx-auto xl:text-3xl',
        input_btn:
          'bg-Orange focus-visible:outline focus-visible:outline-2 focus-visible:outline-Light_grayish_blue px-8 py-4 overflow-hidden rounded-tr-xl rounded-br-xl font-bold transition-transform',
        hero: 'overflow-hidden transition-transform text-2xl py-4 px-6 capitalize rounded-xl shadow-xl bg-gradient-to-br from-Dark_grayish_blue to-Very_dark_blue focus-visible:outline focus-visible:outline-Light_grayish_blue',
        hero_main:
          'overflow-hidden font-orbitron tracking-wider ring-2 ring-Light_grayish_blue px-6 py-10 capitalize text-3xl rounded-lg hover:ring-Orange focus-visible:bg-Orange focus-visible:ring-0',
        category:
          'text-xl text-Grayish_blue capitalize px-6 py-4 bg-Light_grayish_blue rounded-full focus-visible:outline-1 focus-visible:outline-Dark_grayish_blue focus-visible:bg-transparent focus-visible:text-Very_dark_blue aria-pressed:outline aria-pressed:outline-1 aria-pressed:outline-Dark_grayish_blue aria-pressed:bg-transparent aria-pressed:text-Very_dark_blue',
        navigation:
          'bg-Grayish_blue/50 p-2 rounded-xl flex-center fill-Very_dark_blue hover:fill-Dark_grayish_blue focus-visible:fill-Dark_grayish_blue focus-visible:outline-1 focus-visible:outline-Very_dark_blue',
        profile:
          'flex-1 flex items-center justify-center text-2xl font-bold text-Grayish_blue capitalize xl:border-r-2 xl:border-Grayish_blue text-center last:pr-0 last:border-0 hover:text-Dark_grayish_blue aria-pressed:text-Dark_grayish_blue',
        profile_del:
          'scale-75 rounded-md bg-Orange/25 p-3 hover:ring-1 hover:ring-Dark_grayish_blue',
        caruosel:
          'bg-Light_grayish_blue p-2 rounded-full focus-visible:outline-2 focus-visible:outline-Light_grayish_blue focus-visible:bg-transparent',
        modal_btns:
          'text-2xl text-Dark_grayish_blue capitalize min-w-[9rem] tracking-wide ring-2 ring-Light_grayish_blue px-6 py-3 rounded-md transition-colors duration-200 hover:ring-0 hover:text-white',
      },
      size: {},
    },
  },
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ href = '', hasRipple, variant, size, className, ...props }, ref) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const timeoutRef = useRef<number | undefined>();

    const onPointerDown: PointerEventHandler<HTMLButtonElement | HTMLAnchorElement> = e => {
      e.preventDefault();
      if (!hasRipple) return;

      const button = e.currentTarget;
      const rippleSize = Math.max(button.offsetWidth, button.offsetHeight);
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rippleSize / 2;
      const y = e.clientY - rect.top - rippleSize / 2;
      const ripple: Ripple = { size: rippleSize, x, y };
      setRipples(pv => [...pv, ripple]);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setRipples([]);
      }, 1000);
    };

    const ripElements = ripples.map((ripple, idx) => (
      <span
        key={idx}
        className="absolute bg-Pale_orange rounded-full pointer-events-none animate-ripple"
        style={{
          top: ripple.y,
          left: ripple.x,
          width: ripple.size,
          height: ripple.size,
        }}
      />
    ));

    if (href) {
      return (
        <Link
          to={href}
          onPointerDown={onPointerDown}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          className={cm(buttonVariants({ variant, size, className }))}
          {...props}>
          {props.children}
          {ripElements}
        </Link>
      );
    }

    return (
      <button
        ref={ref as ForwardedRef<HTMLButtonElement>}
        onPointerDown={onPointerDown}
        className={cm(buttonVariants({ variant, size, className }))}
        {...props}>
        {props.children}
        {ripElements}
      </button>
    );
  },
);
