// import { ActionType } from './action';

// const detailThreadReducer = (detailThread = null, action = {}) => {
//   switch (action.type) {
//     case ActionType.SET_THREAD_DETAIL:
//       return action.payload.threadDetail;
//     case ActionType.CLEAR_THREAD_DETAIL:
//       return null;
//     case ActionType.ADD_COMMENT:
//       return {
//         ...detailThread,
//         comments: [action.payload.comment, ...detailThread.comments],
//       };
//     case ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL:
//       return {
//         ...detailThread,
//         upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
//           ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
//           : [...detailThread.upVotesBy, action.payload.userId],
//         downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
//           ? detailThread.downVotesBy.filter(
//               (id) => id !== action.payload.userId
//             )
//           : detailThread.downVotesBy,
//       };
//     case ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL:
//       return {
//         ...detailThread,
//         downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
//           ? detailThread.downVotesBy.filter(
//               (id) => id !== action.payload.userId
//             )
//           : [...detailThread.downVotesBy, action.payload.userId],
//         upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
//           ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
//           : detailThread.upVotesBy,
//       };
//     case ActionType.CLEAR_VOTE_THREAD_DETAIL:
//       return {
//         ...detailThread,
//         downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
//           ? detailThread.downVotesBy.filter(
//               (id) => id !== action.payload.userId
//             )
//           : detailThread.downVotesBy,
//         upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
//           ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
//           : detailThread.upVotesBy,
//       };
//     case ActionType.TOGGLE_UP_VOTE_THREAD_COMMENT:
//       return {
//         ...detailThread,
//         comments: detailThread.comments.map((comment) => {
//           if (comment.id === action.payload.commentId) {
//             return {
//               ...comment,
//               upVotesBy: comment.upVotesBy.includes(action.payload.userId)
//                 ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
//                 : [...comment.upVotesBy, action.payload.userId],
//               downVotesBy: comment.downVotesBy.includes(action.payload.userId)
//                 ? comment.downVotesBy.filter(
//                     (id) => id !== action.payload.userId
//                   )
//                 : comment.downVotesBy,
//             };
//           }
//           return comment;
//         }),
//       };
//     case ActionType.TOGGLE_DOWN_VOTE_THREAD_COMMENT:
//       return {
//         ...detailThread,
//         comments: detailThread.comments.map((comment) => {
//           if (comment.id === action.payload.commentId) {
//             return {
//               ...comment,
//               downVotesBy: comment.downVotesBy.includes(action.payload.userId)
//                 ? comment.downVotesBy.filter(
//                     (id) => id !== action.payload.userId
//                   )
//                 : [...comment.downVotesBy, action.payload.userId],
//               upVotesBy: comment.upVotesBy.includes(action.payload.userId)
//                 ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
//                 : comment.upVotesBy,
//             };
//           }
//           return comment;
//         }),
//       };

//     case ActionType.CLEAR_VOTE_THREAD_COMMENT:
//       return {
//         ...detailThread,
//         comments: detailThread.comments.map((comment) => {
//           if (comment.id === action.payload.commentId) {
//             return {
//               ...comment,
//               downVotesBy: detailThread.downVotesBy.includes(
//                 action.payload.userId
//               )
//                 ? detailThread.downVotesBy.filter(
//                     (id) => id !== action.payload.userId
//                   )
//                 : detailThread.downVotesBy,
//               upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
//                 ? detailThread.upVotesBy.filter(
//                     (id) => id !== action.payload.userId
//                   )
//                 : detailThread.upVotesBy,
//             };
//           }
//           return comment;
//         }),
//       };
//     default:
//       return detailThread;
//   }
// };

// export default detailThreadReducer;
import { ActionType } from './action';

const detailThreadReducer = (detailThread = null, action = {}) => {
  switch (action.type) {
    case ActionType.SET_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.ADD_COMMENT:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread.comments],
      };
    case ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL:
      return {
        ...detailThread,
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
          ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
          : [...detailThread.upVotesBy, action.payload.userId],
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
          ? detailThread.downVotesBy.filter(
              (id) => id !== action.payload.userId
            )
          : detailThread.downVotesBy,
      };
    case ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL:
      return {
        ...detailThread,
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
          ? detailThread.downVotesBy.filter(
              (id) => id !== action.payload.userId
            )
          : [...detailThread.downVotesBy, action.payload.userId],
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
          ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
          : detailThread.upVotesBy,
      };
    case ActionType.CLEAR_VOTE_THREAD_DETAIL:
      return {
        ...detailThread,
        downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
          ? detailThread.downVotesBy.filter(
              (id) => id !== action.payload.userId
            )
          : detailThread.downVotesBy,
        upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
          ? detailThread.upVotesBy.filter((id) => id !== action.payload.userId)
          : detailThread.upVotesBy,
      };
    case ActionType.TOGGLE_UP_VOTE_THREAD_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : [...comment.upVotesBy, action.payload.userId],
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                    (id) => id !== action.payload.userId
                  )
                : comment.downVotesBy,
            };
          }
          return comment;
        }),
      };
    case ActionType.TOGGLE_DOWN_VOTE_THREAD_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                    (id) => id !== action.payload.userId
                  )
                : [...comment.downVotesBy, action.payload.userId],
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy,
            };
          }
          return comment;
        }),
      };
    case ActionType.CLEAR_VOTE_THREAD_COMMENT:
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id === action.payload.commentId) {
            return {
              ...comment,
              downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                ? comment.downVotesBy.filter(
                    (id) => id !== action.payload.userId
                  )
                : comment.downVotesBy,
              upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
                : comment.upVotesBy,
            };
          }
          return comment;
        }),
      };
    default:
      return detailThread;
  }
};

export default detailThreadReducer;
