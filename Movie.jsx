import React, { useState } from "react";
import { data, useLocation } from "react-router-dom";
import YouTube from 'react-youtube';
const Movie = () => {
    let location = useLocation();
    console.log(location);
    let specificMovie = location.state;
    console.log(specificMovie);
    let [trailers,setTrailers] = useState();
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };
    function trailer(id) {
        fetch(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=5405f852812293f5486008e0ac489d19`)
        .then(res=>res.json())
        .then(data=>setTrailers(data.results[0].key));
    }
    return (
        <div className="d-flex align-items-center">
            <div className="left w-50 bg-primary">
                <img src={`https://image.tmdb.org/t/p/w500${specificMovie.poster_path}`} alt="" style={{width: "250px"}}
            className="w-100"/>
            </div>
            <div className="right w-50 text-center">
                <h1>{specificMovie.original_title}</h1>
                <p className="text-start">{specificMovie.overview}</p>
                <p>Rating: <b>{specificMovie.vote_average}</b></p>
                <button onClick={()=>trailer(specificMovie.id)}>Play Trailer</button>
            </div>
            {trailers && <YouTube videoId={trailers} opts={opts} />}
        </div>
    )
}
export default Movie