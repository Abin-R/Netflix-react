import React,{ useEffect, useState } from 'react'
import { API_KEY,imageUrl } from '../../Constants/Constant'
import axios from '../../axios'
import "./Banner.css"

function Banner() {

    const [movie, setMovie] = useState()

    const number = Math.floor(Math.random() * 21)
    
    useEffect(() => {
        axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) =>{
            console.log(response.data.results[number])
            setMovie(response.data.results[number])
        })
    }, [])

    return (
        <div className='banner' style={{backgroundImage: `url(${movie ? imageUrl+movie.backdrop_path : ""})`}}>
            <div className='content'>
                <h1 className='title'>{movie ? movie.name || movie.title: ""}</h1>
                <div className='banner_buttons'>
                    <button className='button'>Play</button>
                    <button className='button'>My List</button>
                </div>
                <h1 className='description'>{ movie ? movie.overview : ""} </h1>
            </div>
        <div className='fade_bottom'></div>
        </div>
    )
}

export default Banner
