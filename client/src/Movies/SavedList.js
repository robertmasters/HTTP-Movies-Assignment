import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
function SavedList({ list }) {
  return (
    <div className="saved-list">
      <h3>Saved Movies:</h3>
      {list.map(movie => {
        return (
          <NavLink
            to={`/movies/${movie.id}`}
            key={movie.id}
            activeClassName="saved-active"
          >
            <span className="saved-movie">{movie.title}</span>
          </NavLink>
        );
      })}

      <Link to = '/add-movie'> Add Movie </Link>

      <div className="home-button">
        <Link to="/"> Home </Link>
      </div>
      
    </div>
  );
}

export default SavedList;
