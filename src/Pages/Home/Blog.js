import React from "react";
import { useNavigate } from "react-router-dom";

const Blog = ({ blog }) => {
  const {title,blog:text,img,author,time,_id} = blog
  const navigate = useNavigate()
  return (
    <div>
      <div class="card max-w-sm bg-base-100 shadow-xl mt-10">
        <figure>
          <img
          className="h-[200px]"
            width="300px"
            src={img}
            alt="img"
          />
        </figure>
        <div class="card-body">
       <div className="">
       <p className="text-[15px] font-[500]">Author: <span className="text-orange-500 font-[500] uppercase">{author}</span></p>
       <p className="text-gray-600 font-[400]">Published: <span>{time}</span></p>
       </div>
          <h2 class="card-title">
            {title}
          </h2>
          <p>{text.slice(100)} <span onClick={()=>navigate(`/blog/${_id}`)} className="font-[500]">see more...</span></p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
