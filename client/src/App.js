import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpadeMovieForm from './Movies/UpadeMovieForm'
import AddMovieForm from './Movies/AddMovieForm'

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  console.log('movieList: ',movieList)

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setMovieList={setMovieList} movieList={movieList}/>
      </Route>

      <Route path="/update-movie/:id">
        <UpadeMovieForm setMovieList={setMovieList}/>
      </Route>

      <Route path="/add-movie">
        <AddMovieForm movies={movieList} />
      </Route>

    </div>
  );
};

export default App;
