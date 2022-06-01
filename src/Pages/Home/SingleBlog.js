import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosPrivate from "../Api/axiosPrivate";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
   
  useEffect(()=>{
     axiosPrivate.get(`blog/${id}`)
     .then(res => {
         setBlog(res.data)
     }) 
  },[id])
  return (
    <div>
      <div class="card lg:card-side bg-base-100 shadow-xl mt-10">
        <figure>
          <img
          className="lg:w-[500px]"
            width="500px"
            src={blog.img}
            alt="Album"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{blog.title}</h2>
          <p>{blog.blog}</p>
          <p className="text-[15px] font-[500]">Author: <span className="text-orange-600 font-[500] uppercase">{blog.author}</span></p>
       <p className="text-gray-500 font-[400]">Published: <span>{blog.time}</span></p>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
