import { Button } from '../ui/button';

export const SearchSection = () => {
  return (
    <section className="relative bg-Orange pb-64 pt-32 xl:pb-96 xl:pt-40">
      <h2 className="text-4xl mb-16 mx-8 text-Light_grayish_blue text-center font-bold capitalize">
        search your favorite sneakers
      </h2>
      <div className="flex items-center justify-center mx-auto gap-4 xl:gap-8 xl:max-w-4xl">
        <label className="relative flex items-center cursor-pointer" htmlFor="search">
          <input
            id="search"
            type="text"
            placeholder="Type here"
            className="rounded-xl px-8 py-4 bg-Light_grayish_blue caret-Orange text-Dark_grayish_blue text-2xl placeholder:text-xl focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-Dark_grayish_blue focus-visible:outline-offset-0 xl:py-6 xl:px-16 xl:text-3xl xl:placeholder:text-2xl"
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
          className="overflow-hidden px-6 py-4 tracking-wider rounded-xl focus-visible:ring-2 focus-visible:ring-Light_grayish_blue bg-Very_dark_blue text-xl xl:text-2xl xl:py-6 xl:px-8">
          Search
        </Button>
      </div>

      {/* This will draw the wavy shape on the bottom of the section */}
      <div className="wave">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none">
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"></path>
        </svg>
      </div>
    </section>
  );
};
