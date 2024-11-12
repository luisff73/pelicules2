
import React, { useState, useEffect } from "react";
import { interfacePelicula, interfaceGeneros } from "./App";

// Función para crear una nueva película
const crearPelicula = (name: string, year: string, filmPoster: string, genero: string, setPeliculas: React.Dispatch<React.SetStateAction<interfacePelicula[]>>) => {
  const nuevaPelicula = {
    name,
    year: parseInt(year),
    image: filmPoster,
    genero: genero,
  };

  fetch("https://json-pelicules.glitch.me/peliculas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaPelicula),
  })
    .then((response) => response.json())
    .then((data) => {
      setPeliculas((prevPeliculas) => [...prevPeliculas, data]);
    })
    .catch((error) => console.error("Error al crear la película:", error));
};

    // Función para actualizar una película
    const actualizarPelicula = (
        id: number,
        name: string,
        year: string,
        filmPoster: string,
        filmGenero: string,
        setPeliculas: React.Dispatch<React.SetStateAction<interfacePelicula[]>>
      ) => {
        const updatedPelicula = {
          id,
          name,
          year: parseInt(year),  // Convertimos el año a número
          image: filmPoster,
          genero: filmGenero,
        };
    
        // Realizamos la solicitud PUT para actualizar la película
        fetch(`https://json-pelicules.glitch.me/peliculas/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPelicula),
        })
          .then((response) => response.json())  // Si la respuesta es exitosa, devolvemos los datos actualizados
          .then(() => {
            setPeliculas((prevPeliculas) =>
              prevPeliculas.map((pelicula) =>
                pelicula.id === id ? { ...pelicula, ...updatedPelicula } : pelicula
              )
            );
          })
          .catch((error) => console.error("Error al actualizar la película:", error));
    };


// Formulario para crear una nueva película o actualizar una existente
// al FormnewFilm le pasamos los parametros setPeliculas y peliculaSeleccionada 
// react.dispatch... es un tipo que describe una función que se usa para actualizar el estado en React. en este caso es un array de peliculas

const FormNewFilm = ({ setPeliculas, peliculaSeleccionada, generoSeleccionado }: { setPeliculas: React.Dispatch<React.SetStateAction<interfacePelicula[]>>; peliculaSeleccionada: interfacePelicula | null; generoSeleccionado: interfaceGeneros | null }) => {
  
    const [name, setName] = useState(peliculaSeleccionada ? peliculaSeleccionada.name : "");  // Estado para el nombre
    const [year, setYear] = useState(peliculaSeleccionada ? peliculaSeleccionada.year.toString() : "");  // Estado para el año, lo convertimos a string
    const [filmPoster, setFilmPoster] = useState(peliculaSeleccionada ? peliculaSeleccionada.image : "");  // Estado para el poster de la película
    const [genero, setGenero] = useState(peliculaSeleccionada ? peliculaSeleccionada.genero : "");  // Estado para el genero de la película
   
    // Usamos useEffect para actualizar los campos cuando cambie la película seleccionada
    useEffect(() => {
      if (peliculaSeleccionada) {
        setName(peliculaSeleccionada.name);
        setYear(peliculaSeleccionada.year.toString());
        setFilmPoster(peliculaSeleccionada.image);
        setGenero(peliculaSeleccionada.genero);
      }
      if (generoSeleccionado) {
        setGenero(generoSeleccionado.name); // Actualiza el campo "Género"
      }
    }, [peliculaSeleccionada, generoSeleccionado]);  // Esto se ejecutará cada vez que cambie peliculaSeleccionada
  
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // Evitamos el comportamiento por defecto del formulario
  
      
      if (peliculaSeleccionada) { // Si tenemos una película seleccionada, la actualizamos
        actualizarPelicula(peliculaSeleccionada.id, name, year, filmPoster, genero, setPeliculas);
      } else {
        crearPelicula(name, year, filmPoster, genero, setPeliculas);  // Si no, creamos una nueva
      }
  
      // Limpiar los campos del formulario después de enviar
      setName("");
      setYear("");
      setFilmPoster("");
      setGenero("");
    };
  
    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-8 max-w-md mx-auto bg-gray-100 rounded-md mb-12"
      >
        <div className="flex gap-4 w-full">
          <label className="flex flex-col w-1/2">
            Nombre:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}  // Actualizamos el nombre con el valor del input
              className="p-2 border border-gray-300 rounded-md"
            />
          </label>
  
          <label className="flex flex-col w-2/2">
            Año:
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}  // Actualizamos el año con el valor del input
              className="p-2 border border-gray-300 rounded-md w-full"
            />
          </label>
        </div>
  
        <label className="flex flex-col">
          Film Poster:
          <input
            type="text"
            value={filmPoster}
            onChange={(e) => setFilmPoster(e.target.value)}  // Actualizamos la URL del poster con el valor del input
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </label>
  
        <label className="flex flex-col">
          Genero:
          <input
            type="text"
            value={genero}
            readOnly // Solo se puede modificar con el click del boton del genero
            onChange={(e) => setGenero(e.target.value)}  // Actualizamos la URL del genero con el valor del input
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </label>
  
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          {peliculaSeleccionada ? "Actualizar Película" : "Crear Película"}
        </button>
  
        
      </form>
    );
    
  
};
  export default FormNewFilm;
