import './dungeon.css';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useBattleRolls } from '../../context/BattleContext';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

import DungeonShortcuts from './DungeonShortcuts';

const Dungeon = () => {

    const { auth } = useContext(AuthContext);
    const { openBattleRolls } = useBattleRolls();

    const { cityName, cityId } = useParams();
    const [structure, setStructure] = useState({});
    const [character, setCharacter] = useState(auth.user.character);

    async function getStructure() {
        const structureId = cityId;
        const response = await Axios.get('http://localhost:3001/api/structure/getById', {
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
        <div className='row row-cols-2 dungeon-background' style={{ backgroundImage: `url(../../${structure.image})` }}>
            <div className='col-3'>
                <div className='row text-uppercase'>
                    <ul className='text-center mt-2'>
                        <li style={{ '--accent-color': '#5c0623' }}>
                            <div className='icon'><img className='dungeon-icon' src={`../../${structure.icon}`} alt='Structure heraldry' /></div>
                            <div className='title'>{structure.name}</div>
                        </li>
                    </ul>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <DungeonShortcuts
                        character={character}
                        setCharacter={setCharacter}
                        closeAllDialogs={closeAllDialogs}
                        setIsAlleyDialog={setIsAlleyDialog}
                        setIsArenaDialog={setIsArenaDialog}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dungeon;
