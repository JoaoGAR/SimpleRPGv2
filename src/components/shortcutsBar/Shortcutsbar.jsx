import './shortcutsbar.css';
import React, { useState } from 'react';
import QueueDialog from '../world/queue/QueueDialog';
import InventoryDialog from '../world/inventory/InventoryDialog';
import SkillbookDialog from '../world/skillbook/SkillbookDialog';

const Shortcutsbar = ({ character, setCharacter }) => {

    const [isQueueDialog, setIsQueueDialog] = useState(false);
    const [isInventoryDialog, setIsInventoryDialog] = useState(false);
    const [isSkillBookDialog, setIsSkillBookDialog] = useState(false);

    const openQueueDialog = () => { closeAllDialogs(); setIsQueueDialog(true) };
    const openInventoryDialog = () => { closeAllDialogs(); setIsInventoryDialog(true) };
    const openSkillBookDialog = () => { closeAllDialogs(); setIsSkillBookDialog(true) };

    const closeQueueDialog = () => setIsQueueDialog(false);
    const closeInventoryDialog = () => setIsInventoryDialog(false);
    const closeSkillBookDialog = () => setIsSkillBookDialog(false);

    const closeAllDialogs = () => {
        setIsQueueDialog(false);
        setIsInventoryDialog(false);
        setIsSkillBookDialog(false);
    };

    return (
        <>
            <div key="shortcut" className="shortcut-bar-modern d-flex justify-content-start align-items-center px-3">
                <div className="shortcut-item-modern" onClick={openQueueDialog}>
                    <img src="/world/icons/workQueue2.png" alt="Skill book icon" />
                </div>
                <div className="shortcut-item-modern" onClick={openSkillBookDialog}>
                    <img src="/world/icons/skillbook.png" alt="Skill book icon" />
                    {character.skillPoints > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">!</span>
                    )}
                </div>
                <div className="shortcut-item-modern" onClick={openInventoryDialog}>
                    <img src="/world/icons/backpack.png" alt="Skill book icon" />
                </div>
            </div>
            <div className={`dialog ${isQueueDialog ? 'is-open' : ''}`}>
                <QueueDialog
                    character={character}
                    isOpen={isQueueDialog}
                    onClose={closeQueueDialog}
                    setCharacter={setCharacter}
                />
            </div>

            <div className={`dialog ${isInventoryDialog ? 'is-open' : ''}`}>
                <InventoryDialog
                    character={character}
                    isOpen={isInventoryDialog}
                    onClose={closeInventoryDialog}
                    setCharacter={setCharacter}
                />
            </div>

            <div className={`dialog ${isSkillBookDialog ? 'is-open' : ''}`}>
                <SkillbookDialog
                    character={character}
                    isOpen={isSkillBookDialog}
                    onClose={closeSkillBookDialog}
                    setCharacter={setCharacter}
                />
            </div>
        </>
    );
};

export default Shortcutsbar;
