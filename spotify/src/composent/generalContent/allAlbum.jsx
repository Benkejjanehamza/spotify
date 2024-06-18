import React, { useEffect, useState, useCallback } from "react";
import paginationFlecheBas from '../../assets/paginationFlecheBas.png'
import {useNavigate} from "react-router-dom";
import NavBar from "../navBar.jsx";


function AllAlbum() {
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
    const limit = 20;

    const fetchAlbums = useCallback(() => {
        fetch(`http://localhost:8000/albums?page=${page}&limit=${limit}`, {
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
        <>
            <NavBar />
            <div className="artist-album-container">
                {albums.map((album) => (
                    <AlbumItem key={album.id} album={album} onClick={() => navigationToAlbum(album.id)} />
                ))}
            </div>
            <div className={"buttonPage"}>
                <img src={paginationFlecheBas} className={"buttonDownPage"} />
            </div>
        </>
    );
}

export default AllAlbum;