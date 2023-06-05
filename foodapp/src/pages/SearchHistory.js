import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

function SearchHistory() {
  const { searchHistory } = useContext(UserContext);

  return (
    <div>
      <h3>Search History</h3>
      <ul>
        {searchHistory.map((searchItem, index) => (
          <li key={index}>{searchItem}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchHistory;
