import React from 'react';
import PropTypes from 'prop-types';

function ThreadFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="thread-filter">
      <select value={selectedCategory} onChange={onSelectCategory}>
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

ThreadFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default ThreadFilter;
