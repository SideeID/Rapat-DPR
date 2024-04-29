/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';
import { asyncFetchLeaderboard } from '../states/leaderboard/action';

function Leaderboard() {
  const dispatch = useDispatch();
  const { loading, leaderboard } = useSelector((state) => state.leaderboard);
  const [sortedLeaderboard, setSortedLeaderboard] = useState([]);
  const [sortBy, setSortBy] = useState('desc');

  useEffect(() => {
    dispatch(asyncFetchLeaderboard());
  }, [dispatch]);

  useEffect(() => {
    if (leaderboard && leaderboard.length > 0) {
      const sortedList = [...leaderboard];
      if (sortBy === 'asc') {
        sortedList.sort((a, b) => a.score - b.score);
      } else {
        sortedList.sort((a, b) => b.score - a.score);
      }
      setSortedLeaderboard(sortedList);
    }
  }, [leaderboard, sortBy]);

  const handleSortChange = () => {
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
  };

  if (loading) {
    return (
      <div className="loading">
        <p>Loading...</p>
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <div className="sort-buttons">
        <button className="sort-button" onClick={handleSortChange}>
          {sortBy === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
          {sortBy === 'asc' ? 'Sort Descending' : 'Sort Ascending'}
        </button>
      </div>
      <ul>
        {sortedLeaderboard.map((user) => (
          <li key={user.user.id} className="user-card">
            <div className="user-info">
              <img
                src={user.user.avatar}
                alt={user.user.name}
                className="user-avatar"
              />
              <div className="user-details">
                <p className="user-name">{user.user.name}</p>
                <p className="user-score">
                  Score:
                  {user.score}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
