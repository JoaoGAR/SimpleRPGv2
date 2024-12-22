import "./dungeonShortcuts.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DungeonShortcuts = ({ character, setCharacter, handleClickMenu, dialogs, handleTravel }) => {

    const navigate = useNavigate();
    const backToWorld = () => { navigate('/world'); };

    return (
        <div key="row dungeon-shortcuts">
            <div className="col-10 dungeon-shortcut" onClick={() => { handleClickMenu(dialogs.setIsForestDialog) }}>
                <h5>Explorar mata <img src="../../world/icons/ancientTower.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 dungeon-shortcut" onClick={() => { handleClickMenu(dialogs.setIsBeastsDialog) }}>
                <h5>Caças bestas <img src="../../world/icons/beasts.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 city-shortcut" onClick={() => handleTravel()}>
                <h5>Visitar <img src="../../world/icons/travel.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 dungeon-shortcut" onClick={backToWorld}>
                <h5>Voltar <img src="../../world/icons/back.png" alt="Inventory icon" style={{ width: '50px' }} /></h5>
            </div>
        </div>
    );
};

export default DungeonShortcuts;