import React, { useEffect, useState } from 'react'
import Youtube from 'react-youtube'
import { imageUrl,API_KEY } from '../../Constants/Constant'
import './RowPost.css'
import axios from '../../axios'

function RowPost(props) {
    const[pop,setPop] = useState(false);

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
        width : '800',
        playerVars:{
            autoplay:1,
        }
    }

    const handleMovie = (id) => {
        axios
          .get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
          .then((response) => {
            if (response.data.results.length !== 0) {
              seturlId(response.data.results[0]);
              setPop(true);
            } else {
              window.alert('No videos found for this movie.');
            }
          })
          .catch((error) => {
            console.error('Error fetching movie videos:', error);
            window.alert('Error fetching movie videos. Please try again later.');
          });
      };
      
    const closeVideo=()=>{
    setPop(false)
    }
    return (
        <div className='row'>
            <h1>{props.title}</h1>
            <div className='posters'>
                {movies.map((obj) =>
                    <img onClick={() => handleMovie(obj.id)} className={props.isSmall ? "smallPoster" :"poster"} src={`${imageUrl+obj.backdrop_path}`} alt='poster'/>
                    
                )}
            </div>
            {/* { urlid && < Youtube videoId={urlid.key} opts={opts} /> } */}
            { pop  && 
            
            <div className="video-popup">
                <button className="close-button" onClick={closeVideo}> X</button>
                <div className="video-content">

                    < Youtube videoId={urlid.key} opts={opts} />
                <h2 className='video-title'>{urlid.name}</h2>
     
            </div>
          </div>}

        </div>
    )
}

export default RowPost
