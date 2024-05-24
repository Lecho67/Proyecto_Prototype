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

const defVideos = {
    "results": [
      {
        "key": "dQw4w9WgXcQ",
      }
    ]
  }


const Descripcion = ({ pelicula = defPelicula, credits = defCredits, videos = defVideos }) => {
    const director = credits.crew ? credits.crew.find(crew => crew.job === 'Director') : { name: 'No disponible' };

    const [dimension, setDimension] = React.useState("2d");
    const [doblaje, setDoblaje] = React.useState("Sub");
 
    const disp2d = true;
    const disp3d = true;
    const dispSub = true;
    const dispDob = true;

    const funciones = [
        {hora : "10:00", dia : 23, mes : 5, año : 2024, id : 123456},
        {hora : "11:00", dia : 23, mes : 5, año : 2024, id : 123457},
        {hora : "12:00", dia : 23, mes : 5, año : 2024, id : 123458},
        {hora : "13:00", dia : 23, mes : 5, año : 2024, id : 123459},
        {hora : "14:00", dia : 23, mes : 5, año : 2024, id : 123460},
        {hora : "15:00", dia : 23, mes : 5, año : 2024, id : 123461},
        {hora : "16:00", dia : 23, mes : 5, año : 2024, id : 123462},
        {hora : "17:00", dia : 23, mes : 5, año : 2024, id : 123463},
        {hora : "18:00", dia : 23, mes : 5, año : 2024, id : 123464},
        {hora : "19:00", dia : 23, mes : 5, año : 2024, id : 123465},
        {hora : "20:00", dia : 23, mes : 5, año : 2024, id : 123466},
        {hora : "21:00", dia : 23, mes : 5, año : 2024, id : 123467},
        {hora : "22:00", dia : 23, mes : 5, año : 2024, id : 123468},
    ]

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
                    {videos && videos.results.length > 0 && <MovieTrailer videoKey={videos.results[0].key} />}
                    <Calendario diaInicial={fecha.getDate()} mesInicial={fecha.getMonth() + 1} añoInicial={fecha.getFullYear()} />
                    
                    <div className='FiltrosContainer'>
                        <div class="button-group">
                            {disp2d? <div class={`button ${dimension === "2d" ? "seleccionado" : "noseleccionado"}`} onClick={() => setDimension("2d")}>2D</div> :<div class="button nodisponible">2D</div> }
                            {disp3d? <div class={`button ${dimension === "3d" ? "seleccionado" : "noseleccionado"}`} onClick={() => setDimension("3d")}>3D</div> :<div class="button nodisponible">3D</div> }
                        </div>
                        <div class="button-group">
                            {dispSub? <div class={`button ${doblaje === "Sub" ? "seleccionado" : "noseleccionado"}`} onClick={() => setDoblaje("Sub")}>SUB</div> :<div class="button nodisponible">Subtitulado</div> }
                            {dispDob? <div class={`button ${doblaje === "Dob" ? "seleccionado" : "noseleccionado"}`} onClick={() => setDoblaje("Dob")}>DOB</div> :<div class="button nodisponible">Doblado</div> }
                        </div>
                    </div>
                    <div className='FuncionesContainer'>
                        {funciones.map(funcion => {
                            return <Link className='funcionlink' to={`/reserva?id=${funcion.id}`}><div class="button funcion">{funcion.hora}</div></Link>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Descripcion;
