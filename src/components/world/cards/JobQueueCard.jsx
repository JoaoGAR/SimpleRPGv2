import "./cardQueue.css"
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Axios from 'axios';
import { ToastContainer, toast, Flip } from 'react-toastify';

const JobQueueCard = ({ queue, listQueue, setListQueue, openRewardsDialog, setMousePosition, setCharacter }) => {

    const handleClickGetRewwards = async (queueId) => {
        try {
            const response = await Axios.post("http://localhost:3001/api/job/finish", {
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

                toast.success('Trabalho concluído, recompensas adicionadas ao seu inventário.', {
                    position: "top-right",
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Flip,
                });
            }

            if (status === 401) {
                toast.warning(`${message}`, {
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
        } catch (err) {
            console.error(err.message);
        }
    }

    const handleClickDismissJob = async (queueId) => {
        try {
            const response = await Axios.post("http://localhost:3001/api/job/dismiss", {
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

                toast.info('Trabalho removido da fila.', {
                    position: "bottom-center",
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Flip,
                });
            }

            if (status === 401) {
                toast.warning(`${message}`, {
                    position: "bottom-center",
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
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <div className="job-queue-card" style={{ backgroundImage: `url("${queue.job.icon}")` }}>
            <div className="job-queue-card-back" style={{ height: '100%' }}>
                <div className="job-queue-header text-center">
                    <h6 className="text-uppercase fw-bold">{queue.job.name}</h6>
                </div>
                <div className="row row-cols-2 job-queue-body mx-1">
                    <div className="col">
                        <p>{dayjs(queue.endAt).format('DD/MM/YYYY HH:mm:ss')}</p>
                    </div>
                </div>
                <div className="row job-queue-footer mx-1">
                    <div className="col text-center">
                        {queue.jobStatus === 2 ? (
                            <p>Concluído <i className="bi bi-coin"></i></p>
                        ) : queue.jobStatus === 1 ? (
                            <p>Em execução <i className="bi bi-arrow-clockwise"></i></p>
                        ) : (
                            <p>Agendado <i className="bi bi-calendar-check"></i></p>
                        )}
                    </div>
                    {queue.jobId !== 1 ? (
                        <div className="col d-flex justify-content-center">
                            <div className="btn-group">
                                <button type="button" className="btn btn-sm btn-success" disabled={!(queue.jobStatus == 2)} onClick={() => handleClickGetRewwards(queue.id)}>Recompensas</button>
                                <button type="button" className="btn btn-sm btn-danger" disabled={(queue.jobStatus == 2)} onClick={() => handleClickDismissJob(queue.id)}>Encerrar</button>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}
export default JobQueueCard;