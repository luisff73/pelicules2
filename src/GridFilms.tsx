import React, { useEffect } from "react";
import { interfacePelicula } from "./App";
import { ComponentFilm } from "./ComponentFilm.tsx";
// Componente que muestra la lista de películas
const GridFilms = ({ peliculas, setPeliculas, setPeliculaSeleccionada }: { peliculas: interfacePelicula[]; setPeliculas: React.Dispatch<React.SetStateAction<interfacePelicula[]>>; setPeliculaSeleccionada: React.Dispatch<React.SetStateAction<interfacePelicula | null>> }) => {

    // useEffect se usa para cargar las películas cuando el componente se monta
    useEffect(() => {
      fetch("https://json-pelicules.glitch.me/peliculas")  // Realizamos una petición fetch para obtener las películas
        .then((response) => response.json())  // Convertimos la respuesta en JSON
        .then((data) => {
          setPeliculas(data);  // Actualizamos el estado con las películas recibidas
        })
        .catch((error) => console.error("Error al cargar las películas:", error)); // Manejo de errores
    }, []);  // El array vacío significa que solo se ejecuta una vez al montar el componente
  
    // Función para eliminar una película
    const eliminarPelicula = (id: number) => {
      fetch(`https://json-pelicules.glitch.me/peliculas/${id}`, { method: 'DELETE' })  // Enviamos la petición DELETE para eliminar la película
        .then((response) => {
          if (response.ok) {
            // Si la eliminación es correcta, actualizamos el estado para eliminar la película de la lista
            setPeliculas(peliculas.filter((pelicula) => pelicula.id !== id));
          }
        })
        .catch((error) => console.log("Error al eliminar la película:", error));
    };
  
    
    return (  // rellena el grid de peliculas con el componentFilm
      <div className="grid grid-cols-5 gap-3 p-4">
        {peliculas.map((pelicula) => (
          <ComponentFilm
            key={pelicula.id}  // Necesario para que React reconozca los elementos únicos
            pelicula={pelicula}
            onEliminar={() => eliminarPelicula(pelicula.id)}  // Llamamos a la función eliminarPelicula al hacer click en eliminar
            onUpdate={() => setPeliculaSeleccionada(pelicula)}  // Establecemos la película seleccionada para actualizar
          />
        ))}
      </div>
    );
  };

  export default GridFilms;