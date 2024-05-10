import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
// eslint-disable-next-line
import api from '../../utils/api';

const ActionType = {
  SET_THREAD_DETAIL: 'SET_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_UP_VOTE_THREAD_DETAIL: 'TOGGLE_UP_VOTE_THREAD_DETAIL',
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: 'TOGGLE_DOWN_VOTE_THREAD_DETAIL',
  CLEAR_VOTE_THREAD_DETAIL: 'CLEAR_VOTE_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UP_VOTE_THREAD_COMMENT: 'TOGGLE_UP_VOTE_THREAD_COMMENT',
  TOGGLE_DOWN_VOTE_THREAD_COMMENT: 'TOGGLE_DOWN_VOTE_THREAD_COMMENT',
  CLEAR_VOTE_THREAD_COMMENT: 'CLEAR_VOTE_THREAD_COMMENT',
};

function setThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.SET_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleUpVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleDownVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function clearVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.CLEAR_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteThreadCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteThreadCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleClearVoteThreadCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.CLEAR_VOTE_THREAD_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncFetchThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(setThreadDetailActionCreator(threadDetail));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      dispatch(clearVoteThreadDetailActionCreator(authUser.id));
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);
      dispatch(clearVoteThreadDetailActionCreator(authUser.id));
    }
    dispatch(hideLoading());
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment(threadId, content);
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThreadComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleUpVoteThreadCommentActionCreator(commentId, authUser.id));

    try {
      // Optimistically updating the UI before the API request
      await api.upVoteComment(threadId, commentId);

      // If successful, no further action needed
    } catch (error) {
      // Revert the UI state if the API request fails
      toast.error(error.message);
      dispatch(
        toggleClearVoteThreadCommentActionCreator(commentId, authUser.id),
      );
    }
  };
}

function asyncToggleDownVoteThreadComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleDownVoteThreadCommentActionCreator(commentId, authUser.id));

    try {
      // Optimistically updating the UI before the API request
      await api.downVoteComment(threadId, commentId);

      // If successful, no further action needed
    } catch (error) {
      // Revert the UI state if the API request fails
      toast.error(error.message);
      dispatch(
        toggleClearVoteThreadCommentActionCreator(commentId, authUser.id),
      );
    }
  };
}

function asyncClearVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(clearVoteThreadDetailActionCreator(authUser.id));

    try {
      await api.neutralizeThreadVote(threadId);
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncClearVoteThreadComment(threadId, commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(toggleClearVoteThreadCommentActionCreator(commentId, authUser.id));

    try {
      await api.neutralizeCommentVote(threadId, commentId);
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  asyncFetchThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadComment,
  asyncToggleDownVoteThreadComment,
  setThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  clearVoteThreadDetailActionCreator,
  addCommentActionCreator,
  toggleUpVoteThreadCommentActionCreator,
  toggleDownVoteThreadCommentActionCreator,
  toggleClearVoteThreadCommentActionCreator,
  asyncClearVoteThreadDetail,
  asyncClearVoteThreadComment,
};
