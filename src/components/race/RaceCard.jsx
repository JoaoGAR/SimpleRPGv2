import React, { useState } from "react"

export default function RaceCard(props) {

    return (

        <div className="row" key={props.id}>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={"../" + props.image} className="img-fluid rounded-start" alt="Race image" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <img src={"../" + props.icon} className="img-fluid rounded-start" alt="Race icon" />
                            <h5 className="card-title">{props.name}</h5>
                            <p className="card-text">{props.history}</p>
                            <p className="card-text"><img src={"../" + props.heraldry} className="img-fluid rounded-start" alt="Race heraldry" /></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}