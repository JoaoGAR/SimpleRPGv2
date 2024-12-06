import "./world.css";
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Flip } from 'react-toastify';
import Axios from 'axios';

import Map from "./map/Map";
import Shortcutsbar from "./shortcutsBar/Shortcutsbar";
import CharacterInfo from "./characterInfo/CharacterInfo";
import CharacterSheetDialog from "./characterSheet/CharacterSheetDialog";

import ItemInfoDialog from '../world/item/ItemInfoDialog';

const Index = () => {

    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [selectedItem, setSelectedItem] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const [isCharacterSheetDialog, setCharacterSheetDialog] = useState(false);
    const [listJobs, setListJobs] = useState();
    const [listStructures, setListStructures] = useState();
    const [character, setCharacter] = useState(auth.user.character);
    const mapaUrl = './world/Ticalor.webp';

    const openCharacterSheetDialog = () => setCharacterSheetDialog(true);
    const closeCharacterSheetDialog = () => setCharacterSheetDialog(false);

    const handleMouseMove = (event) => {
        setMousePosition({
            x: event.clientX,
            y: event.clientY
        });
    };

    const openItemInfoDialog = (item, equiped) => {
        setSelectedItem({ ...item, equiped: equiped });
    };
    const closeItemInfoDialog = () => setSelectedItem(null);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/job/get").then((response) => {
            setListJobs(response.data);
        });
        Axios.get("http://localhost:3001/api/structure/get").then((response) => {
            setListStructures(response.data);
        });
    }, [character]);

    return (
        <div className="game-container" onMouseMove={handleMouseMove}>
            <Map
                mapUrl={mapaUrl}
                jobs={listJobs}
                structures={listStructures}
                character={character}
                setCharacter={setCharacter}
                openItemInfoDialog={openItemInfoDialog}
                closeItemInfoDialog={closeItemInfoDialog}
            />

            <CharacterInfo character={character} openCharacterSheetDialog={openCharacterSheetDialog} />
            <Shortcutsbar
                character={character}
                setCharacter={setCharacter}
                setSelectedItem={setSelectedItem}
                openItemInfoDialog={openItemInfoDialog}
                closeItemInfoDialog={closeItemInfoDialog}
            />

            <div className={`dialog character-sheet-dialog ${isCharacterSheetDialog ? 'is-open' : ''}`}
                style={{
                    left: "50%",
                    top: "50%",
                }}>
                <CharacterSheetDialog characterId={character.id} isOpen={isCharacterSheetDialog} onClose={closeCharacterSheetDialog} setCharacter={setCharacter} openItemInfoDialog={openItemInfoDialog} closeItemInfoDialog={closeItemInfoDialog} />
            </div>

            <ToastContainer />
            {selectedItem && (
                <ItemInfoDialog
                    item={selectedItem}
                    mousePosition={mousePosition}
                    isOpen={!!selectedItem}
                    onClose={closeItemInfoDialog}
                    equiped={selectedItem.equiped}
                    diffx={-10}
                    diffy={-10}
                />
            )}
        </div>
    );
};

export default Index;