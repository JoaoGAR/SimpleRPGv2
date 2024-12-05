import '../world.css';
import React, { useState } from 'react';

const CharacterInfo = ({ character, openCharacterSheetDialog }) => {

    const classImage = character.class.image;
    const wellness = character.wellness;
    const wellnessPercentage = (wellness / 100) * 100;
    const classColor1 = character.class.color1;
    const classColor2 = character.class.color2;
    let requiredXP = Math.floor(15 * Math.pow((character.level + 1), 2));
    let actualLevelXP = Math.floor(15 * Math.pow((character.level), 2));
    let levelXP = requiredXP - actualLevelXP;
    let currentXP = character.experience - actualLevelXP;
    let requiredXPPercentage = (currentXP / levelXP) * 100;

    return (
        <div className="row row-cols-1 character-info" style={{ cursor: 'pointer' }} onClick={() => openCharacterSheetDialog()}>
            <div className="col character-name text-center">
                <span>{character.name}</span>
            </div>
            <div className="col class-image d-flex" style={{ backgroundImage: `url(${classImage})` }}>
                <div className="col align-self-end text-center armor-class">
                    <h4>{character.armorClass}</h4>
                </div>
                <div className="col align-self-end">
                    <span className="character-class-name" style={{ backgroundColor: classColor1 }}>{character.class.name}</span>
                    <span className="character-level" style={{ backgroundColor: classColor2 }}>{character.level}</span>
                </div>
            </div>
            <div className="col character-status">
                <div className="progress" role="progressbar">
                    <div className="progress-bar bg-info" style={{ width: `${wellnessPercentage}%` }}>{wellness}/100</div>
                </div>
                <div className="progress my-1" role="progressbar">
                    <div className="progress-bar bg-warning" style={{ width: `${requiredXPPercentage}%` }}>{currentXP}/{levelXP}</div>
                </div>
            </div>
        </div>
    );
};

export default CharacterInfo;
