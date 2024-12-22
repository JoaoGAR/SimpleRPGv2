import './rewardsDialog.css'
import React, { useState, useEffect } from 'react';

import BattleReward from '../../battle/battleRolls/rewards/BattleReward';

const RewardDialog = ({ claimedRewards, isOpen, onClose }) => {

    if (!isOpen) return null;

    const rewards = claimedRewards.rewards;
    const message = claimedRewards.message;
    const experience = claimedRewards.experience;
    const gold = claimedRewards.gold;
    const d20 = claimedRewards.d20;
    const calcd20 = claimedRewards.calcd20;
    const totalSkillLevel = claimedRewards.totalSkillLevel;
    const skillPenalty = claimedRewards.skillPenalty;
    const difficulty = claimedRewards.difficulty;
    const rewardQtd = claimedRewards.rewardQtd;

    return (
        <div className='row row-cols-2 justify-content-center'>
            <div className='col-10'>
                <div className='row'>
                    <div className='col-12 text-center job-result'>
                        <div className='ribbon'>Relatório de Trabalho Concluído</div>
                        <p>{message}</p>
                        <p>Resultado do D20: {d20} <img className='d20' src='/world/d20w.svg' /></p>
                        <p>Soma Total das Suas Habilidades: {totalSkillLevel}</p>
                        <p>Penalidade de Habilidades do Trabalho: {skillPenalty}</p>
                        <p>Nível de Dificuldade do Trabalho: {difficulty} <img className='d20' src='/world/d20w.svg' /></p>
                        <p>D20 Após Cálculos: {calcd20} <img className='d20' src='/world/d20w.svg' /></p>
                        <p>Experiência Ganha: {experience} pontos</p>
                        <p>Moedas de Ouro: {gold}</p>
                    </div>
                </div>
                <div className='row row-cols-3 justify-content-center'>
                    {Array.isArray(rewards) && rewards.map((reward, index) => (
                        <BattleReward key={index} reward={reward} />
                    ))}
                </div>
                <div className='row row-cols-3 justify-content-center'>
                    <button className='btn btn-lg btn-success text-uppercase' onClick={() => { onClose() }}>confirmar</button>
                </div>
            </div>
        </div>
    );
}
export default RewardDialog;