import PlaylistCard from "./cardAccueil/playlistCard.jsx";
import GenreCard from "./cardAccueil/genreCard.jsx";
import ArtistCard from "./cardAccueil/artistCard.jsx";
import BarreSearch from "./cardAccueil/barreSearch.jsx";
import AlbumCard from "./cardAccueil/albumCard.jsx";
import { useNavigate } from "react-router-dom";
import NavBar from "./navBar.jsx";
import React, {useCallback, useEffect, useState} from 'react';
import Searchbar from "./cardAccueil/barreSearch.jsx";

function AccueilPage() {

    function AlbumItem({ album, onClick }) {
        const [isExpanded, setIsExpanded] = useState(false);
        const shortDescription = album.description.length > 100 ? album.description.substring(0, 100) + "..." : album.description;

        return (
            <div className="album-container" onClick={onClick}>
                <img src={album.cover} alt="Cover" className="album-cover"/>
                <h1 className="titre-album">{album.name}</h1>
                <h3 className="description-album">Description</h3>
                <button>
                    Show more
                </button>
            </div>
        );
    }

    const [albums, setAlbums] = useState([]);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();
   

    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()
            * (max - min + 1)) + min;
    };


    const fetchAlbums = useCallback(() => {
        fetch(`http://localhost:8000/albums?page=${randomNumberInRange(0,1621)}&limit=3`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((newAlbums) => {
                console.log(newAlbums)
                setAlbums((prevAlbums) => {
                    const updatedAlbums = [...prevAlbums];
                    newAlbums.forEach(album => {
                        if (!updatedAlbums.find(a => a.id === album.id)) {
                            updatedAlbums.push(album);
                        }
                    });
                    return updatedAlbums;
                });
            });
    }, [page]);

    const navigationToAlbum = (albumId) => {
        console.log(albumId)
        navigate(`/albumRedirection/artist/${albumId}`);
    }

    useEffect(() => {
        fetchAlbums();
    }, [fetchAlbums]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            setPage((prevPage) => prevPage + 5);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="accueil-page">
            <NavBar/>
            <div className="recherche">
                <Searchbar/>
            </div>
            <div className="choix-content">
                <GenreCard/>
                <ArtistCard/>
                <AlbumCard/>
            </div>
            <div className="artist-album-container">
                {albums.map((album) => (
                    <AlbumItem key={album.id} album={album} onClick={() => navigationToAlbum(album.id)}/>
                ))}
            </div>

        </div>
    );
}

export default AccueilPage;
