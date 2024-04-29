import { toast } from 'react-toastify';
// eslint-disable-next-line
import api from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async () => {
    try {
      await api.register({ name, email, password });
    } catch (error) {
      toast.error(error.message);
    }
  };
}

export { ActionType, asyncRegisterUser, receiveUsersActionCreator };
