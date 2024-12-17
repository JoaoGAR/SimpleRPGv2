import "./cityShortcuts.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const CityShortcuts = ({ character, setCharacter, handleClickMenu, dialogs, handleTravel }) => {

    const navigate = useNavigate();
    const backToWorld = () => { navigate('/world'); };

    return (
        <div key="row city-shortcuts">
            <div className="col-10 city-shortcut" onClick={() => { handleClickMenu(dialogs.setIsArenaDialog) }}>
                <h5>Arena <img src="../../world/icons/arena.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 city-shortcut" onClick={() => { handleClickMenu(dialogs.setIsMarketDialog) }}>
                <h5>Mercado <img src="../../world/icons/merchant.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 city-shortcut">
                <h5>Forja <img src="../../world/icons/smith.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 city-shortcut">
                <h5>Taberna <img src="../../world/icons/tavern.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 city-shortcut" onClick={() => { handleClickMenu(dialogs.setIsAlleyDialog) }}>
                <h5>Becos <img src="../../world/icons/alley.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 city-shortcut" onClick={() => handleTravel()}>
                <h5>Visitar <img src="../../world/icons/travel.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 city-shortcut" onClick={backToWorld}>
                <h5>Voltar <img src="../../world/icons/back.png" alt="Inventory icon" style={{ width: '50px' }} /></h5>
            </div>
        </div>
    );
};

export default CityShortcuts;