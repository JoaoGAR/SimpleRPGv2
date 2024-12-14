import './cardQueue.css'
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const JobQueueList = ({ queue, setListJob, isActive, setActiveQueue }) => {

    const job = queue.job;

    return (
        <div
            className={`row row-cols-2 align-items-center job-list-item ${isActive ? 'active' : ''}`}
            onMouseEnter={() => {
                setActiveQueue();
                setListJob();
            }}
        >
            <div className='col-9'>
                <div className='row'>
                    <span>Dificuldade: {job.difficulty} </span>
                    <span className='text-uppercase' style={{ fontSize: '16px', fontWeight: 'bold' }}>{job.name}</span>
                    {queue.jobStatus === 2 ? (
                        <span>{dayjs(queue.endAt).format('DD/MM/YYYY HH:mm:ss')} | Concluído <i className='bi bi-coin'></i></span>
                    ) : queue.jobStatus === 1 ? (
                        <span>{dayjs(queue.endAt).format('DD/MM/YYYY HH:mm:ss')} | Em execução <i className='bi bi-arrow-clockwise'></i></span>
                    ) : (
                        <span>{dayjs(queue.endAt).format('DD/MM/YYYY HH:mm:ss')} | Agendado <i className='bi bi-calendar-check'></i></span>
                    )}
                </div>
            </div>
            <div className='col-3'>
                <div className='row justify-content-center'>
                    <div className='col-8'>
                        <img className='job-list-icon' src={`${job.icon}`} alt='Job icon' />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default JobQueueList;