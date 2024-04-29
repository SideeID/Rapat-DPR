import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ThreadDetail from '../components/ThreadDetail';
import ThreadComment from '../components/ThreadComment';
import CommentForm from '../components/AddCommentForm';
import {
  asyncFetchThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteThreadComment,
  asyncToggleDownVoteThreadComment,
  asyncAddComment,
} from '../states/threadDetail/action';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((state) => state.detailThread);

  useEffect(() => {
    dispatch(asyncFetchThreadDetail(id));
  }, [dispatch, id]);

  const handleLikeThread = () => {
    dispatch(asyncToggleUpVoteThreadDetail(id));
  };

  const handleDislikeThread = () => {
    dispatch(asyncToggleDownVoteThreadDetail(id));
  };

  const handleLikeComment = (commentId) => {
    dispatch(asyncToggleUpVoteThreadComment(id, commentId));
  };

  const handleDislikeComment = (commentId) => {
    dispatch(asyncToggleDownVoteThreadComment(id, commentId));
  };

  const handleAddComment = (comment) => {
    dispatch(asyncAddComment({ threadId: id, content: comment }));
  };

  return (
    <div className="detail-page">
      {threadDetail && (
        <ThreadDetail
          {...threadDetail}
          avatar={threadDetail.owner.avatar}
          name={threadDetail.owner.name}
          onLike={handleLikeThread}
          onDislike={handleDislikeThread}
        />
      )}
      <CommentForm onAddComment={handleAddComment} />
      {threadDetail
        && threadDetail.comments
        && threadDetail.comments.map((comment) => (
          <ThreadComment
            key={comment.id}
            {...comment}
            avatar={comment.owner.avatar}
            name={comment.owner.name}
            onLike={() => handleLikeComment(comment.id)}
            onDislike={() => handleDislikeComment(comment.id)}
          />
        ))}
    </div>
  );
}

export default DetailPage;
