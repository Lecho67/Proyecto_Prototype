import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Descripcion.css';
import Calendario from './Calendario/Calendario.jsx';
import MovieTrailer from './Trailer/Trailer.jsx';
import { useSelector } from 'react-redux';
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

    const {status} = useSelector(state => state.auth);
    const director = credits.crew ? credits.crew.find(crew => crew.job === 'Director') : { name: 'No disponible' };

    const [dimension, setDimension] = React.useState("");
    const [doblaje, setDoblaje] = React.useState("");
    const [fechaCalendario , setFechaCalendario] = React.useState({dia: fecha.getDate(), mes: fecha.getMonth() + 1, año: fecha.getFullYear()});
    const [disp2d, setDisp2d] = useState(false);
    const [disp3d, setDisp3d] = useState(false);
    const [dispSub, setDispSub] = useState(false);
    const [dispDob, setDispDob] = useState(false);
    const [diasDisponibles, setDiasDisponibles] = useState([]);

    const funciones = [
        {hora: "10:00", dia: 23, mes: 5, año: 2024, id: 123456, dimension: "2d", doblaje: "Sub"},
        {hora: "11:00", dia: 23, mes: 6, año: 2024, id: 123457, dimension: "3d", doblaje: "Dob"},
        {hora: "12:00", dia: 23, mes: 7, año: 2024, id: 123458, dimension: "2d", doblaje: "Sub"},
        {hora: "13:00", dia: 23, mes: 6, año: 2024, id: 123459, dimension: "3d", doblaje: "Sub"},
        {hora: "14:00", dia: 23, mes: 6, año: 2024, id: 123460, dimension: "2d", doblaje: "Dob"},
        {hora: "15:00", dia: 24, mes: 5, año: 2024, id: 123461, dimension: "3d", doblaje: "Sub"},
        {hora: "16:00", dia: 25, mes: 5, año: 2024, id: 123462, dimension: "2d", doblaje: "Dob"},
        {hora: "17:00", dia: 26, mes: 7, año: 2024, id: 123463, dimension: "3d", doblaje: "Sub"},
        {hora: "18:00", dia: 27, mes: 7, año: 2024, id: 123464, dimension: "2d", doblaje: "Dob"},
        {hora: "19:00", dia: 27, mes: 7, año: 2024, id: 123465, dimension: "3d", doblaje: "Sub"},
        {hora: "20:00", dia: 27, mes: 6, año: 2024, id: 123466, dimension: "2d", doblaje: "Dob"},
        {hora: "21:00", dia: 30, mes: 6, año: 2024, id: 123467, dimension: "3d", doblaje: "Sub"},
        {hora: "22:00", dia: 31, mes: 6, año: 2024, id: 123468, dimension: "2d", doblaje: "Dob"},
        {hora: "09:00", dia: 1, mes: 1, año: 2024, id: 123469, dimension: "2d", doblaje: "Sub"},
        {hora: "10:00", dia: 2, mes: 1, año: 2024, id: 123470, dimension: "3d", doblaje: "Dob"},
        {hora: "11:00", dia: 3, mes: 1, año: 2024, id: 123471, dimension: "2d", doblaje: "Sub"},
        {hora: "12:00", dia: 4, mes: 2, año: 2024, id: 123472, dimension: "3d", doblaje: "Sub"},
        {hora: "13:00", dia: 5, mes: 2, año: 2024, id: 123473, dimension: "2d", doblaje: "Dob"},
        {hora: "14:00", dia: 6, mes: 2, año: 2024, id: 123474, dimension: "3d", doblaje: "Sub"},
        {hora: "15:00", dia: 7, mes: 3, año: 2024, id: 123475, dimension: "2d", doblaje: "Dob"},
        {hora: "16:00", dia: 8, mes: 3, año: 2024, id: 123476, dimension: "3d", doblaje: "Sub"},
        {hora: "17:00", dia: 9, mes: 3, año: 2024, id: 123477, dimension: "2d", doblaje: "Dob"},
        {hora: "18:00", dia: 10, mes: 4, año: 2024, id: 123478, dimension: "3d", doblaje: "Sub"},
        {hora: "19:00", dia: 11, mes: 4, año: 2024, id: 123479, dimension: "2d", doblaje: "Dob"},
        {hora: "20:00", dia: 12, mes: 4, año: 2024, id: 123480, dimension: "3d", doblaje: "Sub"},
        {hora: "21:00", dia: 13, mes: 5, año: 2024, id: 123481, dimension: "2d", doblaje: "Dob"},
        {hora: "22:00", dia: 14, mes: 5, año: 2024, id: 123482, dimension: "3d", doblaje: "Sub"},
        {hora: "23:00", dia: 15, mes: 5, año: 2024, id: 123483, dimension: "2d", doblaje: "Dob"},
        {hora: "08:00", dia: 16, mes: 6, año: 2024, id: 123484, dimension: "3d", doblaje: "Sub"},
        {hora: "09:00", dia: 17, mes: 6, año: 2024, id: 123485, dimension: "2d", doblaje: "Dob"},
        {hora: "10:00", dia: 18, mes: 6, año: 2024, id: 123486, dimension: "3d", doblaje: "Sub"},
        {hora: "11:00", dia: 19, mes: 7, año: 2024, id: 123487, dimension: "2d", doblaje: "Dob"},
        {hora: "12:00", dia: 20, mes: 7, año: 2024, id: 123488, dimension: "3d", doblaje: "Sub"},
        {hora: "13:00", dia: 21, mes: 7, año: 2024, id: 123489, dimension: "2d", doblaje: "Dob"},
        {hora: "14:00", dia: 22, mes: 5, año: 2024, id: 123490, dimension: "3d", doblaje: "Sub"},
        {hora: "15:00", dia: 23, mes: 5, año: 2024, id: 123491, dimension: "2d", doblaje: "Dob"},
        {hora: "16:00", dia: 24, mes: 5, año: 2024, id: 123492, dimension: "3d", doblaje: "Sub"},
        {hora: "17:00", dia: 25, mes: 9, año: 2024, id: 123493, dimension: "2d", doblaje: "Dob"},
        {hora: "18:00", dia: 26, mes: 9, año: 2024, id: 123494, dimension: "3d", doblaje: "Sub"},
        {hora: "19:00", dia: 27, mes: 9, año: 2024, id: 123495, dimension: "2d", doblaje: "Dob"},
        {hora: "20:00", dia: 28, mes: 10, año: 2024, id: 123496, dimension: "3d", doblaje: "Sub"},
        {hora: "21:00", dia: 29, mes: 10, año: 2024, id: 123497, dimension: "2d", doblaje: "Dob"},
        {hora: "22:00", dia: 30, mes: 10, año: 2024, id: 123498, dimension: "3d", doblaje: "Sub"},
        {hora: "23:00", dia: 31, mes: 11, año: 2024, id: 123499, dimension: "2d", doblaje: "Dob"},
        {hora: "08:00", dia: 1, mes: 11, año: 2024, id: 123500, dimension: "3d", doblaje: "Sub"},
        {hora: "09:00", dia: 2, mes: 11, año: 2024, id: 123501, dimension: "2d", doblaje: "Dob"},
        {hora: "10:00", dia: 3, mes: 12, año: 2024, id: 123502, dimension: "3d", doblaje: "Sub"},
        {hora: "11:00", dia: 4, mes: 12, año: 2024, id: 123503, dimension: "2d", doblaje: "Dob"},
        {hora: "12:00", dia: 5, mes: 12, año: 2024, id: 123504, dimension: "3d", doblaje: "Sub"},
        {hora: "13:00", dia: 6, mes: 1, año: 2025, id: 123505, dimension: "2d", doblaje: "Dob"},
        {hora: "14:00", dia: 7, mes: 1, año: 2025, id: 123506, dimension: "3d", doblaje: "Sub"},
        {hora: "15:00", dia: 8, mes: 1, año: 2025, id: 123507, dimension: "2d", doblaje: "Dob"},
        {hora: "16:00", dia: 9, mes: 2, año: 2025, id: 123508, dimension: "3d", doblaje: "Sub"},
        {hora: "17:00", dia: 10, mes: 2, año: 2025, id: 123509, dimension: "2d", doblaje: "Dob"}
        
    ]
    
    const actualizarFiltros= () =>{
        setDisp2d(false);
        setDisp3d(false);
        setDispSub(false);      
        setDispDob(false);
        setDimension("");
        setDoblaje("");
        const nuevalista = [];
        funciones.forEach((funcion) => {
            if (funcion.mes === fechaCalendario.mes && funcion.año === fechaCalendario.año){
                if (funcion.dia === fechaCalendario.dia ) {
                    if (funcion.dimension === '2d') {
                        setDisp2d(true);
                    }
                    if (funcion.dimension === '3d') {
                        setDisp3d(true);
                    }
                    if (funcion.doblaje === 'Sub') {
                        setDispSub(true);
                    }
                    if (funcion.doblaje === 'Dob') {
                        setDispDob(true);
                    }
                }
                nuevalista.push(funcion.dia);
                setDiasDisponibles(nuevalista);
            }
            
        });
    }
    const handleFechaCalendario = (dia, mes, año) => {
        setFechaCalendario({ dia: dia,mes: mes,año: año});
        setDiasDisponibles([]);
    }
    useEffect(() => {
        actualizarFiltros();
    }, [fechaCalendario]);




    const filteredFunciones = funciones.filter(funcion => {

        const dimensionMatch = dimension ? funcion.dimension === dimension : true;
        const doblajeMatch = doblaje ? funcion.doblaje === doblaje : true;
        const fechaCalendarioMatch = (funcion.dia === fechaCalendario.dia && funcion.mes === fechaCalendario.mes && funcion.año === fechaCalendario.año);
        return dimensionMatch && doblajeMatch && fechaCalendarioMatch;  
    });

    
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
                    <Calendario diaInicial={fecha.getDate()} mesInicial={fecha.getMonth() + 1} añoInicial={fecha.getFullYear()} cambioDeFecha={handleFechaCalendario} diasDisponibles={diasDisponibles}/>
                    
                    <div className='FiltrosContainer'>
                        <div className="button-group">
                            {disp2d? <div className={`button ${dimension === "2d" ? "seleccionado" : "noseleccionado"}`} onClick={dimension === "2d" ? () => setDimension("") : () => setDimension("2d")}>2D</div> :<div className="button nodisponible">2D</div> }
                            {disp3d? <div className={`button ${dimension === "3d" ? "seleccionado" : "noseleccionado"}`} onClick={dimension === "3d" ? () => setDimension("") : () => setDimension("3d")}>3D</div> :<div className="button nodisponible">3D</div> }
                        </div>
                        <div className="button-group">
                            {dispSub? <div className={`button ${doblaje === "Sub" ? "seleccionado" : "noseleccionado"}`} onClick={doblaje === "Sub" ? () => setDoblaje("") : () => setDoblaje("Sub")}>SUB</div> :<div className="button nodisponible">SUB</div> }
                            {dispDob? <div className={`button ${doblaje === "Dob" ? "seleccionado" : "noseleccionado"}`} onClick={doblaje === "Dob" ? () => setDoblaje("") : () => setDoblaje("Dob")}>DOB</div> :<div className="button nodisponible">DOB</div> }
                        </div>
                    </div>
                    <div className='FuncionesContainer'>
                        {filteredFunciones.map(funcion => {
                            return <Link key={funcion.id} className='funcionlink' to={status?`/reserva?id=${funcion.id}`: "/plssignin"}><div className="button funcion">{funcion.hora}</div></Link>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Descripcion;
