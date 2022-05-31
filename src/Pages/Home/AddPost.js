import axios from "axios";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import auth from "../../firebase.init";
import axiosPrivate from "../Api/axiosPrivate";

const AddPost = () => {
    const [user]  = useAuthState(auth)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const img_key = "c694c4abb3bcf601b0b79494e815c533";
  
  const onSubmit = async (data) => {
    const image = data.img[0]
    const formData = new FormData();
    formData.append("image",image)
    axios.post(`https://api.imgbb.com/1/upload?&key=${img_key}`,formData)
    .then(res =>  {
        const date = new Date()
        const datetime = ` ${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}   ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()};`
        if(res.data.success){
            const img = res.data.data.url
            const blogs ={
                email:user?.email,
                author:user?.displayName,
                img:img,
                title:data.title,
                blog:data.textarea,
                time:datetime
            }

            axiosPrivate.post('blog',blogs)
            .then(result => {
                Swal.fire({
                    position: 'top center',
                    icon: 'success',
                    title: 'post success',
                    showConfirmButton: false,
                    timer: 1500
                  })
                reset()
            })
        }
    })
  };
  return (
    <div className="px-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="img" class="label">
            <span class="label-text flex items-center font-[500] text-xl">
              <span>Add image</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </span>
          </label>
          <input
            {...register("img", {
              required: {
                value: true,
                message: "image required",
              },
            })}
            id="img"
            type="file"
            placeholder="Name"
            hidden
            class="input input-bordered"
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text-alt text-red-600">
                {errors.img.message}
              </span>
            )}
          </label>
        </div>
        <div className="form-control">
          <label htmlFor="title" class="label">
            <span class="label-text text-2xl font-[500]"></span>
          </label>
          <input
            {...register("title", {
              required: {
                value: true,
                message: "title required",
              },
            })}
            id="title"
            type="text"
            placeholder="Title"
            class=" text-2xl outline-none text-black"
          />
          <label className="label">
            {errors.title?.type === "required" && (
              <span className="label-text-alt text-red-600">
                {errors.title.message}
              </span>
            )}
          </label>
        </div>
        <div className="form-control">
          <label class="label">
            <span class="label-text"></span>
          </label>
          <textarea
            {...register("textarea", {
              required: {
                value: true,
                message: "blogs required",
              },
            })}
            placeholder="Write here ..."
            class="h-[20vh] outline-none text-base"
            
          />
           
          <label className="label">
            {errors.textarea?.type === "required" && (
              <span className="label-text-alt text-red-600">
                {errors.textarea.message}
              </span>
            )}
          </label>
        </div>

        <div class=" flex justify-end mt-6">
          <button class="bg-green-600 text-white uppercase px-4 py-3 rounded">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
