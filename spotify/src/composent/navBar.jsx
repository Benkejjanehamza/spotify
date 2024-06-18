import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {

    function deconnexion(){
        localStorage.removeItem("id");
    }
    return (
        <nav style={navStyle}>
            <ul style={listStyle}>
                <li style={itemStyle}>
                    <Link to="/accueilPage" style={linkStyle}>Accueil</Link>
                </li>
                <li style={itemStyle}>
                    <Link to="/account" style={linkStyle}>Account</Link>
                </li>
                <li style={itemStyle}>
                    <Link to="/inscription" style={linkStyle} onClick={deconnexion}>Deconexion</Link>
                </li>
            </ul>
        </nav>
    );
}

const navStyle = {
    backgroundColor: '#333',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0 20px',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
};


const listStyle = {
    listStyle: 'none',
    display: 'flex',
};

const itemStyle = {
    marginRight: '20px',
};

const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    fontSize: '20px',
};

export default NavBar;
