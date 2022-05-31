import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import profile from "../../Assests/download__3_-removebg-preview.png";
import auth from "../../firebase.init";
import UserData from "../../Hooks/UserData";
import CustomLink from "./CustomLink";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [users] = UserData()
  const handleSignOut = () => {
    signOut(auth);
  };
  const menuItems = (
    <>
      <a className="">
        <CustomLink to="/">Home</CustomLink>
      </a>
      {user && (
        <a className="lg:ml-3">
          <CustomLink to="/my-post">My post</CustomLink>
        </a>
      )}
      <a className="lg:ml-3">
        <CustomLink to="/add-blog">Add-Blogs</CustomLink>
      </a>
      {user ? (
        <button onClick={handleSignOut} className="lg:ml-3 font-[500]">
          logout
        </button>
      ) : (
        <a className="lg:ml-3">
          <CustomLink to="/login">Login</CustomLink>
        </a>
      )}
    </>
  );
  return (
    <div class="navbar bg-base-100">
      <div class="navbar-start w-full">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <a class="btn btn-ghost normal-case text-xl">Blogs</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal p-0 font-[500]">{menuItems}</ul>
      </div>
      {
        user && <div class="navbar-end">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class=" m-1">
            {
              users.img? <div className="avatar">   <div class="w-12 ring ring-primary rounded-full">
              <img src={users.img} />
            </div></div>: <div className="avatar"><div class="w-12 ring ring-primary rounded-full">
              <img src={profile} />
            </div></div>
            }
          </label>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to='/update-profile'>Update profile</Link>
            </li>
          </ul>
        </div>
      </div>
      }
    </div>
  );
};

export default Navbar;
