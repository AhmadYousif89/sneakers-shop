import { Button } from '../ui/button';

export const PromoCodeInput = () => {
  return (
    <div className="flex justify-between items-center my-8 max-w-xl mx-auto xl:my-16">
      <input
        type="text"
        placeholder="Enter promo code"
        className="peer bg-Light_grayish_blue text-2xl text-Dark_grayish_blue rounded-tl-xl rounded-bl-xl py-4 px-8 flex-1 outline-none placeholder:text-Grayish_blue placeholder:text-xl focus-visible:outline focus-visible:outline-offset-0 focus-visible:outline-2 focus-visible:outline-Orange"
      />
      <Button
        hasRipple
        variant={'input_btn'}
        className="peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-Grayish_blue">
        Apply
      </Button>
    </div>
  );
};
