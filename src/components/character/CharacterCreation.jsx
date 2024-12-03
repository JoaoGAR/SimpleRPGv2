import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

import LogoutButton from '../login/LogoutButton';
import RaceCard from '../race/raceCard';

const CharacterCreation = () => {
    const { auth, logout } = useContext(AuthContext);
    const [listRaces, setlistRaces] = useState();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        raceId: '',
        coordsx: 200,
        coordsy: 200,
        userId: auth.user.user.id,
    });

    const { name, raceId } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        Axios.get("http://localhost:3001/api/character/races/get").then((response) => {
            setlistRaces(response.data);
        });
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(auth);
            const res = await Axios.post('http://localhost:3001/api/character/register', formData).then((response) => {
                if (res.status === 200) {
                    navigate('/dashboard');
                }
            });
        } catch (err) {
            console.error(err.response);
            alert(err.response.data.msg || 'Falha ao criar personagem');
        }
    };

    return (
        <div className="container">
            <h2>Criação de personagem</h2>

            <form onSubmit={onSubmit}>
                <div className="form-floating mt-4">
                    <input type="text" className="form-control" id="name" name="name" value={name} onChange={onChange} required />
                    <label htmlFor="name">Nome do personagem</label>
                </div>

                <div className="form-floating mt-4 mb-4">
                    <select className="form-select" id="raceId" aria-label="Floating label select example" name="raceId" value={raceId} onChange={onChange} required>
                        {typeof listRaces !== "undefined" && listRaces.map((value) => (
                            <option key={value.id} value={value.id}>{value.name}</option>
                        ))}
                    </select>
                    <label htmlFor="raceId">Raça</label>
                </div>
                <button type="submit" className="btn btn-primary w-100">Criar</button>
            </form>

            <div className="row">
                <div className="mt-3">
                    <LogoutButton></LogoutButton>
                </div>
            </div>
        </div>
    );
};

export default CharacterCreation;