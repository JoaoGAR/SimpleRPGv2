import './jobQueueInfo.css'
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Axios from 'axios';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { useItemInfo } from '/src/context/ItemInfoContext';

const JobQueueInfo = ({ queue, setListQueue, openRewardsDialog, setCharacter, setListJob, setActiveQueue }) => {

    const { openItemInfoDialog, closeItemInfoDialog } = useItemInfo();
    const job = queue.job;

    const handleClickGetRewwards = async (queueId) => {
        try {
            const response = await Axios.post('http://localhost:3001/api/job/finish', {
                queueId: queueId,
            });
            const { jobResult, status, message, travellingId, character } = response.data;

            if (status === 200) {
                setListQueue((prevListQueue) =>
                    prevListQueue.filter((value) => value.id !== queueId)
                );

                if (travellingId) {
                    setListQueue((prevListQueue) =>
                        prevListQueue.filter((value) => value.id !== travellingId)
                    );
                }

                openRewardsDialog(jobResult);
                setCharacter(character);
                setListJob(null);
                setActiveQueue(null);

                toast.success('Trabalho concluído, recompensas adicionadas ao seu inventário.', {
                    position: 'top-right',
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    transition: Flip,
                });
            }

            if (status === 401) {
                toast.warning(`${message}`, {
                    position: 'top-right',
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Flip,
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleClickDismissJob = async (queueId) => {
        try {
            const response = await Axios.post('http://localhost:3001/api/job/dismiss', {
                queueId: queueId,
            });
            const { status, message, travellingId } = response.data;

            if (status === 200) {
                setListQueue((prevListQueue) =>
                    prevListQueue.filter((value) => value.id !== queueId)
                );

                if (travellingId) {
                    setListQueue((prevListQueue) =>
                        prevListQueue.filter((value) => value.id !== travellingId)
                    );
                }

                setListJob(null);
                setActiveQueue(null);

                toast.info('Trabalho removido da fila.', {
                    position: 'bottom-center',
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    transition: Flip,
                });
            }

            if (status === 401) {
                toast.warning(`${message}`, {
                    position: 'bottom-center',
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                    transition: Flip,
                });
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div key={queue.id} className='row'>
            <div className='job-queue-info'>
                <div className='ribbon'><h2 className='text-uppercase'>{job.name}</h2></div>
                <div className='col-12 description'>
                    {job.description}
                </div>
                <div className='col-12 status'>
                    <span>Termina em: {dayjs(queue.endAt).format('DD/MM/YYYY HH:mm:ss')}</span>
                </div>
                <hr />
                <div className='row'>
                    {Array.isArray(job.rewards) && job.rewards.map((rewardItem) => {
                        const item = rewardItem.item;
                        const itemGradientStyle = {
                            '--item-gradient': `radial-gradient(circle, gray 5%, rgba(66, 66, 66, 0.01) 70%)`
                        };
                        const uniqueBaseItem = item.image.split('.');
                        const baseImage = uniqueBaseItem[(uniqueBaseItem.length - 1)] === 'png' ? `${item.image}` : `${item.image}t0.png`;
                        return (
                            <div
                                key={rewardItem.id}
                                className='col-1 queue-reward-box'
                                style={{ cursor: 'pointer', borderColor: 'gray' }}
                                onMouseEnter={openItemInfoDialog ? () => openItemInfoDialog(item, null) : null}
                                onMouseLeave={closeItemInfoDialog ? () => closeItemInfoDialog() : null}
                            >
                                <img
                                    className='img-fluid'
                                    src={`/${baseImage}`}
                                    alt='Reward Item image'
                                    style={itemGradientStyle}
                                />
                            </div>
                        )
                    })}
                </div>
                <hr />
                <div className='row'>
                    {queue.relatedJobId === null ? (
                        <div className='col-12 d-flex justify-content-center'>
                            <div className='btn-group'>
                                <button type='button' className='btn btn-lg btn-success' disabled={!(queue.jobStatus === 2) || queue.jobId === 1} onClick={() => handleClickGetRewwards(queue.id)}>Recompensas</button>
                                <button type='button' className='btn btn-lg btn-danger' disabled={(queue.jobStatus === 2)} onClick={() => handleClickDismissJob(queue.id)}>Encerrar</button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
export default JobQueueInfo;