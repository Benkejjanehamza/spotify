import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import NavBar from "../navBar.jsx";

function AllArtist() {
    const [artists, setArtists] = useState([]);
    const [page, setPage] = useState(0);
    const limit = 20;
    const navigate = useNavigate();

    const fetchArtists = useCallback(() => {
        fetch(`http://localhost:8000/artists?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((newArtists) => {
                setArtists(prevArtists => {
                    const updatedArtists = [...prevArtists];
                    newArtists.forEach(artist => {
                        if (!updatedArtists.some(a => a.id === artist.id)) {
                            updatedArtists.push(artist);
                        }
                    });
                    return updatedArtists;
                });
            });
    }, [page, limit]);

    useEffect(() => {
        fetchArtists();
    }, [fetchArtists]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 100) return;
            setPage(prevPage => prevPage + 1);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleViewArtist = (id) => {
        navigate(`/artistPage/${id}`); //
    };

    return (
        <div className="artist-container">
            <NavBar />
            {artists.map((artist) => (
                <div key={artist.id} className="profil-container">
                    <img id='profil-photo' src={artist.photo} alt={artist.name} />
                    <h1 id='artist-name'>{artist.name}</h1>
                    <button onClick={() => handleViewArtist(artist.id)}>Voir Artiste</button>
                </div>
            ))}
        </div>
    );
}

export default AllArtist;
