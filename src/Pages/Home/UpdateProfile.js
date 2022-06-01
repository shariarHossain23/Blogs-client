import axios from "axios";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import profile from "../../Assests/download__3_-removebg-preview.png";
import auth from "../../firebase.init";
import UserData from "../../Hooks/UserData";
import axiosPrivate from "../Api/axiosPrivate";
import Fotter from "../Shared/Fotter";

const UpdateProfile = () => {
  const [user] = useAuthState(auth);
  const [users] = UserData()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const img_key = "c694c4abb3bcf601b0b79494e815c533";

  const onSubmit = async (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    axios
      .post(`https://api.imgbb.com/1/upload?&key=${img_key}`, formData)
      .then((res) => {
        if (res.data.success) {
          const img = res.data.data.url;
          const userProfile = {
            user: data.name,
            img: img,
            email:user?.email
          };
          axiosPrivate.patch(`user/${user?.email}`,userProfile)
          .then(response =>{
           
              if(response.data.acknowledged === true){
                Swal.fire({
                  position: 'top center',
                  icon: 'success',
                  title: 'profile picture uploaded',
                  showConfirmButton: false,
                  timer: 2000
                })
                reset()
              }
          })
        }
      });
  };
  return (
    <div>
      <div className="lg:w-[30%] mx-auto sm:60%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="img" class="label">
            <span class="label-text mx-auto  font-[500] text-xl">
             {
               users.img?<div class="avatar">
               <div class="w-32 rounded-full ring ring-primary">
                 <img src={users.img} alt=""/>
               </div>
             </div> : <img src={profile} alt="" />
             
             }
             <p>Change photo</p>
            </span>
          </label>
          <input
            {...register("img", )}
            id="img"
            type="file"
            placeholder="Name"
            hidden
            class="input input-bordered"
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text-alt text-red-600">
                {errors.img?.message}
              </span>
            )}
          </label>
        </div>
        <div className="form-control">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input
            {...register("name", )}
            type="text"
            placeholder={user?.displayName}
            class="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label class="label">
            <span class="label-text">Email <span>(could no be change)</span></span>
          </label>
          <input
            {...register("email", )}
            type="text"
            readOnly
            placeholder={user?.email}
            class="input input-bordered"
          />
        </div>
        <div class=" mt-6">
          <button class="bg-green-600 text-white uppercase px-4 py-3 rounded">
            update
          </button>
        </div>
      </form>
    </div>
    <div className="lg:w-[30%] mx-auto sm:60%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="img" class="label">
            <span class="label-text mx-auto  font-[500] text-xl">
             {
               users.img?<div class="avatar">
               <div class="w-32 rounded-full ring ring-primary">
                 <img src={users.img} alt=""/>
               </div>
             </div> : <img src={profile} alt="" />
             
             }
             <p>Change photo</p>
            </span>
          </label>
          <input
            {...register("img", )}
            id="img"
            type="file"
            placeholder="Name"
            hidden
            class="input input-bordered"
          />
          <label className="label">
            {errors.name?.type === "required" && (
              <span className="label-text-alt text-red-600">
                {errors.img?.message}
              </span>
            )}
          </label>
        </div>
        <div className="form-control">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <input
            {...register("name", )}
            type="text"
            placeholder={user?.displayName}
            class="input input-bordered"
            readOnly
          />
        </div>
        <div className="form-control">
          <label class="label">
            <span class="label-text">Email <span>(could no be change)</span></span>
          </label>
          <input
            {...register("email", )}
            type="text"
            readOnly
            placeholder={user?.email}
            class="input input-bordered"
          />
        </div>
        <div class=" mt-6">
          <button class="bg-green-600 text-white uppercase px-4 py-3 rounded">
            update
          </button>
        </div>
      </form>
    </div>
    <Fotter/>
    </div>
  );
};

export default UpdateProfile;
