import { useEffect,useState } from "react";

import axios from 'axios'
const useFetchUrl = (url) => {
    let response;
    useEffect(() => {
      const fetchPeliculas = async () => {
        try {
          response = await axios.get(
            url,
            {
              params: {
                api_key: '3b24534de9f3e0c2935e3edd6446ad0c',
                language: 'es',
              },
            }
          );
    
          response = response.data.results
          console.log(response)
        } catch (error) {
          console.error('Error al obtener las películas:', error);
        }
      };
    
      fetchPeliculas();
    }, []);
  return (
    [response]
  )
}

export default useFetchUrl