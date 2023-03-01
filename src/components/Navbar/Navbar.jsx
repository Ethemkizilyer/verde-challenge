import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { bakarEdit } from "../../features/postSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  const navigate = useNavigate();
  return (
    <header className="bg-white container shadow-md m-auto mt-8 p-5 flex justify-between items-center">
      <div className="flex-shrink-0 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          viewBox="0 0 20 20"
          fill="blue"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
        <h1
          className="text-3xl font-bold cursor-pointer"
          onClick={() => {
            dispatch(bakarEdit());
            return navigate("/");
          }}
        >
          Arbit Blog
        </h1>
      </div>
      <nav className="flex gap-4 items-center">
        <h3
          className="text-2xl font-semibold relative cursor-pointer"
          onClick={() => {
            dispatch(bakarEdit());
            return navigate("/");
          }}
        >
          Posts
          <span className="absolute rounded-full bg-green-200 text-base left-11 bottom-6 w-5 h-5 flex justify-center items-center">
            {posts.length}
          </span>
        </h3>
        <button
          type="button"
          className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="sr-only">View notifications</span>

          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <button
          type="button"
          className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="sr-only">View notifications</span>

          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
        </button>

        <img
          className="rounded-full  cursor-pointer w-10 h-10"
          src="http://www.leblebitozu.com/wp-content/uploads/2015/11/neyzen-tevfik-5.jpg"
          alt="profile"
        />
        {/* <button onClick={() => navigate("/newPost")}>NEW BLOG</button> */}
      </nav>
    </header>
  );
};

export default Navbar;
