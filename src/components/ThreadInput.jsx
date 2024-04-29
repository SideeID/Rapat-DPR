import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';

function ThreadInput() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('General');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const addNewThread = () => {
    if (title.trim() && body.trim()) {
      dispatch(asyncAddThread({ title, body, category }));
      setTitle('');
      setCategory('General');
      setBody('');
      toast.success('Thread successfully created!');
      navigate('/');
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleBodyChange = (event) => {
    const newText = event.target.value;
    if (newText.length <= 320) {
      setBody(newText);
    }
  };

  return (
    <div className="thread-input">
      <strong>Buat Pertanyaan Baru</strong>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <select value={category} onChange={handleCategoryChange}>
        <option value="General">General</option>
        <option value="Technology">Technology</option>
        <option value="Science">Science</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <textarea
        placeholder="What's on your mind?"
        value={body}
        onChange={handleBodyChange}
      />
      <p className="thread-input__char-left">
        <strong>{body.length}</strong>
        /320
      </p>
      <button type="button" onClick={addNewThread}>
        Post
      </button>
    </div>
  );
}

export default ThreadInput;
