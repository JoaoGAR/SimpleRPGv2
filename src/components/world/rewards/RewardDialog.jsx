import "./rewardsDialog.css"
import React, { useState, useEffect } from 'react';

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
        <>
            <div className="row" style={{ backgroundColor: 'red' }}>
                <p>{message}</p>
                <p>D20 {d20} <img className="d20" src='../world/d20w.svg' /></p>
                <p>D20 após cálculos: {calcd20} <img className="d20" src='../world/d20w.svg' /></p>
                <p>Soma total das suas habilidades: {totalSkillLevel}</p>
                <p>Penalidade de habilidades do trabalho: {skillPenalty}</p>
                <p>Nível de dificuldade do trabalho: {difficulty} <img className="d20" src='../world/d20w.svg' /></p>
                <p>Experiencia ganha: {experience}</p>
                <p>Moedas de ouro: {gold}</p>
            </div>
            <div className="row row-cols-3">
                {typeof rewards !== "undefined" && rewards.map((reward, index) => (
                    <div key={index} className="col reward-box m-3 p-0" style={{ borderColor: reward.tier.background }}>
                        <div className="col reward-header text-center text-uppercase mb-2" style={{ backgroundColor: reward.tier.background, color: reward.tier.color }}>
                            <h6 className="m-0"><img style={{ height: '20px' }} src={"../" + reward.icon} alt="Item icon" /> {reward.name}</h6>
                            <small>{reward.tier.name}</small>
                        </div>
                        <div className="col reward-body d-flex justify-content-center align-items-center">
                            <img src={"../" + reward.image} alt="Item image" />
                        </div>
                        <div className="col reward-footer" style={{ backgroundColor: reward.tier.background }}>
                            <div className="row row-cols-5 justify-content-center reward-skill">
                                {typeof reward.skills !== "undefined" && reward.skills.map((itemSkill) => (
                                    <div key={itemSkill.id} className="col skill-box" style={{ backgroundImage: `url(${itemSkill.skill.icon})` }}>
                                        <div className="row text-center">
                                            <span>{itemSkill.level}</span>
                                        </div>
                                    </div>
                                ))}
                                {typeof reward.abilities !== "undefined" && reward.abilities.map((itemAbilitie) => (
                                    <div key={itemAbilitie.id} className="col ability-box" style={{ backgroundImage: `url(${itemAbilitie.ability.icon})`, borderColor: itemAbilitie.ability.tier.color }}>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row row-cols-3 justify-content-center">
                <button className="btn btn-lg btn-success text-uppercase" onClick={() => { onClose() }}>confirmar</button>
            </div>
        </>
    );
}
export default RewardDialog;