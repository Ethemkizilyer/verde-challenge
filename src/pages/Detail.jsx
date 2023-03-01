import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { BsArrowLeft} from "react-icons/bs"
import { RiDeleteBinLine, RiCloseFill} from "react-icons/ri"
import { MdOutlineModeEditOutline} from "react-icons/md"
import { bakarEdit, changeEdit, deletePost, modalOpen, removeDeleteText } from '../features/postSlice'
import { useEffect, useState } from 'react'
import Comments from '../components/Comments/Comments'
import style from "./Pages.module.css";



const Post = () => {
const { id } = useParams();
const navigate = useNavigate();
const dispatch = useDispatch();
console.log(id);
const [comments, setComments] = useState([]);
const { posts, bakar, isOpen, loading, deleteText } = useSelector(
  (state) => state.posts
);
console.log(bakar);
const [yeni, setYeni] = useState({
  userId: 1,
  id: id,
  title: "",
  body: "",
});

const nam = posts.filter((item) => item.id == id);
useEffect(() => {
  
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
            {/* {!isEdit ? (
              <p className="font-bold text-xl">{post?.title}</p>
            ) : (
              <textarea
                className=" text-xl w-full bg-gray-50"
                cols="30"
                rows="3"
                value={updateText.title}
                name="title"
                onChange={handleChange}
              ></textarea>
            )} */}
          </div>
          <h4 className="font-bold text-lg">Detail</h4>
          <div
            className="bg-gray-100 rounded p-4 shadow-md cursor-pointer "
            // contentEditable={`${isEdit}`}
            onClick={() => dispatch(changeEdit(true))}
          >
            {nam[0]?.body}
            {/* {!isEdit ? (
              <p className=" text-xl">{post?.body}</p>
            ) : (
              <textarea
                className=" text-xl w-full bg-gray-50"
                cols="30"
                rows="5"
                value={updateText.body}
                name="body"
                onChange={handleChange}
              ></textarea>
            )} */}
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
              {/* <Formik
                initialValues={{
                  name: edit()[0].name,
                  number: edit()[0].number,
                }}
                onSubmit={(values, { resetForm }) => {
                 
                    const item = {
                      ...values,
                      id: edit()[0].id,
                    };
                    dispatch(modalOpen());
                    dispatch(editContact(item));
                    resetForm();
                }}
              >
                <Form className={style.form}>
                  <label htmlFor="name">Title</label>
                  <Field
                    className={style.input}
                    type="text"
                    name="name"
                    id="name"
                    pattern="^[a-zA-ZğüşıöçĞÜŞİÖÇ]+(([' -][a-zA-ZğüşıöçĞÜŞİÖÇ ])?[a-zA-ZğüşıöçĞÜŞİÖÇ]*)*$"
                    title="Ad yalnızca harf, kesme işareti, kısa çizgi ve boşluk içerebilir. Örneğin Charles de Batz de Castelmore d'Artagnan"
                    required
                  />
                  <label htmlFor="number" className={style.label}>
                    Telefon Numarası
                  </label>
                  <Field
                    className={style.input}
                    type="text"
                    name="number"
                    id="number"
                    
                    title="Telefon numarası rakam olmalı ve boşluk, tire, parantez içerebilir ve + ile başlayabilir"
                    required
                  />
                  <button type="submit" className={style.button}>
                    Kaydet
                  </button>
                </Form>
              </Formik> */}
              <div>
                <form className={style.form}>
                  <label htmlFor="name">Title</label>
                  <br />
                  <input
                    className={style.input}
                    type="text"
                    onChange={(e) =>
                      setYeni({ ...yeni, title: e.target.value })
                    }
                  />{" "}
                  <br />
                  <label htmlFor="number" className={style.label}>
                    Blog
                  </label>
                  <br />
                  <textarea
                    onChange={(e) => setYeni({ ...yeni, body: e.target.value })}
                  />{" "}
                  <br />
                  <button className={style.button} onClick={handle}>
                    Güncelle
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Post