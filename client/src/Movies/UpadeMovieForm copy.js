import React, {useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initial = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  };

const UpadeMovieForm = props => {

    const [movie, setMovie] = useState(null);
    const params = useParams();
    const {push} = useHistory();

    const { title, director, metascore, stars } = props.movie;
    
    // const movie = props.movies[id]

    console.log('update props: ', props)
    // console.log('props.movies[id].title: ', movie.title)
    console.log('title: ',title)

    const fetchMovie = (id) => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) => {setMovie(res.data)
          
          console.log("ID: ", id)})
          .catch((err) => console.log(err.response));
      };

    useEffect(() => {
        fetchMovie(params.id);
      }, [params.id]);

    return (
        
            <div className="movie-card">
              <h2>{title}</h2>
              <div className="movie-director">
                Director: <em>{director}</em>
              </div>
              <div className="movie-metascore">
                Metascore: <strong>{metascore}</strong>
              </div>
              <h3>Actors</h3>
        
              {stars.map(star => (
                <div key={star} className="movie-star">
                  {star}
                </div>
              ))}
            </div>
          
    )
}

export default UpadeMovieForm;