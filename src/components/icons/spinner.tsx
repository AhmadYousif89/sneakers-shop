export const SpinnerIcon = ({ className = '' }) => {
  return (
    <span
      aria-label="loading spinner"
      className={`${className} flex-center after:p-4 after:rounded-full after:absolute after:border-4 after:border-Light_grayish_blue  after:border-l-Dark_grayish_blue after:animate-spin`}
    />
  );
};
