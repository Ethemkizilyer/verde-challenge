import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { RiDeleteBinLine, RiCloseFill } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import {
  bakarEdit,
  changeEdit,
  deletePost,
  modalOpen,
  removeDeleteText,
} from "../features/postSlice";
import { useEffect, useState } from "react";
import Comments from "../components/Comments/Comments";
import style from "./Pages.module.css";
import { Field, Form, Formik } from "formik";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [comments, setComments] = useState([]);

  const { posts, bakar, isOpen, loading, deleteText } = useSelector(
    (state) => state.posts
  );

  const [yeni, setYeni] = useState({
    userId: 1,
    id: id,
    title: "",
    body: "",
  });

  const nam = posts.filter((item) => item.id == id);

  useEffect(() => {
    // setText(nam)
    getComments();
  }, []);

  const handle = () => {
    dispatch(modalOpen());
    dispatch(changeEdit(yeni));
  };

  const getComments = async () => {
    const url = `https://jsonplaceholder.typicode.com/posts/${nam[0]?.id}/comments`;
    const response = await fetch(url);
    const data = await response.json();
    setComments(data);
  };

  return (
    <>
      <section className="container bg-white mt-4 mx-auto p-5 shadow-md flex gap-6">
        <aside>
          <button
            className=" hover:bg-gray-200 rounded-full p-2"
            onClick={() => {
              dispatch(bakarEdit());
              return navigate(-1);
            }}
          >
            <BsArrowLeft size={30} className="" />
          </button>
        </aside>
        <article className="md:w-9/12 xl:w-1/2 w-full flex flex-col gap-4">
          <div className="detail-top flex justify-between">
            <h3 className="font-bold text-2xl">Posts</h3>
            <button
              className="rounded-lg bg-indigo-600 text-white px-3 py-2 hover:bg-indigo-700"
              onClick={() => navigate("/newPost")}
            >
              + New Post
            </button>
          </div>
          <h4 className="font-bold text-lg">Title</h4>
          <div
            className="bg-gray-100 rounded p-4 shadow-md cursor-pointer"
            // contentEditable={`${isEdit}`}
            onClick={() => dispatch(changeEdit(true))}
          >
            {nam[0]?.title}
          </div>
          <h4 className="font-bold text-lg">Detail</h4>
          <div
            className="bg-gray-100 rounded p-4 shadow-md cursor-pointer "
            // contentEditable={`${isEdit}`}
            onClick={() => dispatch(changeEdit(true))}
          >
            {nam[0]?.body}
          </div>

          <div className="btn-container flex justify-end gap-2 mt-8">
            <div className=" rounded-md  text-white flex items-center">
              {loading ? (
                <div className="flex items-center justify-center">
                  <div
                    className="text-gray-700 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                </div>
              ) : (
                deleteText && (
                  <p className="mx-3 flex gap-2">
                    {deleteText}
                    <RiCloseFill
                      className="text-white cursor-pointer"
                      size={25}
                      onClick={() => dispatch(removeDeleteText())}
                    />
                  </p>
                )
              )}
            </div>
            <button
              className="rounded-lg bg-red-600 text-white px-3 py-2 hover:bg-red-700 flex items-center gap-2"
              onClick={() => {
                navigate(-1);
                dispatch(bakarEdit());
                return dispatch(removeDeleteText(yeni));
              }}
            >
              <RiDeleteBinLine />
              Delete
            </button>
            <button
              className="rounded-lg bg-indigo-600 text-white px-3 py-2 hover:bg-indigo-700 flex items-center gap-2"
              onClick={() => dispatch(modalOpen())}
            >
              <MdOutlineModeEditOutline />
              Update
            </button>
          </div>
        </article>
      </section>
      <section className="container bg-white mx-auto p-5 shadow-md">
        <h2 className="md:w-9/12 xl:w-1/2  mt-3 ml-16">Comments</h2>
        {comments?.map((comment, index) => (
          <Comments key={index} {...comment} />
        ))}
      </section>
      {isOpen && (
        <div className={style.modalwrapper}>
          <div className={style.modal}>
            <div className={style.modalcontent}>
              <span
                className={style.close}
                onClick={() => dispatch(modalOpen())}
              >
                &times;
              </span>
              <Formik
                initialValues={{
                  userId: 1,
                  id: id,
                  title: nam[0].title,
                  body: nam[0].body,
                }}
                onSubmit={(values, { resetForm }) => {
                  const item = {
                    ...values,
                  };
                  dispatch(modalOpen());
                  dispatch(changeEdit(item));
                  resetForm();
                }}
              >
                <Form className={style.form}>
                  <label htmlFor="title">Title</label>

                  <Field
                    className={style.input}
                    type="text"
                    name="title"
                    id="title"
                    required
                  />

                  <label htmlFor="body" className={style.label}>
                    Blog
                  </label>

                  <Field
                    as="textarea"
                    className={style.input}
                    name="body"
                    id="body"
                    rows="10"
                    required
                  />

                  <button type="submit" className={style.button}>
                    Güncelle
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Post;
