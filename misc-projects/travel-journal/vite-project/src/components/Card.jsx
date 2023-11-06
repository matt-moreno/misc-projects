import React from "react";

export default function Card(props) {
    return (
        <div className="card--container">

            <div className="card--img">
                <img src={props.imageUrl} className="travel--img"/>
            </div>
                
            <div className="card--info">
                <div>
                    <img src="/public/pin-icon.png"/>
                    <span className="card--location">{props.location.toUpperCase()}</span>
                    <span>
                        <a href={props.googleMapsUrl}>Google Maps Link</a>
                    </span>
                </div>
                <h1>{props.title}</h1>
                <h3>{props.startDate} - {props.endDate}</h3>
                <p className="card--description">{props.description}</p>
            </div>

        </div>
    )
}