"use client";
import React, { useState, useRef } from 'react';
import Modal from './Modal';
import styles from './blog.module.css';
import QuillEditor from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FeaturedPost from './featuredPost';


const Blogpage = () => {
  const postsRef = useRef([]);
  const [searchQuery, setSearchQuery] = useState("");
  const blogIdRef = useRef(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImageChange = (e) => setImage(e.target.files[0]);

  /*const scrollToPost = (id) => {
    const postElement = postsRef.current[id];
    if (postElement) {
      postElement.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
  }; */

  const confirmDelete = (blogId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this blog post?");
    if (isConfirmed) {
      setBlogs(blogs.filter(blog => blog.id !== blogId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      alert("Please fill out all fields and upload an image before submitting.");
      return;
    }

    if (isEditing) {
      setBlogs(blogs.map(blog => blog.id === editingPostId ? { ...blog, title, description, image } : blog));
      setIsEditing(false);
      setEditingPostId(null);
    } else {
      const newBlog = { id: blogIdRef.current++, title, description, image};
      setBlogs([newBlog, ...blogs]);
    }
 
    setTitle('');
    setDescription('');
    setImage(null);
    setIsModalOpen(false);
  };

  const startEdit = (postId) => {
    const postToEdit = blogs.find(blog => blog.id === postId);
    if (postToEdit) {
      setTitle(postToEdit.title);
      setDescription(postToEdit.description);
      setImage(postToEdit.image); 
      setIsEditing(true);
      setEditingPostId(postId);
      setIsModalOpen(true); 
    }
  };
  



  return (
    <div className={styles.blogPageContainer}>
      <button onClick={() => setIsModalOpen(true)} className={styles.addBlogButton}>
        + Add Blog
      </button>
      <input
      type="text"
      placeholder="Search posts..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className={styles.searchInput}
      />

    
     

      <div className={styles.container}>
        {blogs.length > 0 && (
          <FeaturedPost
            title={blogs[0].title}
            imageUrl={blogs[0].image ? URL.createObjectURL(blogs[0].image) : null}
            //onFeaturedPostClick={() => scrollToPost(blogs[0].id)} // Assuming each blog has a unique identifier
          />
        )}

      <div className={styles.previousStories}>
          <h2> Previous Stories </h2>
          {blogs.filter(blog =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchQuery.toLowerCase())
          ).map((blog, index) => (
            <div key={blog.id} ref={el => postsRef.current[blog.id] = el} className={styles.blogPost}>
              <h3> {blog.title} </h3>
              <div className={styles.blogContent}> {/* Flex container */} 
              {blog.image && <img src={URL.createObjectURL(blog.image)} alt='Blog Post' className={styles.blogPostImage} />}
              <p>{blog.description}</p>
              </div>
              <div className={styles.blogPostActions}>
              <button onClick={() => startEdit(blog.id)} className={styles.editButton}>Edit</button>
              <button onClick={() => confirmDelete(blog.id)} className={styles.deleteButton}>Delete</button>

              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit} className={styles.blogForm}>
          <div className={styles.formRow}>
            <div className={styles.titleField}>
              <label htmlFor="title">Title</label>
              <input id="title" className={styles.inputField} value={title} onChange={handleTitleChange} />
            </div>
            <div className={styles.descriptionField}>
              <label htmlFor="description">Description</label>
              <textarea id="description" className={styles.textAreaField} value={description} onChange={handleDescriptionChange} />
            </div>
          </div>
          <div className={styles.formRow}>
            <label htmlFor="image">Image</label>
            <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
          </div>
          <button type="submit" className={styles.createBlogButton}>Create Blog Post</button>
        </form>
      </Modal>
    </div>
  );
};

export default Blogpage;
