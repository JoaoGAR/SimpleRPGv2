import './beasts.css';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { toast, Flip } from 'react-toastify';
import NPCList from '../../../battle/npclist/NPCList';

import { getWeapon } from '../../../../utils/inventory';

const BeastsDialog = ({ cityId, openBattleRolls, character }) => {

    const [listNPCs, setListNPCs] = useState([]);

    async function getNPCs() {
        const structureId = cityId;
        const locationId = 1;
        const response = await Axios.post("http://localhost:3001/api/structure/getNPCsByLocation", {
            structureId,
            locationId,
        });
        if (response.data) {
            const data = response.data;
            setListNPCs(data);
        }
    }

    const challengeNPC = async (target) => {

        const characterWeapon = getWeapon(character.inventory);
        if (!characterWeapon || character.wellness <= 0) {
            toast.warning(`Para batalhar é preciso ter pontos de saúde e uma arma equipada.`, {
                position: 'top-right',
                autoClose: 800,
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

        const targetId = target.id;
        const response = await Axios.post('http://localhost:3001/api/battle/attack', {
            targetId,
        });

        if (response.status != 200) {
            console.log("ERRO no servidor");
        }

        const data = response.data;
        openBattleRolls(data, character);
    }

    useEffect(() => {
        getNPCs();
    }, []);

    return (
        <div className='alley-dialog'>
            <div className='row header'>
                <div className='col-3'>
                    <img src="../../world/icons/beasts.png" alt="Skill book icon" style={{ width: '40px' }} />
                </div>
                <div className='col-6 text-center'>
                    <h4>BESTAS</h4>
                </div>
            </div>
            <div className='row body'>
                <div className='col-12 lore'>
                    <p>Os lobos caçam em matilhas, espreitando silenciosamente antes de atacar com coordenação letal. As aranhas gigantes aguardam pacientemente em seus ninhos, com teias tão fortes quanto cordas de aço, enquanto os Kobolds, engenhosos e perigosos, defendem suas terras com armadilhas e emboscadas.</p>
                    <hr />
                </div>

                <div className='col-12 npcs'>
                    <div className='row'>
                        <div className='col-12 text-center'>
                            CAÇAR
                        </div>
                    </div>
                    <NPCList listNPCs={listNPCs} challengeNPC={challengeNPC} />
                </div>
            </div>
            <div className='row footer'>

            </div>
        </div>
    );
};

export default BeastsDialog;
