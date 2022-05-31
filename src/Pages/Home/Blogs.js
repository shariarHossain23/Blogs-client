import React, { useState } from "react";
import { useQuery } from "react-query";
import axiosPrivate from "../Api/axiosPrivate";
import Spinner from "../Shared/Spinner";
import Blog from "./Blog";
import Recents from "./Recents";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { data, isLoading, refetch } = useQuery("blogs", () => {
    axiosPrivate.get("blog").then((response) => {
      setBlogs(response.data);
    })
  });
  
  if(isLoading){
      return <Spinner/>
  }

  return (
    <div className="lg:grid grid-cols-[70%,30%]">
      <div>
      <h1 className="text-4xl mt-10 text-center">all Blogs</h1>
        <div className="lg:grid grid-cols-2  mt-16">
          {blogs.map((blog) => (
            <Blog key={blog._id} blog={blog}></Blog>
          ))}
        </div>
      </div>
      <div className="">
        <Recents></Recents>
      </div>
    </div>
  );
};

export default Blogs;
