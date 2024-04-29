/* eslint-disable react/no-danger */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { postedAt } from '../utils';

function ThreadComment({
  content,
  createdAt,
  upVotesBy,
  downVotesBy,
  onLike,
  onDislike,
  name,
  avatar,
}) {
  return (
    <div className="thread-comment-card">
      <div className="thread-item__user-photo">
        <img src={avatar} alt={name} />
      </div>
      <header>
        <div className="thread-item__user-info">
          <p className="thread-item__user-name">{name}</p>
        </div>
        <p className="thread-item__created-at">{postedAt(createdAt)}</p>
      </header>
      <div className="thread-comment">
        <p dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className="comment-buttons">
        <button className="like-button" onClick={onLike}>
          <FaThumbsUp />
          Like (
          {upVotesBy.length}
          )
        </button>
        <button className="dislike-button" onClick={onDislike}>
          <FaThumbsDown />
          Dislike (
          {downVotesBy.length}
          )
        </button>
      </div>
    </div>
  );
}

ThreadComment.propTypes = {
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ThreadComment;
