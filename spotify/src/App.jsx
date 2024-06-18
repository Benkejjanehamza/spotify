import './App.css';
import ProfilArtist from "./composent/profilArtist.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlbumArtist from "./composent/albumArtist.jsx";
import ArtistPage from "./composent/artistPage.jsx";
import AccueilPage from "./composent/accueilPage.jsx";
import AllAlbum from "./composent/generalContent/allAlbum.jsx";
import AllArtist from "./composent/generalContent/allArtist.jsx";
import AllPlaylist from "./composent/generalContent/allGenre.jsx";
import AlbumRedirection from "./composent/generalContent/albumRedirection.jsx";
import ArtistProfil from "./artistProfil.jsx";
import TrackPage from "./trackPage.jsx";
import GenreDetail from "./composent/genreDetail.jsx";
import Inscription from "./composent/formulaire/inscription.jsx";
import Account from "./composent/account.jsx";
import Connexion from "./composent/formulaire/connexion.jsx";

const router = createBrowserRouter([
    {
        path: '/profilArtist',
        element: <div><ProfilArtist /></div>
    },
    {
        path: '/albumArtist',
        element: <div><AlbumArtist/></div>
    },
    {
      path: '/albumRedirection',
      element: <div><AlbumRedirection/></div>
    },
    {
        path: '/albumRedirection/artist/:id',
        element: <div><AlbumRedirection/></div>
    },
    {
        path: '/artistPage/:id',
        element: <div><ArtistPage/></div>
    },
    {
        path: "/accueilPage",
        element: <div><AccueilPage/></div>
    },
    {
        path: "/allAlbum",
        element: <div><AllAlbum /></div>
    },
    {
        path: "/allArtist",
        element: <div><AllArtist /></div>
    },
    {
        path: "/allGenre",
        element: <div><AllPlaylist /></div>
    },
    {
        path: "artist/:id",
        element: <div><ArtistProfil /></div>
    },
    {
        path: "/trackPage",
        element: <div><TrackPage /></div>
    },
    {
        path: "/genreDetail/:id",
        element: <div><GenreDetail/></div>
    },
    {
        path: "/inscription",
        element: <div><Inscription/></div>
    },
    {
        path:'/account',
        element: <div><Account/></div>
    },
    {
        path: '/connexion',
        element: <div><Connexion /></div>
    }



]);

function App() {
    return <RouterProvider router={router} />
}

export default App;