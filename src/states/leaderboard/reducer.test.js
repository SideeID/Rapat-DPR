/**
 * Skenario Pengujian untuk leaderboardReducer Function
 *
 * - Mengembalikan state awal jika action tidak dikenali
 * - Menghandle FETCH_LEADERBOARD_REQUEST action
 * - Menghandle FETCH_LEADERBOARD_SUCCESS action
 * - Menghandle FETCH_LEADERBOARD_FAILURE action
 * - Menghandle asyncFetchLeaderboard thunk
 *   - Harus menjalankan aksi dengan benar ketika pengambilan data berhasil
 *   - Harus menjalankan aksi dengan benar dan menampilkan pesan kesalahan ketika pengambilan data gagal
 */

import { describe, expect, it, vi } from 'vitest';
import leaderboardReducer from './reducer';
import { asyncFetchLeaderboard, ActionType } from './action';
import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

// Simulasikan respons palsu dari API
const fakeLeaderboardData = [{ name: 'John', score: 100 }];

describe('leaderboardReducer Function', () => {
  it('mengembalikan state awal jika action tidak dikenali', () => {
    // arrange
    const initialState = {
      loading: false,
      leaderboard: [],
      error: null,
    };
    const action = { type: 'UNKNOWN_ACTION' };

    // action
    const nextState = leaderboardReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('menghandle FETCH_LEADERBOARD_REQUEST action', () => {
    // arrange
    const initialState = {
      loading: false,
      leaderboard: [],
      error: null,
    };
    const action = { type: ActionType.FETCH_LEADERBOARD_REQUEST };

    // action
    const nextState = leaderboardReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  it('menghandle FETCH_LEADERBOARD_SUCCESS action', () => {
    // arrange
    const initialState = {
      loading: true,
      leaderboard: [],
      error: null,
    };
    const action = {
      type: ActionType.FETCH_LEADERBOARD_SUCCESS,
      payload: fakeLeaderboardData,
    };

    // action
    const nextState = leaderboardReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      loading: false,
      leaderboard: fakeLeaderboardData,
      error: null,
    });
  });

  it('menghandle FETCH_LEADERBOARD_FAILURE action', () => {
    // arrange
    const initialState = {
      loading: true,
      leaderboard: [],
      error: null,
    };
    const action = {
      type: ActionType.FETCH_LEADERBOARD_FAILURE,
      payload: 'Failed to fetch leaderboard data',
    };

    // action
    const nextState = leaderboardReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      loading: false,
      error: 'Failed to fetch leaderboard data',
    });
  });

  it('menghandle asyncFetchLeaderboard thunk', async () => {
    // arrange
    const dispatch = vi.fn();
    api.getLeaderboard = async () => fakeLeaderboardData;

    // action
    await asyncFetchLeaderboard()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.FETCH_LEADERBOARD_REQUEST,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.FETCH_LEADERBOARD_SUCCESS,
      payload: fakeLeaderboardData,
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('menghandle asyncFetchLeaderboard thunk when data fetching fails', async () => {
    // arrange
    const dispatch = vi.fn();
    const errorMessage = 'Failed to fetch leaderboard data';
    api.getLeaderboard = async () => {
      throw new Error(errorMessage);
    };

    // action
    await asyncFetchLeaderboard()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.FETCH_LEADERBOARD_REQUEST,
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: ActionType.FETCH_LEADERBOARD_FAILURE,
      payload: errorMessage,
    });
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
