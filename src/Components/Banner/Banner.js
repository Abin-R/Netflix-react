import React, { useEffect, useState } from 'react';
import Youtube from 'react-youtube';
import { API_KEY, imageUrl } from '../../Constants/Constant';
import axios from '../../axios';
import './Banner.css';

function Banner() {
  const [pop, setPop] = useState(false);
  const [urlid, seturlId] = useState('');
  const [movie, setMovie] = useState(null); // Initialize movie as null

  const number = Math.floor(Math.random() * 21);

  const closeVideo = () => {
    setPop(false);
  };

  const handleMovie = async (id) => {
    try {
      const response = await axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
      if (response.data.results.length !== 0) {
        seturlId(response.data.results[0]);
        setPop(true);
      } else {
        window.alert('No videos found for this movie.');
      }
    } catch (error) {
      window.alert('Error fetching movie videos:', error);
    }
  };
  

  const opts = {
    height: '390',
    width: '800',
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response) => {
      console.log(response.data.results[number]);
      setMovie(response.data.results[number]);
    });
  }, []);

  return (
    <div className='banner' style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})` }}  >
      <div className='content'>
        <h1 className='title'>{movie ? movie.name || movie.title : ''}</h1>
        <div className='banner_buttons'>
          {movie && ( // Only render the "Play" button if movie exists
            <button onClick={() => handleMovie(movie.id)} className='button'>
              Play
            </button>
          )}
          <button className='button'>My List</button>
        </div>
        <h1 className='description'>{movie ? movie.overview : ''}</h1>
      </div>
      <div className='fade_bottom'></div>
      {pop && (
        <div className='video-popup'>
          <button className='close-button' onClick={closeVideo}>
            X
          </button>
          <div className='video-content'>
            <Youtube videoId={urlid.key} opts={opts} />
            <h2 className='video-title'>{urlid.name}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default Banner;
