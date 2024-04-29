import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.TOGGLE_LIKE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : [...thread.upVotesBy, action.payload.userId],
            downVotesBy: thread.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
          };
        }
        return thread;
      });

    case ActionType.TOGGLE_DISLIKE_THREAD:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : [...thread.downVotesBy, action.payload.userId],
            upVotesBy: thread.upVotesBy.filter(
              (id) => id !== action.payload.userId,
            ),
          };
        }
        return thread;
      });

    case ActionType.ADD_COMMENT:
      return threads.map((thread) => {
        if (thread.id === action.payload.comment.threadId) {
          return {
            ...thread,
            comments: [action.payload.comment, ...thread.comments],
          };
        }
        return thread;
      });

    case ActionType.UPDATE_COMMENT_COUNT:
      return threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            totalComments: action.payload.totalComments,
          };
        }
        return thread;
      });

    default:
      return threads;
  }
}

export default threadsReducer;
