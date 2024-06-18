import React, { useEffect, useState } from "react";
import NavBar from "../navBar.jsx";
import {useNavigate} from "react-router-dom";

function AllGenre() {
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/genres`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setGenres(data);
            });
    }, []);
    const handleClick = (id) => {
        navigate(`/genreDetail/${id}`);
    };
    return (
        <div className='genre-container'>
            <NavBar />
            {genres.map((genre) => (
                <div key={genre.id} className='playlist-card2' onClick={() => handleClick(genre.id)}>
                    <h4>{genre.name}</h4>
                </div>
            ))}
        </div>
    );
}

export default AllGenre;
