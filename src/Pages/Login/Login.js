import React from "react";
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import banner2 from "../../Assests/banner2.jpg";
import logo from "../../Assests/google-removebg-preview.png";
import auth from "../../firebase.init";
import useToken from "../../Hooks/useToken";
import Spinner from "../Shared/Spinner";

const Login = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        cUser,
        cLoading,
        cError,
      ] = useSignInWithEmailAndPassword(auth);
      const [sendPasswordResetEmail, sending, fError] = useSendPasswordResetEmail(
        auth
      );
    
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [token] = useToken(gUser || cUser)

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
 
  if (gLoading || cLoading) {
    return <Spinner />;
  }

 

  if (token) {
    navigate(from, { replace: true });
  }

  let signError;
  if (gError || cError) {
    signError = (
      <p className="text-red-500 mb-2">{gError?.message || cError?.message}</p>
    );
  }

  const onSubmit = (data) => {
      signInWithEmailAndPassword(data.email, data.password)
      reset()
  };

  const handleGoogleSign = () => {
    signInWithGoogle();
  };
  
  const email = watch().email;
  const forgotPassword = async () => {
    if(email){
        await sendPasswordResetEmail(email)
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'email sent',
            showConfirmButton: false,
            timer: 1500
          })
          reset()
    }
    else{
        Swal.fire({
            position: 'top-center',
            icon: 'error',
            title: 'provided email',
            showConfirmButton: false,
            timer: 1500
          })
    }
  }
  return (
    <div
      style={{ background: `url(${banner2})` }}
      class="hero min-h-screen bg-base-200"
    >
      <div class="">
        <div class="  shadow-2xl bg-base-100 rounded-xl">
          <div class="card-body md:w-[360px] ">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label class="label">
                  <span class="label-text">Email</span>
                </label>
                <input
                  {...register("email", {
                    required: {
                      value: true,
                      message: "email required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "provided valid email",
                    },
                  })}
                  type="email"
                  placeholder="email"
                  class="input input-bordered"
                />
                <label className="label">
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-600">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-600">
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <input
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password required",
                    },
                    minLength: {
                      value: 6,
                      message: "password must be 6 character",
                    },
                  })}
                  type="password"
                  placeholder="password"
                  class="input input-bordered"
                />
                <label className="label">
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-red-600">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="label-text-alt text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>
              </div>
              <label onClick={forgotPassword} class="label">
                <a href="#" class="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              {signError}
              <div class="form-control mt-6">
                <button class="bg-black text-white uppercase py-3 rounded">
                  Login
                </button>
              </div>
            </form>
            <div class="divider">OR</div>
            <div>
              <button onClick={handleGoogleSign} className="w-full rounded-full border-2 py-2 flex justify-evenly items-center uppercase font-[500]">
                Continue with google
                <img width={"30px"} src={logo} alt="" />
              </button>
            </div>
            <p className=" mt-5 text-center">
              You are new?<Link className="text-orange-600" to="/signup">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
