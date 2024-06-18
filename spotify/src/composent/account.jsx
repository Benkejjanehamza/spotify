import {useEffect, useState} from "react";
import NavBar from "./navBar.jsx";
function Account(){

    const  [username, setUsername] = useState('');
    const  [mail, setMail] = useState('');
    const [selectedImage, setSelectedImage] = useState("https://cdn.discordapp.com/attachments/1000504865467945001/1217818804470546492/zazzou6566_lo-fi_background_chill_5bcea42d-b017-4b77-a711-9a8aa3332382.png");    const idUser = localStorage.getItem('id');

    const jsonData = {
        id: idUser,

    };
    const image = {
        url2: 'https://cdn.discordapp.com/attachments/1000504865467945001/1219288272174452747/zazzou6566_ambiant_vibe_chill_dark_0c984f82-d3ef-441b-aa8c-b24d21ba4172.png?ex=660ac1b1&is=65f84cb1&hm=b4c7c2d26f49970a5c4af1cae7fbd31f782ed67ecd2d606e9a7e453bc6e8c8a9&',
        url3: 'https://cdn.discordapp.com/attachments/1000504865467945001/1217818804470546492/zazzou6566_lo-fi_background_chill_5bcea42d-b017-4b77-a711-9a8aa3332382.png?ex=660ea3a4&is=65fc2ea4&hm=80128d39f9eb58432a57aad670bc3c3950653acfca96a49805e32299ed9d5fac&',
        url4:'https://cdn.discordapp.com/attachments/1000504865467945001/1217819421129707580/zazzou6566_ambiant_vibe_chill_dark_939d9679-ad59-47b4-a243-e0243d6643ae.png?ex=660ea437&is=65fc2f37&hm=f0002475372f7d2a59dca2d32188a764f04244d5cabcde8ecc12155cd6a63d6a&',
    };



    useEffect(() => {
        fetch(`http://localhost:8001/controller/account.php`, {
            method: "POST",
            body: JSON.stringify(jsonData),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                setUsername(res[0]["username"]);
                setMail(res[0]["email"])


            });
    }, []);

return (
    <div className="account-container">
        <NavBar/>
        <div className="info-user">
            <img src={image.url3} alt="Profil" className="profile-image"/>
            <h1>{username}</h1>
            <h4>{mail}</h4>
        </div>
    </div>
)

}

export default Account;

