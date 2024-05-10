import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
// eslint-disable-next-line
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_LIKE_THREAD: 'TOGGLE_LIKE_THREAD',
  TOGGLE_DISLIKE_THREAD: 'TOGGLE_DISLIKE_THREAD',
  UPDATE_COMMENT_COUNT: 'UPDATE_COMMENT_COUNT',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleLikeThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDislikeThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DISLIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function updateCommentCountActionCreator(threadId, totalComments) {
  return {
    type: ActionType.UPDATE_COMMENT_COUNT,
    payload: {
      threadId,
      totalComments,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleLikeThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();

    dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser.id }));
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDislikeThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();

    // Optimistically toggle dislike
    dispatch(toggleDislikeThreadActionCreator({ threadId, userId: authUser.id }));

    try {
      // Panggil API untuk melakukan toggle dislike
      await api.downVoteThread(threadId);
    } catch (error) {
      // Jika gagal, kembalikan ke status sebelumnya
      dispatch(toggleDislikeThreadActionCreator({ threadId, userId: authUser.id }));
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpdateCommentCount(threadId) {
  return async (dispatch) => {
    try {
      const response = await api.getThreadDetail(threadId);
      const totalComments = response.data.detailThread.comments.length;
      dispatch(updateCommentCountActionCreator(threadId, totalComments));
    } catch (error) {
      toast.error(error.message);
    }
  };
}

export {
  ActionType,
  asyncAddThread,
  asyncToggleLikeThread,
  asyncToggleDislikeThread,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleLikeThreadActionCreator,
  toggleDislikeThreadActionCreator,
  updateCommentCountActionCreator,
  asyncUpdateCommentCount,
};
