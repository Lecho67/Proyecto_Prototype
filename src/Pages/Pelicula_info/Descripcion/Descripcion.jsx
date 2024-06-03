import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Descripcion.css';
import Calendario from './Calendario/Calendario.jsx';
import MovieTrailer from './Trailer/Trailer.jsx';
import { useSelector } from 'react-redux';
import cinePlusApi from '../../../api/cinePlusApi.js';
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
    const ordendecrearenviada = useRef(false);

    const {status} = useSelector(state => state.auth);
    const director = credits.crew ? credits.crew.find(crew => crew.job === 'Director') : { name: 'No disponible' };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({message: ""});
    const [funcionStatus, setFuncionStatus] = useState(null);
    const [dimension, setDimension] = React.useState("");
    const [doblaje, setDoblaje] = React.useState("");
    const [fechaCalendario , setFechaCalendario] = React.useState({dia: fecha.getDate(), mes: fecha.getMonth() + 1, año: fecha.getFullYear()});
    const [disp2d, setDisp2d] = useState(false);
    const [disp3d, setDisp3d] = useState(false);
    const [dispSub, setDispSub] = useState(false);
    const [dispDob, setDispDob] = useState(false);
    const [diasDisponibles, setDiasDisponibles] = useState([]);
    const [funciones, setFunciones] = useState([]);

    const obtenerFunciones = async () => {
        try {
            const response = await cinePlusApi.get('/obtenerFunciones/' + idPelicula);
            console.log(response.data);
            setLoading(false);
            return response.data;
        }
        catch (error) {
            console.error(error.message);
            setError({message: 'Error al obtener las funciones de la película'});
            return [];
        }
    }
    const crearFunciones = async (cantidad, idPeliculaActual) => {

        const fecha = new Date();
        const promises = [];
    
        for (let j = 0; j < cantidad; j++) {
            const sillas = [];
            let precio = Math.floor(Math.random() * 10000 + 10000);
            for (let i = 0; i < 128; i++) {
                sillas.push({ estado: Math.random() < 0.3, precio: precio });
            }
            
            const funcionData = {
                idPelicula: idPeliculaActual,
                hora: Math.floor(Math.random() * 25).toString().concat(Math.random() >= 0.3 ? ":00" : ":30"),
                dia: Math.floor(Math.random() * 29),
                mes: Math.floor(Math.random() * (3)) + fecha.getMonth()+1,
                año: fecha.getFullYear(),
                dimension: Math.random() > 0.5 ? '2d' : '3d',
                doblaje: Math.random() > 0.5 ? 'Sub' : 'Dob',
                sillas: sillas
            };
            promises.push(cinePlusApi.post('/crearFuncion', funcionData));
        }
    
        try {
            const responses = await Promise.all(promises);
            responses.forEach(response => console.log(response.data));
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        obtenerFunciones().then((funciones)=>{setFunciones(funciones);console.log(funciones)}).catch((error)=>{console.error(error);setError(error)});
    }, []); 

    useEffect(() => {   
    if (!loading){
        console.log(funciones.length);
        if (funciones.length < 40 && !ordendecrearenviada.current && error.message != 'Error al obtener las funciones de la película') {
            setFuncionStatus('Creando funciones de forma aleatoria, esto puede tardar unos minutos...');
            crearFunciones(40 - funciones.length, idPelicula).then(() => {obtenerFunciones().then((funciones)=>{
                setFunciones(funciones)
                setFuncionStatus(null);
            });});

            ordendecrearenviada.current = true;
        }
    }
        
        actualizarFiltros();
    }, [funciones,loading]);
    
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

                    {error.message? <p>{error.message}</p>:loading ? <p>Cargando...</p>:funcionStatus? <p>{funcionStatus}</p>
                    :<>
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
                            {filteredFunciones.map((funcion, key)  => {
                                return <Link key={key} className='funcionlink' to={status?`/reserva?id=${funcion._id}`: "/plssignin"}><div className="button funcion">{funcion.hora}</div></Link>
                            })}
                        </div>
                    </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Descripcion;
