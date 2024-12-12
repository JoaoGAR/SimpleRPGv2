import "./jobInfoDialog.css"
import React, { useState } from 'react';
import Axios from 'axios';
import { ToastContainer, toast, Flip } from 'react-toastify';

const JobsInfoDialog = ({ job, isOpen, onClose, openItemInfoDialog, closeItemInfoDialog }) => {

    if (!isOpen) return null;

    const requirements = job.requirements;
    const difficulty = requirements.reduce((total, requirement) => total + requirement.skillLevel, 0);
    let jobColor = { '--jobColor': `${job.attribute.color}` };

    const handleClickButton = async (duration) => {
        try {
            const response = await Axios.post("http://localhost:3001/api/job/startWork", {
                duration: duration,
                jobId: job.id,
                jobStatus: 0,
                coordsx: job.coordsx,
                coordsy: job.coordsy,
            });

            if (response.data.status != 200) {
                toast.warning(`${response.data.msg}`, {
                    position: "top-right",
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Flip,
                });
                return null;
            }
            toast.success(`${job.name} adicionado à fila`, {
                position: "top-right",
                autoClose: 600,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
        } catch (err) {
            toast.error(`Falha ao adicionar ${job.name} à fila`, {
                position: "top-right",
                autoClose: 600,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Flip,
            });
        }
    }

    return (
        <>
            <div className="row row-cols-3 dialog-header align-items-center">
                <div className="col-2 job-info-image" style={{ ...jobColor, backgroundImage: `url(${job.icon})` }}></div>
                <div className="col-9 job-info-title text-center text-uppercase fw-bold">
                    <div>{job.name}</div>
                </div>
                <div className="col-1 justify-content-end">
                    <button className="btn btn-sm btn-danger" onClick={onClose}><i className="bi bi-x"></i></button>
                </div>
            </div>
            <div className="row row-cols-1 dialog-body">
                <div className="col-12">
                    <p>{job.description}</p>
                    <p className="badge bg-danger">Dificuldade: {difficulty} <img className="d20" src='../world/d20w.svg' /></p>
                </div>
                <hr style={{ marginBottom: 0 }} />
                <div className="row row-cols-4 job-info-requirements my-2">
                    {typeof job.requirements !== "undefined" && job.requirements.map((requirement) => (
                        <div key={requirement.id} className="col-2">
                            <div className="skill-img" style={{ backgroundImage: `url("${requirement.skill.icon}")` }}>
                                <p className="skill-requirement-level fw-bold">{requirement.skillLevel}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="row">
                    <div className="col mb-2">
                        <span className="badge bg-info">{job.experience} EXP</span>
                        <span className="badge bg-warning"><img src="icons/items/coin.svg" alt="Gold amount" /> {job.gold}</span>
                    </div>
                </div>
                <div className="row row-cols-6 job-info-rewards">
                    {typeof job.rewards !== "undefined" && job.rewards.map((rewardItem) => {
                        const item = rewardItem.item;
                        const itemGradientStyle = {
                            '--item-gradient': `radial-gradient(circle, gray 5%, rgba(66, 66, 66, 0.01) 70%)`
                        };
                        return (
                            <div
                                key={rewardItem.id}
                                className="col reward-box"
                                style={{ cursor: 'pointer', borderColor: 'gray' }}
                                onMouseEnter={() => openItemInfoDialog(item)}
                                onMouseLeave={() => closeItemInfoDialog()}
                            >
                                <img
                                    className="img-fluid"
                                    src={`../${item.image}`}
                                    alt="Reward Item image"
                                    style={itemGradientStyle}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="row row-cols-1 dialog-footer">
                <div className="btn-group">
                    <button type="button" className="btn btn-success btn-block border border-dark-subtle" onClick={() => handleClickButton(0)}>30 minutos</button>
                    <button type="button" className="btn btn-success btn-block border border-dark-subtle" onClick={() => handleClickButton(1)}>1 Hora</button>
                    <button type="button" className="btn btn-success btn-block border border-dark-subtle" onClick={() => handleClickButton(2)}>2 Horas</button>
                </div>
            </div>
        </>
    );
};

export default JobsInfoDialog;
