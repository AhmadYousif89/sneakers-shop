export const SkeletonItem = () => {
  return (
    <li
      className="w-96 min-h-[33rem] grid items-start gap-16 bg-Light_grayish_blue p-8 rounded-3xl shadow-sm animate-pulse"
      aria-hidden>
      <figure className="w-52 h-52 justify-self-center bg-Grayish_blue rounded-full"></figure>

      <div className="space-y-4">
        <h3 className="bg-Grayish_blue p-4 rounded-full"></h3>
        <p className="bg-Grayish_blue p-4 rounded-full w-2/3 mx-auto"></p>
        <p className="flex items-center justify-between">
          <span className="bg-Grayish_blue p-4 rounded-full w-1/2"></span>
          <button className="bg-Grayish_blue p-4 rounded-full"></button>
        </p>
      </div>
    </li>
  );
};
