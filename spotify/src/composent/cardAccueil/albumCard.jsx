import { useNavigate } from "react-router-dom";

function AlbumCard() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/allAlbum');
    };

    return (
        <div className='playlist-card' onClick={handleClick}>
            <h4>Albums</h4>
        </div>
    );
}

export default AlbumCard;
