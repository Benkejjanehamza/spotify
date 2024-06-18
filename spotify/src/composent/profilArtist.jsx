import React, { useEffect, useState } from "react";

function ProfilArtist() {
    const [bio, setBio] = useState('');
    const [shortBio, setShortBio] = useState('');
    const [showFullBio, setShowFullBio] = useState(false);
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8000/artists/1`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((res) => {
                setBio(res.bio);
                setShortBio(res.bio.slice(0, 100));
                setPhoto(res.photo);
                setName(res.name);
            });
    }, []);

    const handleShowFullBio = () => {
        setShowFullBio(true);
    };

    const handleShowShortBio = () => {
        setShowFullBio(false);
    };

    return (
        <div className="profil-container">
            <img id='profil-photo' src={photo} alt="photo" />
            <h1 id='artist-name'>{name}</h1>
            <h3>Biographie</h3>
            <p id="bio-artist">
                {showFullBio ? bio : shortBio}
                {bio.length > 100 && (
                    <button onClick={showFullBio ? handleShowShortBio : handleShowFullBio}>
                        {showFullBio ? "Voir Moins" : "Voir Plus"}
                    </button>
                )}
            </p>
        </div>
    );
}

export default ProfilArtist;
