/**
 * Skenario Pengujian untuk threadsReducer Function
 *
 * - Mengembalikan state yang sama jika action tidak dikenali
 * - Menghandle RECEIVE_THREADS action
 * - Menghandle ADD_THREAD action
 * - Menghandle TOGGLE_LIKE_THREAD action
 * - Menghandle TOGGLE_DISLIKE_THREAD action
 * - Menghandle ADD_COMMENT action
 * - Menghandle UPDATE_COMMENT_COUNT action
 */

import { describe, expect, it } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer Function', () => {
  it('mengembalikan state yang sama jika action tidak dikenali', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN_ACTION' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('menghandle RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          { id: 1, title: 'Thread 1' },
          { id: 2, title: 'Thread 2' },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('menghandle ADD_THREAD action', () => {
    // arrange
    const initialState = [{ id: 1, title: 'Thread 1' }];
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: { id: 2, title: 'Thread 2' },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it('menghandle TOGGLE_LIKE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 1,
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.TOGGLE_LIKE_THREAD,
      payload: {
        threadId: 1,
        userId: 'user1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        id: 1,
        upVotesBy: ['user1'],
        downVotesBy: [],
      },
    ]);
  });

  it('menghandle TOGGLE_DISLIKE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 1,
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = {
      type: ActionType.TOGGLE_DISLIKE_THREAD,
      payload: {
        threadId: 1,
        userId: 'user1',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        id: 1,
        upVotesBy: [],
        downVotesBy: ['user1'],
      },
    ]);
  });

  it('menghandle ADD_COMMENT action', () => {
    // arrange
    const initialState = [
      {
        id: 1,
        comments: [],
      },
    ];
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: {
          threadId: 1,
          text: 'Comment 1',
        },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        id: 1,
        comments: [action.payload.comment],
      },
    ]);
  });

  it('menghandle UPDATE_COMMENT_COUNT action', () => {
    // arrange
    const initialState = [
      {
        id: 1,
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.UPDATE_COMMENT_COUNT,
      payload: {
        threadId: 1,
        totalComments: 5,
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        id: 1,
        totalComments: action.payload.totalComments,
      },
    ]);
  });
});
