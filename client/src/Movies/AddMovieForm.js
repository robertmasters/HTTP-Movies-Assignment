import React, {useState, useEffect } from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

const initialValues = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
}
const AddMovieForm = props => {
    const {movies, setMovies} = props
    const [values, setValues] = useState(initialValues)
    const {push} = useHistory();

    const onChange = e => {
        e.persist();
        const { name, value } = e.target;
        setValues(
            {
               ...values,
               [name]: value,
            }
        )
    }

    const postMovie = (movie) => {
        axios.post('http://localhost:5000/api/movies', movie)
        .then((res)=> {
            console.log('postMovie res: ',res)
            setMovies(res.data)
        })
        .catch((error) => {
            console.log('error: ', error)
        })
    }
    const { v4: uuidv4 } = require('uuid');
    const onSubmit = e => {
        e.preventDefault()
        const newMovie = {
            id: uuidv4(),
            title: values.title,
            director: values.director,
            metascore: values.metascore,
            stars: []
        }
        postMovie(newMovie)
        setValues(initialValues)
        push('/')
    }

    return (
        <div>
            Add Movie
            <form className = 'movie-form' onSubmit = {onSubmit}>
                <label>Title: 
                    <input 
                        type = 'text'
                        name = 'title'
                        onChange = {onChange}
                        value = {values.title}
                        placeholder = 'title'
                    />
                </label>

                <label>Director: 
                    <input 
                        type = 'text'
                        name = 'director'
                        onChange = {onChange}
                        value = {values.director}
                        placeholder = 'director'
                    />
                </label>

                <label>Metascore: 
                    <input 
                        type = 'number'
                        name = 'metascore'
                        onChange = {onChange}
                        value = {values.metascore}
                        placeholder = 'metascore'
                    />
                </label>

                <button>Submit</button>
            </form>

        </div>
    )
}

export default AddMovieForm;