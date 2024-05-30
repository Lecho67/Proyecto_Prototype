import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Descripcion.css';
import Calendario from './Calendario/Calendario.jsx';
import MovieTrailer from './Trailer/Trailer.jsx';
import { useSelector } from 'react-redux';
import axios from 'axios';
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


const Descripcion = ({ idPelicula, pelicula = defPelicula, credits = defCredits, videos = defVideos }) => {

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
    ]
    const crearFunciones = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/crearFuncion',{ 
                idPelicula: idPelicula,
                hora: Math.floor(Math.random()*25) + Math.random()>0.3?":00":":30",
                dia: Math.floor(Math.random()*29),
                mes: Math.floor(Math.random()*(12-fecha.getMonth() + 1))+fecha.getMonth(),
                año: fecha.getFullYear(),
                dimension: Math.random() > 0.5 ? '2d' : '3d',
                doblaje: Math.random() > 0.5 ? 'Sub' : 'Dob',
                sillas: []
            });
            console.log(response.data);
        }
        catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        crearFunciones();
    }, []);
    
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
