import './city.css';
import React, { useContext, useState, useEffect } from 'react';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import { useBattleRolls } from '../../context/BattleContext';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

import CityShortcuts from './CityShortcuts';
import AlleyDialog from './dialogs/alley/AlleyDialog';
import ArenaDialog from './dialogs/arena/ArenaDialog';
import MarketDialog from './dialogs/market/MarketDialog';

const City = () => {

    const { auth } = useContext(AuthContext);
    const { openBattleRolls } = useBattleRolls();

    const { cityName, cityId } = useParams();
    const [structure, setStructure] = useState({});
    const [character, setCharacter] = useState(auth.user.character);
    const distance = Math.sqrt((structure.coordsx - character.coordsx) ** 2 + (structure.coordsy - character.coordsy) ** 2);

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
    const [isMarketDialog, setIsMarketDialog] = useState(false);

    const closeAllDialogs = () => {
        setIsAlleyDialog(false);
        setIsArenaDialog(false);
        setIsMarketDialog(false);
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
                        handleClickMenu={handleClickMenu}
                        dialogs={{ setIsAlleyDialog, setIsArenaDialog, setIsMarketDialog }}
                        handleTravel={handleTravel}
                    />
                </div>
            </div>
            <div className="col-7" style={{ position: 'relative' }}>
                <div className={`row dialog ${isArenaDialog ? 'is-open' : ''}`}>
                    <ArenaDialog
                        cityId={cityId}
                    />
                </div>
                <div className={`row dialog ${isAlleyDialog ? 'is-open' : ''}`}>
                    <AlleyDialog
                        cityId={cityId}
                        openBattleRolls={openBattleRolls}
                    />
                </div>
                <div className={`row dialog ${isMarketDialog ? 'is-open' : ''}`}>
                    <MarketDialog
                        cityId={cityId}
                        character={character}
                        setCharacter={setCharacter}
                    />
                </div>
            </div>
            <div className='col-1'>
                <p>lateral</p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default City;
