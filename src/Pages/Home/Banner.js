import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../Assests/Banner.jpg";

const Banner = () => {
  return (
    <div
      style={{ background: `url(${banner1})` }}
      class="hero  bg-base-200 h-[80vh]"
    >
      <div class="hero-content text-center">
        <div class="md:max-w-md lg:max-w-2xl">
          <h1 class="text-4xl  text-white">Publish your passions, your way</h1>
          <h2 className="text-2xl mt-4 text-white">
            Create a unique and beautiful blog easily.
          </h2>
          <button className="bg-orange-500 uppercase font-[500] text-white px-6 py-4 mt-6 rounded-md">Create Your Blog</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
