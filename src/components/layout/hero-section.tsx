import heroImg from '../../assets/images/h2-400.png';
import heroImgWide from '../../assets/images/main-h.png';
import { Button } from '../ui/button';

export const HeroSection = () => {
  return (
    <>
      <div className="hidden xl:grid grid-cols-[.80fr,1fr] bg-gradient-to-br from-Very_dark_blue via-neutral-900 to-Very_dark_blue/95">
        <figure className="col-start-2 row-span-full">
          <img src={heroImgWide} alt="main hero image" />
        </figure>

        <div className="pl-20 text-Light_grayish_blue col-span-full row-start-1 flex flex-col gap-60">
          <h2 className="font-orbitron pt-40 translate-y-16 font-bold text-[15rem] italic text-transparent uppercase bg-gradient-to-br from-Very_dark_blue/5 via-Orange to-Very_dark_blue/5 bg-clip-text">
            sneakers
          </h2>

          <div className="max-w-5xl space-y-16 px-4 pb-20">
            <p className="text-3xl leading-snug first-letter:text-Orange first-letter:text-5xl first-letter:pr-1">
              Unleash Your Sneaker Obsession and Stay Ahead of the Game with Our new
              <span className="text-5xl text-Orange font-bold px-2">Premium</span>
              selection of the Most Coveted Sneakers, Rare Finds, and Must-Have Releases !
            </p>

            <Button hasRipple variant={'hero_main'}>
              start shopping
            </Button>
          </div>
        </div>
      </div>

      <figure className="bg-Very_dark_blue">
        <img
          className={`min-h-[40rem] max-h-[80rem] w-full object-cover xl:hidden`}
          src={heroImg}
          alt="hero sneaker"
        />
      </figure>
    </>
  );
};
