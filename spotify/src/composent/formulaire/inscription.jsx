import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
function Inscription() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    function navi(){
        navigate('/connexion')
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const jsonData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        };
        const dataToSend = JSON.stringify(jsonData);

        fetch(`http://localhost:8001/controller/inscription.php`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: dataToSend,
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if(res !== ""){
                    localStorage.setItem('id', res)
                    navigate("/accueilPage");
                }

            })
            .catch((error) => {
                console.error("Erreur lors de l'envoi du formulaire :", error);
            });


        console.log(formData);
    };

    return (
        <div className="form-container">
        <form onSubmit={handleSubmit} className="user-form">
            <h3>Inscription</h3>
            <div className="form-group">
                <label className="form-label">Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>
            <button type="submit" className="submit-btn">Submit</button>
            <p id='redi' onClick={navi}>Deja inscrit ?</p>
        </form>
        </div>
    );
}

export default Inscription;
