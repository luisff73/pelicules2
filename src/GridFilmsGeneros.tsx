import React, { useEffect } from 'react';
import ComponentGeneros from './ComponentGeneros.tsx';
import { interfaceGeneros } from './App';

// Componente que muestra la lista de Generos
//                         (propiedades que recibe)                           array interfaceGeneros             funcion de react que actualiza el estado de los generos                     asignamos setgeneroseleccionado a null
const GridFilmsGeneros = ({ generos, setGeneros, setGeneroSeleccionado }: { generos: interfaceGeneros[]; setGeneros: React.Dispatch<React.SetStateAction<interfaceGeneros[]>>; setGeneroSeleccionado: React.Dispatch<React.SetStateAction<interfaceGeneros | null>> }) => {

    // useEffect se usa para cargar las películas cuando el componente se monta
    useEffect(() => {
      fetch("https://json-pelicules.glitch.me/generos")  // Realizamos una petición fetch para obtener los generos
        .then((response) => response.json())  // Convertimos la respuesta en JSON
        .then((data) => {
          setGeneros(data);  // Actualizamos el estado con las películas recibidas
        })
        .catch((error) => console.error("Error al cargar los generos:", error)); // Manejo de errores
    }, []);  // El array vacío significa que solo se ejecuta una vez al montar el componente
  
    // Función para eliminar una película
    const eliminarGeneros = (id: number) => {
      fetch(`https://json-pelicules.glitch.me/generos/${id}`, { method: 'DELETE' })  // Enviamos la petición DELETE para eliminar la película
        .then((response) => {
          if (response.ok) {
            // Si la eliminación es correcta, actualizamos el estado para eliminar el genero de la lista
            setGeneros(generos.filter((generos) => generos.id !== id));
          }
        })
        .catch((error) => console.log("Error al eliminar el genero:", error));
    };
   
    return (  // rellena el grid de generos con el componente Generos
      <div className="grid grid-cols-5 gap-3 p-4">
        {generos.map((genero) => (
          <ComponentGeneros
            key={genero.id}  // Necesario para que React reconozca los elementos únicos
            generos={genero}  // Usamos el nombre singular para la iteración
            onEliminar={() => eliminarGeneros(genero.id)}  // Llamamos a la función eliminarGenero
            onSelectGenero={setGeneroSeleccionado} // Pasa la función como prop/propiedad
          />
        ))}
      </div>
    );
  };

  export default GridFilmsGeneros;