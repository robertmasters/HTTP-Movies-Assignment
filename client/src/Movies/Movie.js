import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory, Route } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpadeMovieForm from './UpadeMovieForm'

function Movie( props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory();
  const { id } = useParams();

  // const item = props.movie.find(
  //   thing => `${thing.id}` === props.match.params.id
  // );

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {setMovie(res.data)
      
      console.log("ID: ", id)})
      .catch((err) => console.log(err.response));
  };


  // const item = props.items.find(
  //   thing => `${thing.id}` === props.match.params.id
  // );

  const updateButton = () => {
    console.log('params.id: ',params.id)
    push(`/update-movie/${params.id}`);
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  // console.log('props.setMovieList: ' ,props.setMovieList)
  const handleDelete = (e) => {
    e.preventDefault()
    console.log('handleDelete is happening')
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(res =>{
      props.setMovieList(
        props.movieList.filter( movie => 
          movie.id !== res.data
        )
      )
      push('/')
    })
    .catch(error =>{
      console.log(error)
    })
    
  }
//<UpadeMovieForm movie={movie}/>
  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      

      <button className="save-button" onClick={saveMovie}>
        Save
      </button>

      <button className='update-button' onClick={updateButton}>
        Update Movie
      </button>

      <button className='delete-button' onClick={handleDelete}>
      Delete Movie
      </button>
      
    </div>
  );
}

export default Movie;
