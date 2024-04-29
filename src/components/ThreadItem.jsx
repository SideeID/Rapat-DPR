/* eslint-disable react/no-danger */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
  FaRegComment,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { postedAt } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
  like,
  dislike,
}) {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);
  const isThreadLiked = authUser && upVotesBy ? upVotesBy.includes(authUser.id) : false;
  const isThreadDisliked = authUser && downVotesBy ? downVotesBy.includes(authUser.id) : false;
  const totalLike = upVotesBy ? upVotesBy.length : 0;
  const totalDislike = downVotesBy ? downVotesBy.length : 0;

  const shortenedBody = body.length > 50 ? `${body.slice(0, 50)}...` : body;

  const onLikeClick = (event) => {
    event.stopPropagation();
    like(id);
  };

  const onDislikeClick = (event) => {
    event.stopPropagation();
    dislike(id);
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="thread-item"
      onClick={onThreadClick}
      onKeyDown={onThreadPress}
    >
      <div className="thread-item__user-photo">
        <img src={user.avatar} alt={user.name} />
      </div>
      <div className="thread-item__detail">
        <header>
          <div className="thread-item__user-info">
            <p className="thread-item__user-name">{user.name}</p>
          </div>
          <p className="thread-item__created-at">{postedAt(createdAt)}</p>
        </header>
        <article>
          <p className="thread-item__title">{title}</p>
          <p className="thread-item__body" dangerouslySetInnerHTML={{ __html: shortenedBody }} />
        </article>
        <div className="thread-item__stats">
          <div className="thread-item__votes">
            <button type="button" aria-label="like" onClick={onLikeClick}>
              {isThreadLiked ? (
                <FaThumbsUp style={{ color: 'blue' }} />
              ) : (
                <FaRegThumbsUp />
              )}
              <span>{totalLike}</span>
            </button>
            <button type="button" aria-label="dislike" onClick={onDislikeClick}>
              {isThreadDisliked ? (
                <FaThumbsDown style={{ color: 'red' }} />
              ) : (
                <FaRegThumbsDown />
              )}
              <span>{totalDislike}</span>
            </button>
          </div>
          <div className="thread-item__comments">
            <FaRegComment />
            <span>{totalComments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  like: PropTypes.func,
  dislike: PropTypes.func,
};

ThreadItem.propTypes = {
  ...threadItemShape,
};

ThreadItem.defaultProps = {
  upVotesBy: [],
  downVotesBy: [],
  like: () => {},
  dislike: () => {},
};

export { threadItemShape };

export default ThreadItem;
