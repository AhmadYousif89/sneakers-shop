import { Button } from '../ui/button';
import wide from '../../assets/images/h2-1440.png';
import small from '../../assets/images/h1-1000.png';
import side from '../../assets/images/side.png';

export const NewsletterSection = () => {
  return (
    <section className="bg-Very_dark_blue ">
      <figure>
        <img src={small} alt="newsletter image" className="xl:hidden" />
        <img src={wide} alt="newsletter image" className="hidden xl:block" />
      </figure>

      <div className="grid xl:grid-cols-[50rem,1fr] items-center justify-items-center">
        <figure className="hidden xl:block">
          <img src={side} alt="newsletter image" />
        </figure>

        <div className="text-Light_grayish_blue mx-8 py-40">
          <h2 className="text-3xl text-center capitalize">signup for our newsletter</h2>

          <div className="flex justify-between items-center mt-16">
            <input
              type="text"
              placeholder="Enter your email"
              className="bg-Light_grayish_blue text-2xl text-Dark_grayish_blue rounded-tl-xl rounded-bl-xl py-4 px-12 flex-1 outline-none placeholder:text-Grayish_blue placeholder:text-2xl focus-visible:outline focus-visible:outline-offset-0 focus-visible:outline-2 focus-visible:outline-Orange peer"
            />
            <Button
              hasRipple
              variant={'input_btn'}
              className="peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-Light_grayish_blue">
              Signup
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
