import {
  useRef,
  useState,
  TouchEvent,
  MouseEvent,
  forwardRef,
  ForwardedRef,
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from 'react';
import { Link } from 'react-router-dom';
import { VariantProps, cva } from 'cva';
import { cm } from '../../utils/class-merger';

type Ripple = { size: number; x: number; y: number };
type LinkHrefs = '/home' | '/product' | '/success' | '/checkout' | '/' | '';

type Events =
  | MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  | TouchEvent<HTMLButtonElement | HTMLAnchorElement>;

interface ButtonAttributes extends ButtonHTMLAttributes<HTMLButtonElement> {}
interface LinkAttributes extends AnchorHTMLAttributes<HTMLAnchorElement> {}

//prettier-ignore
type ButtonProps = {
  href?: LinkHrefs;
  hasRipple?:boolean;
} & ButtonAttributes &
  LinkAttributes &
  VariantProps<typeof buttonVariants>;

const buttonVariants = cva(
  'relative block text-2xl text-Light_grayish_blue text-center transition-all focus-visible:outline-none focus-visible:outline-offset-0',
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
          'text-xl text-Grayish_blue capitalize px-6 py-4 bg-Light_grayish_blue rounded-full focus-visible:outline-1 focus-visible:outline-Dark_grayish_blue focus-visible:bg-transparent focus-visible:text-Very_dark_blue aria-selected:outline aria-selected:outline-1 aria-selected:outline-Dark_grayish_blue aria-selected:bg-transparent aria-selected:text-Very_dark_blue',
        navigation:
          'bg-slate-100 p-2 rounded-xl flex-center fill-Very_dark_blue hover:fill-Dark_grayish_blue focus-visible:fill-Dark_grayish_blue focus-visible:outline-1 focus-visible:outline-Very_dark_blue',
        profile:
          'text-2xl font-bold text-Grayish_blue capitalize border-r-2 border-Grayish_blue text-center w-full last:pr-0 last:border-0 hover:text-Dark_grayish_blue aria-pressed:text-Dark_grayish_blue',
        caruosel:
          'bg-Light_grayish_blue p-2 rounded-full focus-visible:outline-Light_grayish_blue focus-visible:bg-transparent',
      },
      size: {},
    },
  },
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ href = '', hasRipple, variant, size, className, ...props }, ref) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const timeoutRef = useRef<number | undefined>();

    const handleRippleEvent = (e: Events) => {
      if (!e.currentTarget || !hasRipple) return;

      const button = e.currentTarget;
      const size = Math.max(button.offsetWidth, button.offsetHeight);
      let x = 0;
      let y = 0;

      if ('clientX' in e) {
        const rect = button.getBoundingClientRect();
        x = e.clientX - rect.left - size / 2;
        y = e.clientY - rect.top - size / 2;
        const ripple: Ripple = { size, x, y };
        setRipples(pv => [...pv, ripple]);
      }

      if ('touches' in e) {
        const rect = button.getBoundingClientRect();
        x = e.touches[0].clientX - rect.left - size / 2;
        y = e.touches[0].clientY - rect.top - size / 2;
        const ripple: Ripple = { size, x, y };
        setRipples(pv => [...pv, ripple]);
      }
    };

    const handleMouseDown = (e: Events) => {
      handleRippleEvent(e);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setRipples([]);
      }, 1000);
    };
    const handleTouchStart = (e: Events) => {
      handleRippleEvent(e);
    };

    if (href) {
      return (
        <Link
          {...props}
          to={href}
          // onMouseDown={e => handleMouseDown(e)}
          // onTouchStart={handleTouchStart}
          // onTouchEnd={() => setRipples([])}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
          className={cm(buttonVariants({ variant, size, className }))}>
          {props.children}
          {ripples.map((ripple, idx) => (
            <span
              key={idx}
              className="absolute bg-Pale_orange rounded-full animate-ripple"
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}
        </Link>
      );
    }

    return (
      <button
        {...props}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        // onMouseDown={handleMouseDown}
        // onTouchStart={handleTouchStart}
        // onTouchEnd={() => setRipples([])}
        className={cm(buttonVariants({ variant, size, className }))}>
        {props.children}
        {ripples.map((ripple, idx) => (
          <span
            key={idx}
            className="absolute bg-white rounded-full animate-ripple"
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </button>
    );
  },
);
