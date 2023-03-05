import { Button } from '../ui/button';

export const SearchSection = () => {
  return (
    <section className="bg-Orange py-32 xl:py-52">
      <h2 className="text-4xl mb-16 text-Light_grayish_blue text-center font-bold capitalize">
        search your favorite sneakers
      </h2>
      <div className="flex items-center w-10/12 gap-4 mx-auto xl:gap-8 xl:max-w-4xl">
        <label
          className="relative w-full flex items-center cursor-pointer"
          htmlFor="search">
          <input
            id="search"
            type="text"
            placeholder="Type here"
            className="w-full rounded-xl px-8 py-4 bg-Light_grayish_blue caret-Orange text-Dark_grayish_blue text-2xl placeholder:text-xl focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-Dark_grayish_blue focus-visible:outline-offset-0 xl:py-6 xl:px-16 xl:text-3xl xl:placeholder:text-2xl"
          />
          <svg
            aria-labelledby="search"
            className="absolute w-10 h-10 border-l-Grayish_blue border-l-2 right-5 pl-2 stroke-Orange xl:w-14 xl:h-14 xl:pl-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </label>

        <Button
          hasRipple
          className="overflow-hidden pl-4 pr-8 py-4 tracking-wider rounded-xl focus-visible:ring-2 focus-visible:ring-Light_grayish_blue bg-Very_dark_blue xl:pl-6 xl:py-6">
          Search
        </Button>
      </div>
    </section>
  );
};
