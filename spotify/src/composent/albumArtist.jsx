import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

function AlbumItem({ album }) {
    const navigate = useNavigate();

    const handleAlbumClick = () => {
        navigate(`/albumRedirection/artist/${album.id}`)
    }
    const [isExpanded, setIsExpanded] = useState(false);
    const shortDescription = album.description.length > 100 ? album.description.substring(0, 100) + "..." : album.description;

    return (
        <div className="album-container" onClick={handleAlbumClick}>
            <img src={album.cover} alt="Cover" className="album-cover"/>
            <h1 className="titre-album">{album.name}</h1>
            <h3 className="description-album">Description</h3>
            <p>{isExpanded ? album.description : shortDescription}</p>
            <button onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
            }}>
                {isExpanded ? "Réduire" : "Lire la suite"}
            </button>
        </div>
    );
}

function AlbumArtist({id}) {
    const [albums, setAlbums] = useState([]);
    const queryParams = new URLSearchParams(window.location.search);
    console.log(queryParams)

    useEffect(() => {
        fetch(`http://localhost:8000/albums/artist/${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setAlbums(res);
            });
    }, []);



    return (
        <div className="artist-album-container">
            {albums.map((album) => (
                <AlbumItem key={album.id} album={album} />
            ))}
        </div>
    );
}

export default AlbumArtist;
