
import axios from 'axios'

const fetchPeliculas = async (id) => {
    try {
      const request = [];

    
        request.push(
          axios.get(
            'https://api.themoviedb.org/3/movie/'+id+"/credits",
            {
              params: {
                api_key: '3b24534de9f3e0c2935e3edd6446ad0c',
                language: 'es'
              },
            } 
          )
        );

      const response = await Promise.all(request);
      const data = response[0].data;
      return data;

    } catch (error) {
      console.error('Error al obtener los creditos:', error);
    }
  };

export default fetchPeliculas;