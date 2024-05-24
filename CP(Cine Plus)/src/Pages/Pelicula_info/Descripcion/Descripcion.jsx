import React from 'react';
import { Link } from 'react-router-dom';
import './Descripcion.css';
import Calendario from './Calendario/Calendario.jsx';
import MovieTrailer from './Trailer/Trailer.jsx';

const fecha = new Date();

const defPelicula = {
    overview: 'Descripción no disponible',
    original_title: 'Título no disponible',
    production_countries: [{ name: 'No disponible' }],
    release_date: 'Fecha no disponible',
    genres: [{ name: 'No disponible' }],
    spoken_languages: [{ english_name: 'No disponible' }],
    runtime: 'Duración no disponible',
    original_language: 'No disponible',
    adult: false,
    vote_average: 0
};

const defCredits = { crew: [{ job: 'Director', name: 'No disponible' }] };

const Descripcion = ({ pelicula = defPelicula, credits = defCredits, videos }) => {
    const director = credits.crew ? credits.crew.find(crew => crew.job === 'Director') : { name: 'No disponible' };

    return (
        <div className='MayorContainer'>
            <div className='InfoContainer'>
                <div className='DescriptionContainer'>
                    <p>{pelicula.overview || 'Descripción no disponible'}</p>
                    <h6>Título original: {pelicula.original_title || 'Título no disponible'}</h6>
                    <h6>País de origen: {pelicula.production_countries && pelicula.production_countries[0] ? pelicula.production_countries[0].name : 'No disponible'}</h6>
                    <h6>Director: {director ? director.name : 'No disponible'}</h6>
                    <h6>Fecha de estreno: {pelicula.release_date || 'Fecha no disponible'}</h6>
                    <h6>Géneros: {pelicula.genres && pelicula.genres.length > 0 ? pelicula.genres.map(genre => genre.name).join(', ') : 'No disponible'}</h6>
                    <h6>Idiomas: {pelicula.spoken_languages && pelicula.spoken_languages.length > 0 ? pelicula.spoken_languages.map(lang => lang.english_name).join(', ') : 'No disponible'}</h6>
                    <h6>Duración: {pelicula.runtime ? `${pelicula.runtime} minutos` : 'Duración no disponible'}</h6>
                    <h6>Idioma original: {pelicula.original_language || 'No disponible'}</h6>
                    <h4>Para todo público: {pelicula.adult ? 'No' : 'Sí'}</h4>
                    <h3>Rating: {pelicula.vote_average !== undefined ? pelicula.vote_average.toFixed(1) : '0.0'}/10</h3>
                </div>
                <div className='CalendarioContainer'>
                    {videos && videos.length > 0 && <MovieTrailer videoKey={videos[0].key} />}
                    <Calendario diaInicial={fecha.getDate()} mesInicial={fecha.getMonth() + 1} añoInicial={fecha.getFullYear()} />
                    <Link to="/Reserva" className="ReservaButton">Reservar</Link>
                </div>
            </div>
        </div>
    );
}

export default Descripcion;
