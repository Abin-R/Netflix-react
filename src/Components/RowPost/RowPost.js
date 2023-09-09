import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
import { imageUrl,API_KEY } from '../../Constants/Constant'
import './RowPost.css'
import axios from '../../axios'

function RowPost(props) {

    const [movies, setMovies] = useState([])
    const [urlid, seturlId] = useState('')

    useEffect(() => {
        axios.get(props.Url).then((response) =>{
            console.log(response.data)
            setMovies(response.data.results)
        }).catch(err=>{
            alert('Network Error')
        })
    }, [])

    const opts= {
        height : '390',
        width : '100%',
        playerVars:{
            autoplay:1,
        }
    }

    const handleMovie = (id) =>{
        axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
            if(response.data.results.length !==0){
                seturlId(response.data.results[0])
            }else{
                console.log('array is empty')
            }
        })
        console.log(id)
    }
    return (
        <div className='row'>
            <h1>{props.title}</h1>
            <div className='posters'>
                {movies.map((obj) =>
                    <img onClick={() => handleMovie(obj.id)} className={props.isSmall ? "smallPoster" :"poster"} src={`${imageUrl+obj.backdrop_path}`} alt='poster'/>
                    
                )}
            </div>
            { urlid && < Youtube videoId={urlid.key} opts={opts} /> }

        </div>
    )
}

export default RowPost
