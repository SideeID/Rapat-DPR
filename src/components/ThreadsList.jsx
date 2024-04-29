import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function ThreadsList({ threads, like, dislike }) {
  return (
    <div className="threads-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          like={like}
          dislike={dislike}
          totalComments={thread.totalComments}
        />
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export default ThreadsList;
