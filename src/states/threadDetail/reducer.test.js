/**
 * Skenario Pengujian untuk detailThreadReducer Function
 *
 * - Mengembalikan state yang sama jika action tidak dikenali
 * - Menghandle SET_THREAD_DETAIL action
 * - Menghandle CLEAR_THREAD_DETAIL action
 * - Menghandle ADD_COMMENT action
 * - Menghandle TOGGLE_UP_VOTE_THREAD_DETAIL action
 * - Menghandle TOGGLE_DOWN_VOTE_THREAD_DETAIL action
 * - Menghandle CLEAR_VOTE_THREAD_DETAIL action
 * - Menghandle TOGGLE_UP_VOTE_THREAD_COMMENT action
 * - Menghandle TOGGLE_DOWN_VOTE_THREAD_COMMENT action
 * - Menghandle CLEAR_VOTE_THREAD_COMMENT action
 */

import { describe, expect, it } from 'vitest';
import detailThreadReducer from './reducer';
import { ActionType } from './action';

describe('detailThreadReducer Function', () => {
  it('mengembalikan state yang sama jika action tidak dikenali', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN_ACTION' };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('menghandle SET_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: ActionType.SET_THREAD_DETAIL,
      payload: {
        threadDetail: { id: 1, title: 'Thread Detail' },
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('menghandle CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = { id: 1, title: 'Thread Detail' };
    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('menghandle ADD_COMMENT action', () => {
    // arrange
    const initialState = { id: 1, title: 'Thread Detail', comments: [] };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: { id: 1, text: 'Comment 1', threadId: 1 },
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment, ...initialState.comments],
    });
  });

  it('menghandle TOGGLE_UP_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 1,
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
      payload: {
        userId: 'user1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: ['user1'],
      downVotesBy: [],
    });
  });

  it('menghandle TOGGLE_DOWN_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 1,
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
      payload: {
        userId: 'user1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: ['user1'],
    });
  });

  it('menghandle CLEAR_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 1,
      upVotesBy: ['user1'],
      downVotesBy: ['user2'],
    };
    const action = {
      type: ActionType.CLEAR_VOTE_THREAD_DETAIL,
      payload: {
        userId: 'user1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: initialState.upVotesBy.filter((id) => id !== 'user1'),
      downVotesBy: initialState.downVotesBy,
    });
  });

  it('menghandle TOGGLE_UP_VOTE_THREAD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 1,
      comments: [
        {
          id: 1,
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.TOGGLE_UP_VOTE_THREAD_COMMENT,
      payload: {
        commentId: 1,
        userId: 'user1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toContain('user1');
    expect(nextState.comments[0].downVotesBy).not.toContain('user1');
  });

  it('menghandle TOGGLE_DOWN_VOTE_THREAD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 1,
      comments: [
        {
          id: 1,
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.TOGGLE_DOWN_VOTE_THREAD_COMMENT,
      payload: {
        commentId: 1,
        userId: 'user1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments[0].downVotesBy).toContain('user1');
    expect(nextState.comments[0].upVotesBy).not.toContain('user1');
  });

  it('menghandle CLEAR_VOTE_THREAD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 1,
      comments: [
        {
          id: 1,
          upVotesBy: ['user1'],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: ActionType.CLEAR_VOTE_THREAD_COMMENT,
      payload: {
        commentId: 1,
        userId: 'user1',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).not.toContain('user1');
    expect(nextState.comments[0].downVotesBy).toEqual([]);
  });
});
