import { showLoading, hideLoading } from 'react-redux-loading-bar';
// eslint-disable-next-line
import api from '../../utils/api';

const ActionType = {
  FETCH_LEADERBOARD_REQUEST: 'FETCH_LEADERBOARD_REQUEST',
  FETCH_LEADERBOARD_SUCCESS: 'FETCH_LEADERBOARD_SUCCESS',
  FETCH_LEADERBOARD_FAILURE: 'FETCH_LEADERBOARD_FAILURE',
};

function fetchLeaderboardRequest() {
  return {
    type: ActionType.FETCH_LEADERBOARD_REQUEST,
  };
}

function fetchLeaderboardSuccess(leaderboard) {
  return {
    type: ActionType.FETCH_LEADERBOARD_SUCCESS,
    payload: leaderboard,
  };
}

function fetchLeaderboardFailure(error) {
  return {
    type: ActionType.FETCH_LEADERBOARD_FAILURE,
    payload: error,
  };
}

function asyncFetchLeaderboard() {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(fetchLeaderboardRequest());
    try {
      const leaderboard = await api.getLeaderboard();
      dispatch(fetchLeaderboardSuccess(leaderboard));
    } catch (error) {
      dispatch(fetchLeaderboardFailure(error.message));
    }
    dispatch(hideLoading());
  };
}

export { ActionType, asyncFetchLeaderboard };
