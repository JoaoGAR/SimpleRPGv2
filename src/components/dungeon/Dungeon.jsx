import './dungeon.css';
import React, { useContext, useState, useEffect } from 'react';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { useBattleRolls } from '../../context/BattleContext';
import { useItemInfo } from '/src/context/ItemInfoContext';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

import Shortcutsbar from '../shortcutsBar/Shortcutsbar';

import SwampShortcuts from './shortcuts/SwampShortcuts';
import ForestShortcuts from './shortcuts/ForestShortcuts';

import ForestDialog from './dialogs/forest/ForestDialog';
import BeastsDialog from './dialogs/beasts/BeastsDialog';

const Dungeon = () => {

    const { auth } = useContext(AuthContext);
    const { openBattleRolls } = useBattleRolls();
    const { handleMouseMove } = useItemInfo();

    const { cityName, cityId } = useParams();
    const [structure, setStructure] = useState({});
    const [character, setCharacter] = useState(auth.user.character);
    const distance = Math.sqrt((structure.coordsx - character.coordsx) ** 2 + (structure.coordsy - character.coordsy) ** 2);

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

    const [isForestDialog, setIsForestDialog] = useState(false);
    const [IsBeastsDialog, setIsBeastsDialog] = useState(false);

    const closeAllDialogs = () => {
        setIsAlleyDialog(false);
        setIsArenaDialog(false);
        setIsForestDialog(false);
        setIsBeastsDialog(false);
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
        <div className='row row-cols-3 dungeon-background' style={{ backgroundImage: `url(../../${structure.image})` }} onMouseMove={handleMouseMove}>
            <div className='col-3'>
                <div className='row text-uppercase'>
                    <ul className='text-center mt-2'>
                        <li style={{ '--accent-color': structure.color }}>
                            <div className='icon'><img className='dungeon-icon' src={`../../${structure.icon}`} alt='Structure heraldry' /></div>
                            <div className='title'>{structure.name}</div>
                        </li>
                    </ul>
                </div>

                <div style={{ marginTop: '20px' }}>
                    {(structure.type === 2) && (
                        <SwampShortcuts
                            character={character}
                            setCharacter={setCharacter}
                            handleClickMenu={handleClickMenu}
                            dialogs={{ setIsAlleyDialog, setIsArenaDialog }}
                            handleTravel={handleTravel}
                        />
                    )}

                    {(structure.type === 3) && (
                        <ForestShortcuts
                            character={character}
                            setCharacter={setCharacter}
                            handleClickMenu={handleClickMenu}
                            dialogs={{ setIsForestDialog, setIsBeastsDialog }}
                            handleTravel={handleTravel}
                        />
                    )}
                </div>
            </div>

            <div className="col-7" style={{ position: 'relative' }}>
                <div className={`row dialog ${isForestDialog ? 'is-open' : ''}`}>
                    <ForestDialog
                        cityId={cityId}
                    />
                </div>
                <div className={`row dialog ${IsBeastsDialog ? 'is-open' : ''}`}>
                    <BeastsDialog
                        cityId={cityId}
                        openBattleRolls={openBattleRolls}
                        character={character}
                        setCharacter={setCharacter}
                    />
                </div>
            </div>
            <div className='col-2'>
            </div>

            <Shortcutsbar
                character={character}
                setCharacter={setCharacter}
            />
            <ToastContainer />
        </div>
    );
};

export default Dungeon;
