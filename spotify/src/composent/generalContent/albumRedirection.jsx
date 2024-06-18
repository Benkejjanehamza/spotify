import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import NavBar from "../navBar.jsx";

export default function AlbumRedirection() {
    const queryParams = new URLSearchParams(window.location.search);
    const albumId = queryParams.get('id');
    const [album, setAlbum] = useState({});
    const [tracks, setTracks] = useState([]);

    let { id } = useParams();


    useEffect(() => {
        fetch(`http://localhost:8000/albums/${id}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((fetchedAlbum) => {
                setAlbum(fetchedAlbum.album);
                setTracks(fetchedAlbum.tracks);
            })
            .catch((error) => console.error("Error fetching album data:", error));
    }, [albumId]);

    function TracksList() {
        return tracks.map((track, index) => (
            <div key={index} className="track">
                <h1 className="track-title">{track.name}</h1>
                <audio src={track.mp3} controls className="audio-player"></audio>
            </div>
        ));
    }

    return (
        <div className="album-redirection-container">
            <NavBar />
            <div className="album-info">
                <img src={album.cover} alt="Cover" className="album-cover-all"/>
                <h1 className="album-title">{album.name}</h1>
                <h3 className="album-description">Description: {album.description}</h3>
            </div>
            <div className="tracks-list">
                <TracksList/>
            </div>
        </div>
    );
}
