import React, {useEffect, useState} from 'react';
import api from '../services/api';
import io from 'socket.io-client';


import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';
import './Main.css';

import { Link } from 'react-router-dom';
import { Socket } from 'dgram';


export default function Main({match}){
    const [user, setUser] = useState([]); 

    useEffect(() => {
        async function loadUser(){
            const response = await api.get('/devs', {
                headers: { 
                    user: match.params.id, 
                }
            })

            setUser(response.data);

        }
        loadUser();
    }, [match.params.id])

    useEffect(() => {
       const socket = io('http://192.168.0.107:3333',{
           query: { user : match.params.id}
       });
       socket.on('match', dev =>{
           console.log(dev);
       })

    },[match.params.id])

    async function handleLike(id){
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id},
        })

        setUser(user.filter(user => user._id != id));
    }

    async function handleDislike(id){
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id},
        })

        setUser(user.filter(user => user._id != id));
    }



    return(
        <div className="main-container">
            <Link to="/"> 
                <img src={logo} alt="Tindev"/>
            </Link>
            {
                user.length > 0 ? (
                    <ul>
                    {user.map(user => (
                        <li key={user._id} >
                        <img src={user.avatar} alt={user.name}/>
                        <footer>
                            <strong>{user.name}</strong>
                            <p>{user.bio}</p>
                        </footer>
                        <div className="buttons">
                            <button type="button" onClick={() => handleLike(user._id)} >
                                <img src={like} alt="like"/>
                            </button>
                            <button type="button" alt="dislike" onClick={() => handleDislike(user._id)}>
                                <img src={dislike} alt="Dislike"/>
                            </button>
                        </div>
                    </li>
                    ))}
                    </ul>
                ) : (
                    <div className="empty"> Acabou :( </div> 
                )
            }

        </div>        
    );
}