/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { FaPaperPlane } from 'react-icons/fa';

function AddCommentForm({ onAddComment }) {
  const [newComment, setNewComment] = useState('');

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = () => {
    if (newComment.trim() !== '') {
      onAddComment(newComment);
      setNewComment('');
      toast.success('Comment added successfully!');
    }
  };

  return (
    <div className="add-comment-form">
      <textarea
        className="comment-input"
        value={newComment}
        onChange={handleCommentChange}
        placeholder="Write your comment here..."
      />
      <button className="submit-comment" onClick={handleSubmitComment}>
        <FaPaperPlane />
      </button>
    </div>
  );
}

AddCommentForm.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default AddCommentForm;
