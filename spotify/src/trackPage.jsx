import React, { useEffect, useState } from 'react';

function TrackPage( { id } ) {
    const [track, setTrack] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/tracks/${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setTrack(data);
            })
            .catch((error) => console.error("Error fetching track data:", error));
    }, []);

    if (!track) return <div>Chargement de la piste...</div>;

    // Convertir la durée de la piste en minutes:secondes
    const durationMin = Math.floor(track.duration / 60);
    const durationSec = track.duration % 60;

    return(
        <div className="track-card">
            <div className="track-info">
                <h2>{track.name}</h2>
                <p>Durée : {durationMin}:{durationSec < 10 ? `0${durationSec}` : durationSec}</p>
                <audio controls src={track.mp3}>
                    Votre navigateur ne supporte pas l'élément audio.
                </audio>
            </div>
        </div>
    );
}

export default TrackPage;
