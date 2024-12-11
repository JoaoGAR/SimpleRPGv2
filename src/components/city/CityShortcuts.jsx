import "./cityShortcuts.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CityShortcuts = ({ character, setCharacter, setIsAlleyDialog, setIsArenaDialog, closeAllDialogs }) => {

    const navigate = useNavigate();
    const backToWorld = () => { navigate('/world'); };

    return (
        <div key="row city-shortcuts">
            <div className="col-10 city-shortcut" onClick={() => { closeAllDialogs(); setIsAlleyDialog(true) }}>
                <h5>Becos <img src="../../world/icons/alley.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 city-shortcut" onClick={() => { closeAllDialogs(); setIsArenaDialog(true) }}>
                <h5>Arena <img src="../../world/icons/arena.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 city-shortcut">
                <h5>Taberna <img src="../../world/icons/tavern.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 city-shortcut">
                <h5>Forja <img src="../../world/icons/smith.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 city-shortcut">
                <h5>Mercado <img src="../../world/icons/merchant.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-10 city-shortcut" onClick={backToWorld}>
                <h5>Voltar <img src="../../world/icons/back.png" alt="Inventory icon" style={{ width: '50px' }} /></h5>
            </div>
        </div>
    );
};

export default CityShortcuts;