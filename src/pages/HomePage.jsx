import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ThreadsList from '../components/ThreadsList';
import asyncPopulateUsersAndThreads from '../states/shared/action';
import ThreadFilter from '../components/ThreadsFilter';
import {
  asyncToggleLikeThread,
  asyncToggleDislikeThread,
} from '../states/threads/action';

function HomePage() {
  const { threads = [], users = [] } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const categories = [...new Set(threads.map((thread) => thread.category))];

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onLikeThread = (id) => {
    dispatch(asyncToggleLikeThread(id));
  };

  const onDislikeThread = (id) => {
    dispatch(asyncToggleDislikeThread(id));
  };

  const threadList = threads
    .filter((thread) => !selectedCategory || thread.category === selectedCategory)
    .map((thread) => {
      const user = users.find((u) => u.id === thread.ownerId);
      return { ...thread, user };
    });

  const handleSelectCategory = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <section className="home-page">
      <ThreadFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
      <ThreadsList
        threads={threadList}
        like={onLikeThread}
        dislike={onDislikeThread}
      />
    </section>
  );
}

export default HomePage;
