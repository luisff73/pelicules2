import React, { useState, useEffect } from "react";
import './App.css';
import './index.css';

function App() {
  return (
    <main className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto bg-black">
      <div>
        <h1 className="text-4xl font-bold text-gray-500 text-center my-8">
          Fylmography
        </h1>

        {/* <Pruebas /> */}
        <FormNewFilm />
        <GridFilms />

      
      </div>
    </main>
  );
}

const FormNewFilm = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [filmPoster, setFilmPoster] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Nombre:", name);
    console.log("Año:", year);
    console.log("Film Poster:", filmPoster);

    setName("");
    setYear("");
    setFilmPoster("");
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
            onChange={(e) => setName(e.target.value)}  // evento onChange actualiza el campo cada vez que cambia (e.target.value) es el valor que escribe el usuario
            className="p-2 border border-gray-300 rounded-md"
          />
        </label>

        <label className="flex flex-col w-2/2">
          Año:
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </label>
      </div>

      <label className="flex flex-col">
        Film Poster:
        <input
          type="text"
          onChange={(e) => setFilmPoster(e.target.value)}
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </label>
      <CrearButton />
    </form>
  );
};

const GridFilms = () => {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);

  useEffect(() => {
    fetch("https://json-pelicules.glitch.me/peliculas")
      .then((response) => response.json())
      .then((data) => setPeliculas(data))
      .catch((error) => console.error("Error al cargar las películas:", error));
  }, []);

  return (
    <div className="grid grid-cols-9 gap-3 p-4">
      {peliculas.map((pelicula: Pelicula) => (
        <ComponentFilm key={pelicula.id} pelicula={pelicula} />
      ))}
    </div>
  );
};

const ComponentFilm = ({ pelicula }: { pelicula: Pelicula }) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden relative">
      <EliminarButton/>   
      <img src={pelicula.image} className="w-full h-48 object-cover" />
      <div className="p-2">
        <h3 className="w-full font-semibold text-sm text-center">{pelicula.name}</h3>
        <p className="text-gray-500 text-center">{pelicula.year}</p>
        <UpdateButton/>
      </div>
    </div>
  );
};

function EliminarButton() { //funcion que crea un componente boton para eliminar
  return(
  <div className="flex justify-end">
  <button type="button" id="eliminar" className="absolute right-2 text-white hover:bg-blue-600 hover:text-white rounded-full p-1 w-" >X</button>
  </div>
  );
};
function UpdateButton() { //funcion que crea un componente boton para Actualizar
  return(
    <button type="button" id="update" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full text-center mt-2">Update</button>
  );
};

function CrearButton() { //funcion que crea un componente boton para Crear
  return(
    <button type="submit" id="Crear" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"> Crear Película </button>
  );
};


interface Pelicula {
  id: number;
  image: string;
  name: string;
  year: number;
}

const Pruebas = () => {
  return (<h1 className="color bg-red-600">hello</h1>);
}

export default App;

