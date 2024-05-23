import React from 'react';
import { Link } from 'react-router-dom';
import './Descripcion.css';
import Calendario from './Calendario/Calendario.jsx';

const fecha = new Date();

const defPelicula = {
    production_countries: [{ name: '' }],
    genres: [{ name: 'buscando' }],
    spoken_languages: [{ english_name: 'buscando' }],
    adult: false,
    vote_average: 0
};
const defCredits = { crew: [{ job: 'Director', name: 'Buscando' }] };

const Descripcion = ({ pelicula = defPelicula, credits = defCredits }) => {
    const director = credits.crew.find(crew => crew.job === 'Director');

    return (
        <div className='MayorContainer'>
            <div className='InfoContainer'>
                <div className='DescriptionContainer'>
                    <p>{pelicula.overview}</p>
                    <h6>Título original: {pelicula.original_title}</h6>
                    <h6>País de origen: {pelicula.production_countries[0].name}</h6>
                    <h6>Director: {director.name}</h6>
                    <h6>Fecha de estreno: {pelicula.release_date}</h6>
                    <h6>Generos: {pelicula.genres.map(genre => genre.name).join(', ')}</h6>
                    <h6>Idiomas: {pelicula.spoken_languages.map(lang => lang.english_name).join(', ')}</h6>
                    <h6>Duracion: {pelicula.runtime} minutos</h6>
                    <h6>Idioma original: {pelicula.original_language}</h6>
                    <h4>Para todo público: {pelicula.adult ? 'No' : 'Sí'}</h4>
                    <h3>Rating: {pelicula.vote_average.toFixed(1)}/10</h3>
                </div>
                <div className='CalendarioContainer'>
                    <div className='TrailerContainer'></div>
                    <Calendario diaInicial={fecha.getDate()} mesInicial={fecha.getMonth() + 1} añoInicial={fecha.getFullYear()} />
                    <Link to="/Reserva" className="ReservaButton">Reservar</Link>
                </div>
            </div>
        </div>
    );
}

export default Descripcion;
