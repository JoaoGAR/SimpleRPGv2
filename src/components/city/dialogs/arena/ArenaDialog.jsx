import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';

const ArenaDialog = () => {

    return (
        <div className='alley-dialog'>
            <div className='row header'>
                <div className='col-3'>
                    <img src="../../world/icons/workQueue.png" alt="Skill book icon" style={{ width: '40px' }} />
                </div>
                <div className='col-6 text-center'>
                    <h4>ARENA</h4>
                </div>
            </div>
            <div className='row body'>
                <div className='col-12'>
                    <p className='lore'>
                        Erguendo-se como o coração pulsante do entretenimento e da glória, a Arena é o palco onde lendas nascem e a coragem é testada até seus limites. Construída nos tempos antigos, ela foi idealizada não apenas como um lugar de combate, mas como um símbolo de poder, onde os mais fortes ganham fama, riquezas e o respeito eterno dos habitantes da cidade.
                    </p>
                </div>
            </div>
            <div className='row footer'>

            </div>
        </div>
    );
};

export default ArenaDialog;
