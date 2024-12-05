import React, { useState, useRef, useEffect, useContext } from 'react';
import JobsWidget from '../widgets/JobsWidget';
import CharacterWidget from '../widgets/CharacterWidget';
import StructuresWidget from '../widgets/StructuresWidget';

const Map = ({ mapUrl, jobs, structures, character, setCharacter }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const [viewportSize, setViewportSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const lastMousePos = useRef({ x: 0, y: 0 });

    const mapWidth = 2048;
    const mapHeight = 1536;

    const handleMouseDown = (e) => {
        setDragging(true);
        lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    const dragLimit = (newPosition) => {
        const limiteX = Math.max(0, Math.min(mapWidth - viewportSize.width, newPosition.x));
        const limiteY = Math.max(0, Math.min(mapHeight - viewportSize.height, newPosition.y));
        return { x: limiteX, y: limiteY };
    };

    const handleMouseMove = (e) => {
        if (dragging) {
            const dx = e.clientX - lastMousePos.current.x;
            const dy = e.clientY - lastMousePos.current.y;

            let newPosition = {
                x: position.x - dx,
                y: position.y - dy,
            };

            newPosition = dragLimit(newPosition);
            setPosition(newPosition);
            lastMousePos.current = { x: e.clientX, y: e.clientY };
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const updateViewportSize = () => {
        setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };

    useEffect(() => {
        window.addEventListener('resize', updateViewportSize);
        return () => window.removeEventListener('resize', updateViewportSize);
    }, []);

    return (
        <div
            className="map-container"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div
                className="map"
                style={{
                    backgroundImage: `url(${mapUrl})`,
                    width: `${mapWidth}px`,
                    height: `${mapHeight}px`,
                    transform: `translate(${-position.x}px, ${-position.y}px)`,
                    position: 'relative',
                    cursor: dragging ? 'grabbing' : 'grab',
                }}
            >
                <div className="map-frame"
                    style={{
                        width: `${viewportSize.width}px`,
                        height: `${viewportSize.height}px`,
                    }}>
                </div>

                {typeof structures !== "undefined" && structures.map((structure) => (
                    <StructuresWidget key={structure.id} structure={structure} />
                ))}
                {typeof jobs !== "undefined" && jobs.map((job) => (
                    <JobsWidget key={job.id} job={job} character={character} />
                ))}
                <CharacterWidget character={character} />
            </div>
        </div>
    );
};

export default Map;