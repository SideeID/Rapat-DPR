import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({ authUser, signOut }) {
  const { id, name, avatar } = authUser;

  return (
    <div className="navigation">
      <img src={avatar} alt={id} title={name} />
      <p>{name}</p>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/threads/new">New Thread</Link>
        <Link to="/leaderboards">Leaderboard</Link>
      </nav>
      <button type="button" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
