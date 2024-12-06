import "./cityShortcuts.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CityShortcuts = ({ character, setCharacter, setSelectedItem, openItemInfoDialog, closeItemInfoDialog }) => {

    const navigate = useNavigate();
    const backToWorld = () => { navigate('/world');  };

    return (
        <div key="row city-shortcuts">
            <div className="col-6 city-shortcut">
                <h5>Arena <img src="../../world/icons/workQueue.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-6 city-shortcut">
                <h5>Taberna <img src="../../world/icons/workQueue.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-6 city-shortcut">
                <h5>Forja <img src="../../world/icons/workQueue.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-6 city-shortcut">
                <h5>Mercado <img src="../../world/icons/workQueue.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-6 city-shortcut">
                <h5>Becos <img src="../../world/icons/workQueue.png" alt="Skill book icon" style={{ width: '50px' }} /></h5>
            </div>
            <div className="col-6 city-shortcut" onClick={backToWorld}>
                <h5>Voltar <img src="../../world/icons/backpack.png" alt="Inventory icon" style={{ width: '50px' }} /></h5>
            </div>
        </div>
    );
};

export default CityShortcuts;