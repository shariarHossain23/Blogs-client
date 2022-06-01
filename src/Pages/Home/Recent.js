import React from "react";
import { useNavigate } from "react-router-dom";

const Recent = ({ recent }) => {
  const { title, img, _id } = recent;
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`blog/${_id}`)}>
    <img className="h-[200px]" src={img} alt="img" />
    <p className="bg-green-600 font-[500] text-xl">{title}</p>
</div>
   
  );
};

export default Recent;
