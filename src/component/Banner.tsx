import "./Banner.css";

const Banner = () => {
  return (
      <div className="banner-wrapper">
        <div className="banner-container">
          <div className="banner-text">
            Freeship đơn từ 45k, giảm nhiều hơn cùng
          </div>
          <picture className="webpimg-container">
            <img
              src="https://salt.tikicdn.com/ts/upload/a7/18/8c/910f3a83b017b7ced73e80c7ed4154b0.png"
              alt="icon"
              className="title-img"
            />
          </picture>
        </div>
      </div>
  );
};

export default Banner;
