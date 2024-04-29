import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <article className="login-page__main">
        <h2>Hitam dilarang masuk!!</h2>
        <LoginInput login={onLogin} />

        <p>
          Don&apos;t have an account?
          {' '}
          <Link to="/register">Register</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;
