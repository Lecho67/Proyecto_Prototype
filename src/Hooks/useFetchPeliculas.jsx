
import axios from 'axios'

const fetchPeliculas = async (numeroDePeliculas, pageSize) => {
    try {
      const totalPages = Math.ceil(numeroDePeliculas / pageSize);
      const requests = [];

      for (let page = 1; page <= totalPages; page++) {
        requests.push(
          axios.get(
            'https://api.themoviedb.org/3/movie/now_playing',
            {
              params: {
                api_key: '3b24534de9f3e0c2935e3edd6446ad0c',
                language: 'es',
                page: page,
              },
            }
          )
        );
      }

      const responses = await Promise.all(requests);
      const peliculasData = responses.flatMap(response => response.data.results);
      return peliculasData.slice(0, numeroDePeliculas);

    } catch (error) {
      console.error('Error al obtener las películas:', error);
    }
  };

export default fetchPeliculas;