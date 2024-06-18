import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import NavBar from "./navBar.jsx";




function GenreDetail() {

    let { id } = useParams();
    const [albumLongueur, setAlbumLongueur] = useState();

    id = parseInt(id, 10);

    const [genreAll, setGenreAll] = useState(null);
    const [fetched, setFetched] = useState(false);
    const [album, setAlbum] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!fetched) {
            fetch(`http://localhost:8000/genres/${id}`)
                .then(res => res.json())
                .then(data => {
                    setGenreAll(data.albums);
                    setAlbumLongueur(data.albums.length);
                    setFetched(true);
                })
                .catch(error => console.error('Error fetching genre:', error));
        }
    }, [id, fetched]);

    useEffect(() => {
        const fetchAlbums = async () => {
            const fetchedAlbums = [];
            for (let x = 0; x < albumLongueur; x++) {
                try {
                    const res = await fetch(`http://localhost:8000/albums/${genreAll[x]}`);
                    const resAlbum = await res.json();
                    fetchedAlbums.push(resAlbum);
                } catch (error) {
                    console.error('Error fetching album:', error);
                }
            }
            setAlbum(fetchedAlbums);
        };

        if (genreAll && genreAll.length > 0) {
            fetchAlbums();
        }
    }, [genreAll, albumLongueur]);

    const genreDetail = [
        {
            "id": 1,
            "name": "Classical",
            "description": "Musique savante occidentale englobant les périodes baroque, classique, romantique et moderne."
        },
        {
            "id": 2,
            "name": "New Age",
            "description": "Genre musical mélangeant des influences de la musique électronique, du folk et de la musique classique."
        },
        {
            "id": 3,
            "name": "Electronica",
            "description": "Genre de musique électronique englobant divers sous-genres destinés à être écoutés plutôt qu'à être dansés."
        },
        {
            "id": 4,
            "name": "World",
            "description": "Musique qui englobe différents styles musicaux de cultures du monde entier."
        },
        {
            "id": 5,
            "name": "Ambient",
            "description": "Genre musical caractérisé par une atmosphère immersive et une tonalité plus basée sur le timbre que sur la structure traditionnelle de la musique."
        },
        {
            "id": 6,
            "name": "Jazz",
            "description": "Genre musical originaire du début du 20e siècle dans les communautés afro-américaines, combinant racines africaines et influences européennes."
        },
        {
            "id": 7,
            "name": "Hip Hop",
            "description": "Mouvement culturel et artistique qui a commencé dans les communautés afro-américaines dans les années 1970, englobant la musique rap, le DJing, le breakdance et le graffiti."
        },
        {
            "id": 8,
            "name": "Alt Rock",
            "description": "Genre de rock alternatif qui émerge au début des années 1980 et qui se caractérise par son refus des conventions commerciales du rock."
        },
        {
            "id": 9,
            "name": "Electro Rock",
            "description": "Fusion du rock et de la musique électronique, utilisant des synthétiseurs et des rythmes électroniques pour créer une texture sonore riche."
        },
        {
            "id": 10,
            "name": "Hard Rock",
            "description": "Genre de rock caractérisé par une utilisation intensive des guitares électriques, de la batterie et parfois de paroles provocatrices."
        }
    ]
    const genre = genreDetail.find(genre => genre.id === id);
    if (!genre) return <div>Genre introuvable.</div>;

    const navigationToAlbum = (albumId) => {
        console.log(albumId)
        navigate(`/albumRedirection/artist/${albumId}`);
    }


    return (
        <>
            <NavBar/>
            <div className="block_album_fetched">
                <div className="genre-detail-container">
                    <h1 className="genre-title">{genre.name}</h1>
                    <p className="genre-description">{genre.description}</p>
                </div>
                <div className="block_album_fetched">
                    {album.length === 0 ? (
                        <p>Chargement des albums...</p>
                    ) : (
                        album.map((albumData, index) => (
                            <div key={index} className="album">
                                <div className="album-container" onClick={() => navigationToAlbum(albumData.album.id)}>
                                    <img src={albumData.album.cover} alt="Cover" className="album-cover"/>
                                    <h1 className="titre-album">{albumData.album.name}</h1>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>


    )

    return (
        <div className="genre-detail-container">
            <h1 className="genre-title">{genre.name}</h1>
            <p className="genre-description">{genre.description}</p>
            <button onClick={() => AlbumByGenre(genre.id)} className="albums-by-genre-link">Découvre ce genre</button>
        </div>
    );


}

export default GenreDetail;