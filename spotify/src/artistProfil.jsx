import React, { useEffect, useState } from 'react';

function ArtistProfil({ id }) {
    const [artist, setArtist] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showFullBio, setShowFullBio] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`http://localhost:8000/artists/${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setArtist({
                    ...data,
                    shortBio: data.description.slice(0, 50)
                });
            })
            .catch(error => {
                console.error("Error fetching artist data:", error);
                setError(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [id]);

    const toggleBio = () => {
        console.log("toto")
        setShowFullBio(!showFullBio);
    };

    if (isLoading) return <div>Chargement...</div>;
    if (error) return <div>Erreur lors du chargement des données de l'artiste.</div>;
    if (!artist) return <div>Aucun artiste trouvé.</div>;

    return (
        <div className="artist-card">
            <h1>{artist.name}</h1>
            <img src={artist.photo} alt={artist.name}/>
            <p>{showFullBio ? artist.description : artist.shortBio + "..."}</p>
            {artist.description && artist.description.length > 50 && (
                <button onClick={() => toggleBio()} className="bio-toggle-button">
                    {showFullBio ? "Voir moins" : "Voir plus"}
                </button>
            )}
        </div>

    );
}

export default ArtistProfil;
