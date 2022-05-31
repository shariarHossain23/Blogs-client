import React from "react";

const MypostCard = ({ post,setDelete }) => {
  const { title, blog: text, img, author, time, _id } = post;
  return (
    <div>
      <div>
        <div class="card lg:card-side bg-base-100 shadow-xl mt-10">
          <figure>
            <img className="lg:w-[500px]" width="500px" src={img} alt="Album" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">{title}</h2>
            <p>{text}</p>
            <p className="text-[15px] font-[500]">
              Author:{" "}
              <span className="text-orange-500 font-[500] uppercase">
                {author}
              </span>
            </p>
            <p className="text-gray-500 font-[400]">
              Published: <span>{time}</span>
            </p>
            <div className="">
         
              <label onClick={()=>setDelete(post)} for="delete-modal" class="flex justify-end">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 bg-red-500 rounded-full text-gray-800 "
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </label>
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypostCard;
