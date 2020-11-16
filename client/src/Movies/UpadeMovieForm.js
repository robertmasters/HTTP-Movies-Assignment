import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";


const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: []
};

const UpdateMovieForm = props => {
  const { push } = useHistory();
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then(res => {
        console.log('respose form updatemovieform ID: ', id)
        console.log('respose form updatemovieform res: ', res)
      setMovie(res.data)
    })
    .catch(err =>{
      console.log(err)
    })
  }, [])

console.log('params: ', props)
console.log('id: ', id);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "price") {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    console.log('`/api/movies/${id}`: ', `/api/movies/${id}`)
    e.preventDefault();
    // make a PUT request to edit the movie
    axios
    .put(`http://localhost:5000/api/movies/${id}`, movie)
    .then((res)=> {
      console.log("res ",res.data)
      props.setMovieList(res.data)
      push(`/movies/${id}`)
    })
    .catch(err =>{
      console.log(err)
    })
  };

  return (
    <div className = 'updateMovie'>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div/>

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <div/>

        <input
          type="string"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={movie.metascore}
        />
        <div/>


        <button >Update</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;