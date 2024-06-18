import React from 'react';
import { useParams } from "react-router-dom";
import ArtistProfil from "../artistProfil.jsx";
import AlbumArtist from "./albumArtist.jsx";
import TrackPage from "../trackPage.jsx";
import NavBar from "./navBar.jsx";

;

function ArtistPage() {
    let { id } = useParams();

    return (
        <div className='artist-page-container'>
            <NavBar />
            <h3 className="album-artiste-page">Album</h3>
            <div className="content">
                <ArtistProfil id={id}/>

                <div className="album-part">
                    <div className="album-section">
                        <AlbumArtist id={id}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArtistPage;
