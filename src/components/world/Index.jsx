import "./world.css";
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Flip } from 'react-toastify';
import Axios from 'axios';

import Map from "./widgets/Map";
import Shortcutsbar from "./widgets/Shortcutsbar";
import CharacterInfo from "./widgets/CharacterInfo";
import CharacterSheetDialog from "./dialogs/CharacterSheetDialog";

const Index = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [isCharacterSheetDialog, setCharacterSheetDialog] = useState(false);
    const [listJobs, setListJobs] = useState();
    const [listStructures, setListStructures] = useState();
    const [character, setCharacter] = useState(auth.user.character);
    const mapaUrl = './world/Ticalor.webp';

    const openCharacterSheetDialog = () => setCharacterSheetDialog(true);
    const closeCharacterSheetDialog = () => setCharacterSheetDialog(false);

    useEffect(() => {
        Axios.get("http://localhost:3001/api/job/get").then((response) => {
            setListJobs(response.data);
        });
        Axios.get("http://localhost:3001/api/structure/get").then((response) => {
            setListStructures(response.data);
        });
    }, [character]);

    return (
        <div className="game-container">
            <Map mapUrl={mapaUrl} jobs={listJobs} structures={listStructures} character={character} setCharacter={setCharacter} />
            <CharacterInfo character={character} openCharacterSheetDialog={openCharacterSheetDialog}/>
            <Shortcutsbar character={character} setCharacter={setCharacter} />

            <div className={`dialog character-sheet-dialog ${isCharacterSheetDialog ? 'is-open' : ''}`}
                style={{
                    left: "50%",
                    top: "50%",
                }}>
                <CharacterSheetDialog characterId={character.id} isOpen={isCharacterSheetDialog} onClose={closeCharacterSheetDialog} setCharacter={setCharacter} />
            </div>

            <ToastContainer/>
        </div>
    );
};

export default Index;