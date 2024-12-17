import './world.css';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '/src/context/AuthContext';
import { useItemInfo } from '/src/context/ItemInfoContext';
import { ToastContainer, toast, Flip } from 'react-toastify';
import Axios from 'axios';

import Map from './map/Map';
import Shortcutsbar from '../shortcutsBar/Shortcutsbar';
import CharacterInfo from './characterInfo/CharacterInfo';
import CharacterSheetDialog from './characterSheet/CharacterSheetDialog';

const Index = () => {

    const { auth } = useContext(AuthContext);
    const { handleMouseMove } = useItemInfo();

    const [isCharacterSheetDialog, setCharacterSheetDialog] = useState(false);
    const [inspecCharacterId, setInspecCharacterId] = useState(null);
    const [listJobs, setListJobs] = useState();
    const [listStructures, setListStructures] = useState();
    const [character, setCharacter] = useState(auth.user.character);
    const mapaUrl = './world/Ticalor.webp';

    const openCharacterSheetDialog = (characterId) => {
        setInspecCharacterId(characterId);
        setCharacterSheetDialog(true);
    };
    const closeCharacterSheetDialog = () => {
        setCharacterSheetDialog(false);
        setInspecCharacterId(null);
    };

    useEffect(() => {
        Axios.get('http://localhost:3001/api/job/get').then((response) => {
            setListJobs(response.data);
        });
        Axios.get('http://localhost:3001/api/structure/get').then((response) => {
            setListStructures(response.data);
        });
        setCharacter(auth.user.character);
    }, [character]);

    return (
        <div className='game-container' onMouseMove={handleMouseMove}>
            <Map
                mapUrl={mapaUrl}
                jobs={listJobs}
                structures={listStructures}
                character={character}
                setCharacter={setCharacter}
            />

            <CharacterInfo character={character} openCharacterSheetDialog={openCharacterSheetDialog} />
            <Shortcutsbar
                character={character}
                setCharacter={setCharacter}
            />

            <div className={`dialog ${isCharacterSheetDialog ? 'is-open' : ''}`}>
                <CharacterSheetDialog
                    characterId={character.id}
                    isOpen={isCharacterSheetDialog}
                    onClose={closeCharacterSheetDialog}
                    setCharacter={setCharacter}
                />
            </div>

            <ToastContainer />
        </div>
    );
};

export default Index;