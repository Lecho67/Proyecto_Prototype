import React from 'react'
import useFetchUrl from '../../Hooks/useFetchUrl';
const CuadrillaEstrenos = () => {
    const [peliculas] = useFetchUrl('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc')
    return (
        <>
        <div className="wrapper">
            <div className='separador'></div>

            <div className="container1">
                <h1 className='estrenosTitulo'>Próximamente</h1>

        
                <div className="grid">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie">
            <a href={`/Pelicula?id=${pelicula.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w300/${pelicula.poster_path}`}
                alt={pelicula.title}
              />
            </a>
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

export default CuadrillaEstrenos