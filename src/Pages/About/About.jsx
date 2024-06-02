import React from "react";
import './About.css'

export const About = () => {
    const teamMembers = [
        {
            name: "Juan Pablo Castaño",
            role: "Desarrollador Frontend",
            description: "Encargado de aprender a usar Grid y Flex, e increiblemente lo logro!!11!!.",
            image: "../../assets/froten.pn",
        },
        {
            name: "Juan Esteban Cuello",
            role: "Desarrolladora Backend",
            description: "Responsable de preguntar si eres de Back o de Front, todo lo busco ayer.",
            image: "../../assets/cuello.gif",
        },
        {
            name: "Christian David Cardenas",
            role: "Diseñador de About",
            description: "Diseñó la pagina que estas viendo, poco mas.",
            image: "../../assets/PlayGTAV.exe",
        },
        {
            name: "Simon Colonia Amador",
            role: "Gestora de Proyecto",
            description: "Dañaba el codigo, hacia commits con codigo inservible y era grosero con Cuello, y aún así ahí va el mejor empleado de CP",
            image: "../../assets/api.yml",
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
