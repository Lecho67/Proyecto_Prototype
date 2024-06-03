import React from "react";
import './About.css'

import frotenImage from "../../assets/froten.png";
import cuelloImage from "../../assets/cuello.png";
import playGTAImage from "../../assets/PlayGTAV.png";
import apiImage from "../../assets/api.png";

export const About = () => {
    const teamMembers = [
        {
            name: "Juan Pablo Castaño",
            role: "Desarrollador Frontend",
            description: "Encargado de aprender a usar Grid y Flex, e increíblemente lo logró!!11!!.",
            image: frotenImage,
        },
        {
            name: "Juan Esteban Cuello",
            role: "Desarrolladora Backend",
            description: "Responsable de preguntar si eres de Back o de Front, todo lo buscó ayer.",
            image: cuelloImage,
        },
        {
            name: "Christian David Cardenas",
            role: "Diseñador de About",
            description: "Diseñó la página que estás viendo, poco más.",
            image: playGTAImage,
        },
        {
            name: "Simon Colonia Amador",
            role: "Gestora de Proyecto",
            description: "Dañaba el código, hacía commits con código inservible y era grosero con Cuello, y aún así ahí va el mejor empleado de CP",
            image: apiImage,
        },
    ];

    return (
        <div className="about-container">
            <h1>About Us</h1>
            <div className="team-members">
                {teamMembers.map((member, index) => (
                    <div className="team-member" key={index}>
                        <img src={member.image} alt={member.name} className="team-member-image" />
                        <h2>{member.name}</h2>
                        <h3>{member.role}</h3>
                        <p>{member.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
