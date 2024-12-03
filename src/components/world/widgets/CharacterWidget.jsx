import "./characterWidget.css"
import React from 'react';

const CharacterWidget = ({ character }) => {
    return (
        <div
            key={character.id}
            className="character-widget"
            style={{
                position: 'absolute',
                left: `${(character.coordsx - 5)}px`,
                top: `${(character.coordsy - 5)}px`,
            }}
        >
            <img className="img-fluid" src={"../" + character.race.icon} />
        </div>
    );
};

export default CharacterWidget;