import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
// eslint-disable-next-line
import api from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      const users = await api.getAllUsers();
      const threads = await api.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(hideLoading());
  };
}

export default asyncPopulateUsersAndThreads;
