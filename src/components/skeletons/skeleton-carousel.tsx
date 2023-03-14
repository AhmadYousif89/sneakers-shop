export const SkeletonCarousel = () => {
  return (
    <div className="xl:w-[47rem] animate-pulse">
      <div className="relative group">
        <figure className="relative flex items-center bg-Grayish_blue min-w-[40rem] min-h-[45rem] xl:rounded-3xl overflow-hidden">
          &nbsp;
        </figure>
      </div>

      <div className="hidden xl:flex items-center justify-between mt-16">
        {[...Array(4).keys()].map(idx => (
          <figure key={idx} className={`rounded-2xl bg-Grayish_blue`}>
            <div className="w-40 h-40">&nbsp;</div>
          </figure>
        ))}
      </div>
    </div>
  );
};
