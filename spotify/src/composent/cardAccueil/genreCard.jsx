import {useNavigate} from "react-router-dom";

function GenreCard(){
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/allGenre');
    };

    return(
        <div className='playlist-card' onClick={handleClick}>

            <h4>Genres</h4>
        </div>
    )

}

export default GenreCard;