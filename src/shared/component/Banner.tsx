const Banner = () => {
  return (
    <div className="relative w-full hidden sm:block">
      <div className="bg-green-100 p-2 flex items-center justify-center gap-2">
        <div className="text-green-600 text-center">
          Freeship đơn từ 45k, giảm nhiều hơn cùng
        </div>
        <picture className="flex items-center">
          <img
            src="https://salt.tikicdn.com/ts/upload/a7/18/8c/910f3a83b017b7ced73e80c7ed4154b0.png"
            alt="icon"
            className="max-w-[80px] h-auto"
          />
        </picture>
      </div>
    </div>
  );
};

export default Banner;
