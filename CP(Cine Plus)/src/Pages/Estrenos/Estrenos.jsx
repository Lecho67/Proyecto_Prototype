import './Estrenos.css'
import { Navigation } from "../../Components/Shared/BarraNavegacion/BarraNavegacion"
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react'
import axios from 'axios';
const Estrenos = ()=>{
    const [peliculas, setPeliculas] = useState([]);
    const numeroDePeliculas = 30; // Número de películas que deseas mostrar
    
    useEffect(() => {
      const fetchPeliculas = async () => {
        try {
          const response = await axios.get(
            'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc',
            {
              params: {
                api_key: '3b24534de9f3e0c2935e3edd6446ad0c',
                language: 'es',
              },
            }
          );
    
          const peliculasData = response.data.results.filter((x)=> x.poster_path != null).filter((x)=>x.poster_path !== null);
          setPeliculas(peliculasData);
        } catch (error) {
          console.error('Error al obtener las películas:', error);
        }
      };
    
      fetchPeliculas();
    }, [numeroDePeliculas]);
    
    return (
        <>
        <div className="wrapper">
            <div className='separador'></div>

            <div className="container1">
                <h1 className='estrenosTitulo'>Próximamente</h1>


                <div className="grid">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie">
            <Link to={`/Pelicula?id=${pelicula.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w300/${pelicula.poster_path}`}
                alt={pelicula.title}
              />
            </Link>
            <h2>{pelicula.title}</h2>
            <p>Clasificación: {pelicula.vote_average}</p>
          </div>
        ))}
      </div>
            </div>
        </div>
        </>
    )

}

export default Estrenos