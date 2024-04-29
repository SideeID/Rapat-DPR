/* eslint-disable react/no-danger */
/* eslint-disable react/button-has-type */
import React from 'react';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { postedAt } from '../utils';

function ThreadDetail({
  title,
  body,
  createdAt,
  upVotesBy,
  downVotesBy,
  onLike,
  onDislike,
  avatar,
  name,
}) {
  return (
    <div className="thread-detail-container">
      <div className="thread-item__user-photo">
        <img src={avatar} alt={name} />
      </div>
      <div className="thread-item__detail">
        <header>
          <div className="thread-item__user-info">
            <p className="thread-item__user-name">{name}</p>
          </div>
          <p className="thread-item__created-at">{postedAt(createdAt)}</p>
        </header>
        <h2>{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: body }} />
        <div className="action-buttons">
          <button className="like-button" onClick={onLike}>
            <FaThumbsUp />
            (
            {upVotesBy.length}
            )
          </button>
          <button className="dislike-button" onClick={onDislike}>
            <FaThumbsDown />
            (
            {downVotesBy.length}
            )
          </button>
        </div>
      </div>
    </div>
  );
}

ThreadDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ThreadDetail;
