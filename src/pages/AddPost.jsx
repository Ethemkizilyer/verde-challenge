import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  addText, bakarEdit } from '../features/postSlice'
import { useNavigate } from 'react-router-dom'

const AddPost = () => {
   const navigate = useNavigate();
     const [newPost, setNewPost] = useState({
        title: '',
        body: '',
        userId:1,
        id:Math.ceil(Math.random() * 1000)
    })
   
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addText(newPost ))
        dispatch(bakarEdit());
        return navigate(-2);
    }

    return (
      <section className="container bg-white mt-4 mx-auto p-5 shadow-md">
        <form onSubmit={handleSubmit} className="m-auto md:w-1/2">
          <label htmlFor="title" className="font-bold text-lg">
            Title
          </label>
          <input
            type="text"
            className="bg-gray-100 rounded p-4 shadow-md w-full"
            name="title"
            id="title"
            value={newPost.title}
            onChange={handleChange}
          />
          <label htmlFor="body" className="font-bold text-lg">
            Detail
          </label>
          <textarea
            name="body"
            id="body"
            cols="30"
            rows="10"
            className="bg-gray-100 rounded p-4 shadow-md w-full"
            value={newPost.body}
            onChange={handleChange}
          ></textarea>
          <button className="rounded-lg bg-sky-500 text-white px-3 py-2 hover:bg-sky-700 m-auto block mt-3">
            + Add New Post
          </button>
        </form>
        
      </section>
    );
}

export default AddPost