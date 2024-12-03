import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Dashboard = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleCharacterCreation = () => {
        navigate('/character/register');
    };

    const handleStartGame = () => {
        navigate('/world');
    };

    return (
        <div className="container">
            <h2>Dashboard</h2>
            {auth.user && (
                <div>
                    <p>Nome: {auth.user.name}</p>
                    <p>Email: {auth.user.email}</p>
                </div>
            )}

            {!auth.user.character ? (
                <div className="row">
                    <div className="col">
                        <button className="btn btn-success" type="button" onClick={handleCharacterCreation}>Criar personagem</button>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <img src={"../" + auth.user.character.race.icon} className="card-img-top" alt="Race icon" />
                            <div className="card-body">
                                <h5 className="card-title">{auth.user.character.name}</h5>
                                <p className="card-text">{auth.user.character.race.name}</p>
                                <a href="#" className="btn btn-primary" onClick={handleStartGame}>Jogar</a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="row">
                <div className="mt-3">
                    <LogoutButton></LogoutButton>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;