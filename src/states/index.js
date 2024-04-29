import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
/* eslint-disable */
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import threadsReducer from './threads/reducer';
import detailThreadReducer from './threadDetail/reducer';
import usersReducer from './users/reducer';
import leaderboardReducer from './leaderboard/reducer';
// eslint-enable */

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    detailThread: detailThreadReducer,
    users: usersReducer,
    leaderboard: leaderboardReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
