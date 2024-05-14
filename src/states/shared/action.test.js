/**
 * Skenario Pengujian untuk asyncPopulateUsersAndThreads Function
 *
 * - Seharusnya mengirimkan tindakan dengan benar saat pengambilan data berhasil
 * - Seharusnya mengirimkan tindakan dan menampilkan pesan toast dengan benar saat pengambilan data gagal
 */

import { describe, beforeEach, afterEach, it, vi, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import asyncPopulateUsersAndThreads from './action';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';
import { toast } from 'react-toastify';

describe('asyncPopulateUsersAndThreads Function', () => {
  const fakeUsersResponse = [
    {
      id: 'user-1',
      name: 'User Test 1',
      photo: 'https://generated-image-url.jpg',
    },
  ];

  const fakeThreadsResponse = [
    {
      id: 'thread-1',
      title: 'Thread Test 1',
      body: 'Lorem ipsum dolor sit amet.',
      category: 'General',
      userId: 'user-1',
      upVotesBy: [],
      downVotesBy: [],
      createdAt: '2022-09-22T10:06:55.588Z',
    },
  ];

  const fakeErrorResponse = new Error('Ups, something went wrong');

  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;

    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it('should dispatch actions correctly when data fetching is successful', async () => {
    // Stub API functions
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);

    // Mock dispatch function
    const dispatch = vi.fn();

    await asyncPopulateUsersAndThreads()(dispatch);

    // Assertions
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeUsersResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadsActionCreator(fakeThreadsResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch actions and show toast correctly when data fetching fails', async () => {
    // Stub API functions to simulate failure
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);

    // Mock dispatch function
    const dispatch = vi.fn();

    // Mock toast.error function
    toast.error = vi.fn();

    // Call asyncPopulateUsersAndThreads
    await asyncPopulateUsersAndThreads()(dispatch);

    // Assertions
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(toast.error).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
