import Card from "../components/Card/Card";
import Loading from "../assets/loading.gif";
import axios from "axios";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../features/postSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, bakar } = useSelector((state) => state.posts);

  useEffect(() => {
    // get();
    !bakar && dispatch(getPosts());
    // setAsd(posts)
  }, [dispatch]);

  const getPost = async () => {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=1`;
    const { data } = await axios(url);
    setAsd(data);
    return data;
  };
  const [asd, setAsd] = useState([]);
  const { loading, addedPost } = useSelector((state) => state.posts);

  useEffect(() => {
    getPost();
    setAsd([...asd, addedPost]);
  }, []);

  return (
    <>
      {loading ? (
        <main className="container bg-white mt-4 mx-auto p-5 shadow-md ">
          <img className="block m-auto" src={Loading} alt="loading-spinner" />
        </main>
      ) : (
        <main className="container bg-white mt-8 mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts?.map((post, index) => (
            <Card key={index} {...post} />
          ))}
        </main>
      )}
    </>
  );
};

export default Home;
