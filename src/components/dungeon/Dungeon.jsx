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

    const handleClickMenu = (dialog) => {
        closeAllDialogs();
        if (distance > 50) {
            toast.warning('O personagem precisa estar perto da estrutura para interagir.', {
                position: 'top-right',
                autoClose: 600,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Flip,
            });
            return false;
        }
        dialog(true);
    };

    const handleTravel = async () => {
        try {
            const response = await Axios.post('http://localhost:3001/api/job/startWork', {
                duration: 0,
                jobId: 1,
                jobStatus: 0,
                coordsx: structure.coordsx,
                coordsy: structure.coordsy,
            });

            if (response.data.status != 200) {
                toast.warning(`${response.data.msg}`, {
                    position: 'top-right',
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Flip,
                });
                return null;
            }
            toast.success(`Viajando adicionado à fila`, {
                position: 'top-right',
                autoClose: 600,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Flip,
            });
        } catch (err) {
            toast.error(`Falha ao adicionar Viajando à fila`, {
                position: 'top-right',
                autoClose: 600,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Flip,
            });
        }
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
                        handleClickMenu={handleClickMenu}
                        dialogs={{ setIsAlleyDialog, setIsArenaDialog }}
                        handleTravel={handleTravel}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dungeon;
