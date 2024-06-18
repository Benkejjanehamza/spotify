import {useNavigate} from "react-router-dom";
import {useState} from "react";
function ArtistCard(){

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/allArtist');
    };

    return(
        <div className='playlist-card' onClick={handleClick}>

            <h4>Artistes</h4>
        </div>
    )

}

export default ArtistCard;