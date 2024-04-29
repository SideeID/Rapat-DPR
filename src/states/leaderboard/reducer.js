import { ActionType } from './action';

const initialState = {
  loading: false,
  leaderboard: [],
  error: null,
};

function leaderboardReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ActionType.FETCH_LEADERBOARD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionType.FETCH_LEADERBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        leaderboard: action.payload,
        error: null,
      };
    case ActionType.FETCH_LEADERBOARD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default leaderboardReducer;
