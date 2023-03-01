import Card from "../components/Card/Card";
import Loading from "../assets/loading.gif";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addText, getPosts, gtPosts } from "../features/postSlice";

const Home = () => {
  const [yeni, setYeni] = useState({
    userId: 1,
    id: Math.ceil(Math.random() * 1000),
    title: "",
    body: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, bakar } = useSelector((state) => state.posts);

  console.log(bakar);
  useEffect(() => {
    // get();
    !bakar && dispatch(getPosts());
    // setAsd(posts)
  }, [dispatch]);
  const handle = () => {
    dispatch(addText(yeni));
  };

  const getPost = async () => {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=1`;

    const { data } = await axios(url);
    console.log(data);
    setAsd(data);
    return data;
  };
  const [asd, setAsd] = useState([]);
  const { loading, addedPost } = useSelector((state) => state.posts);

  useEffect(() => {
    getPost();
    setAsd([...asd, addedPost]);
  }, []);
  console.log(asd);
  console.log(addedPost);
  // setAsd([...asd,addedPost])
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
