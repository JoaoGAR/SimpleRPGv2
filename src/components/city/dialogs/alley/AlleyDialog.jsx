import './alley.css';
import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import NPCList from '../../../battle/npclist/NPCList';

import { getWeapon } from '../../../../utils/inventory';

const AlleyDialog = ({ cityId, openBattleRolls, character }) => {

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
                    <img src="../../world/icons/alley.png" alt="Skill book icon" style={{ width: '40px' }} />
                </div>
                <div className='col-6 text-center'>
                    <h4>BECOS</h4>
                </div>
            </div>
            <div className='row body'>
                <div className='col-12 lore'>
                    <p>
                        Os becos da cidade são um lugar de segredos e sombras, onde o eco da moralidade raramente encontra espaço para existir. Ao cair da noite, os becos tornam-se um reduto para aqueles que vivem à margem da sociedade, seja por escolha, necessidade ou exílio. É aqui que os desajustados da cidade se reúnem, buscando oportunidades rápidas, confrontos diretos ou uma simples escapatória da monotonia das regras.
                    </p>
                    <p>
                        Nesses labirintos escuros, a força e a astúcia ditam as regras. Para os aventureiros ousados, os becos oferecem a chance de provar seu valor em duelos contra os mais variados tipos de personagens.
                    </p>
                    <hr />
                </div>

                <div className='col-12 npcs'>
                    <div className='row'>
                        <div className='col-12 text-center'>
                            DESAFIAR
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

export default AlleyDialog;
