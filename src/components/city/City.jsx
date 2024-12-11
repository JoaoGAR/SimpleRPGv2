import './city.css';
import './dialogs/cityDialog.css';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { ToastContainer, toast, Flip } from "react-toastify";

import CityShortcuts from './CityShortcuts';
import AlleyDialog from './dialogs/alley/AlleyDialog';
import ArenaDialog from './dialogs/arena/ArenaDialog';

const City = () => {

    const { auth } = useContext(AuthContext);

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

    const [isAlleyDialog, setIsAlleyDialog] = useState(false);
    const [isArenaDialog, setIsArenaDialog] = useState(false);

    const closeAllDialogs = () => {
        setIsAlleyDialog(false);
        setIsArenaDialog(false);
    };

    useEffect(() => {
        getStructure();
    }, []);

    return (
        <div className="row row-cols-2 city-background" style={{ backgroundImage: `url(../../${structure.image})` }}>
            <div className="col-3">
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
                        closeAllDialogs={closeAllDialogs}
                        setIsAlleyDialog={setIsAlleyDialog}
                        setIsArenaDialog={setIsArenaDialog}
                    />
                </div>
            </div>
            <div className="col-7" style={{ position: 'relative' }}>
                <div className={`row city-dialog ${isArenaDialog ? 'is-open' : ''}`}>
                    <ArenaDialog
                        cityId={cityId}
                    />
                </div>
                <div className={`row city-dialog ${isAlleyDialog ? 'is-open' : ''}`}>
                    <AlleyDialog
                        cityId={cityId}
                    />
                </div>
            </div>
            <div className='col-1'>
                <p>lateral</p>
            </div>
        </div>
    );
};

export default City;
