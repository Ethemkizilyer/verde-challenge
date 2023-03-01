import React from "react";
import { useNavigate } from "react-router";

const Card = ({ id, title, body, userId }) => {
  
  const navigate = useNavigate();
  return (
    <div
      className=" rounded p-4 shadow-md hover:border-blue-400 border-4 cursor-pointer"
      onClick={() => navigate(`/detail/${id}`)}
    >
      <h3 className="font-bold pb-4">{title}</h3>
      <p>{body?.slice(0, 100)}...</p>
    </div>
  );
};

export default Card;
