import "./city.css";
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast, Flip } from "react-toastify";

import CityShortcuts from './CityShortcuts';

const City = () => {

    const { auth } = useContext(AuthContext);
    const [selectedItem, setSelectedItem] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { cityName, cityId } = useParams();
    const [structure, setStructure] = useState({});
    const [character, setCharacter] = useState(auth.user.character);

    async function getStructure() {
        const structureId = cityId;
        const response = await Axios.get("http://localhost:3001/api/structure/getById", {
            params: { structureId },
        });
        if (response.data) {
            const data = response.data;
            setStructure(data);
        }
    }

    const handleMouseMove = (event) => {
        setMousePosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    const openItemInfoDialog = (item, equiped) => {
        setSelectedItem({ ...item, equiped: equiped });
    };
    const closeItemInfoDialog = () => setSelectedItem(null);

    useEffect(() => {
        getStructure();
    }, []);

    return (
        <div className="row row-cols-2 city-background" style={{ backgroundImage: `url(../../${structure.image})` }}>
            <div className="col-5">
                <div className="row text-uppercase">
                    <ul className="text-center mt-2">
                        <li style={{ "--accent-color": "#0B374D" }}>
                            <div className="icon"><img className="city-icon" src={`../../${structure.icon}`} alt="Structure heraldry" /></div>
                            <div className="title">{structure.name}</div>
                        </li>
                    </ul>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <CityShortcuts
                        character={character}
                        setCharacter={setCharacter}
                        setSelectedItem={setSelectedItem}
                        openItemInfoDialog={openItemInfoDialog}
                        closeItemInfoDialog={closeItemInfoDialog}
                    />
                </div>
            </div>
            <div className="col-7">
            </div>
        </div>
    );
};

export default City;
