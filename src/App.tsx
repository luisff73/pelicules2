import React, { useState, useEffect } from "react"; // Importamos los hooks useState y useEffect
import './index.css';  // Importamos el fichero de estilos css personalizado que carga los estilos de tailwind.
import EliminarButton from './EliminarButton.tsx'; 


// Componente principal de la aplicación
function App() {
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]); // Estado para almacenar las películas "peliculas" es una variable que almacenara las peliculas y setPeliculas lo utilizamos para actualizar el valor de la variable Peliculas
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState<Pelicula | null>(null); // Estado para almacenar la película seleccionada para actualizar la asignamos a null al principio.

  return (
    <main className="flex flex-col items-center gap-8 py-16 max-w-[1280px] mx-auto bg-black">
      <div>
        <h1 className="text-4xl font-bold text-gray-500 text-center my-8">
          Fylmography
        </h1>

        {/* Cargamos el componente FormNewFilm que es un Formulario para crear o actualizar películas y le pasamos los parametros setPeliculas y peliccula seleccionada*/}
        <FormNewFilm 
          setPeliculas={setPeliculas} 
          peliculaSeleccionada={peliculaSeleccionada} // Le pasamos la película seleccionada si está en edición
        />

        
        {/* Grid que muestra todas las películas */}
        <GridFilms 
          peliculas={peliculas} 
          setPeliculas={setPeliculas} 
          setPeliculaSeleccionada={setPeliculaSeleccionada} // Cuando se hace click en actualizar, seteamos la película seleccionada
        />
      </div>

    </main>
  );
}

// Formulario para crear una nueva película o actualizar una existente
// al FormnewFilm le pasamos los parametros setPeliculas y peliculaSeleccionada 
// react.dispatch... es un tipo que describe una función que se usa para actualizar el estado en React. en este caso es un array de peliculas
const FormNewFilm = ({ setPeliculas, peliculaSeleccionada }: { setPeliculas: React.Dispatch<React.SetStateAction<Pelicula[]>>; peliculaSeleccionada: Pelicula | null }) => {
  
  const [name, setName] = useState(peliculaSeleccionada ? peliculaSeleccionada.name : "");  // Estado para el nombre
  const [year, setYear] = useState(peliculaSeleccionada ? peliculaSeleccionada.year.toString() : "");  // Estado para el año, lo convertimos a string
  const [filmPoster, setFilmPoster] = useState(peliculaSeleccionada ? peliculaSeleccionada.image : "");  // Estado para el poster de la película

  // Usamos useEffect para actualizar los campos cuando cambie la película seleccionada
  useEffect(() => {
    if (peliculaSeleccionada) {
      setName(peliculaSeleccionada.name);
      setYear(peliculaSeleccionada.year.toString());
      setFilmPoster(peliculaSeleccionada.image);
    }
  }, [peliculaSeleccionada]);  // Esto se ejecutará cada vez que cambie peliculaSeleccionada


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evitamos el comportamiento por defecto del formulario

    
    if (peliculaSeleccionada) { // Si tenemos una película seleccionada, la actualizamos
      actualizarPelicula(peliculaSeleccionada.id, name, year, filmPoster, setPeliculas);
    } else {
      crearPelicula(name, year, filmPoster, setPeliculas);  // Si no, creamos una nueva
    }

    // Limpiar los campos del formulario después de enviar
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

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        {peliculaSeleccionada ? "Actualizar Película" : "Crear Película"}
      </button>

      
    </form>
  );
};


// Componente que muestra la lista de películas
const GridFilms = ({ peliculas, setPeliculas, setPeliculaSeleccionada }: { peliculas: Pelicula[]; setPeliculas: React.Dispatch<React.SetStateAction<Pelicula[]>>; setPeliculaSeleccionada: React.Dispatch<React.SetStateAction<Pelicula | null>> }) => {

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

// Componente para cada película que muestra sus detalles y botones
const ComponentFilm = ({ pelicula, onEliminar, onUpdate }: { pelicula: Pelicula; onEliminar: () => void; onUpdate: () => void }) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden relative">
      <EliminarButton onEliminar={onEliminar} />  {/*Esta funcion esta en el fichero EliminarButton.tsx para reutilizarla.*/}
      <img src={pelicula.image} className="w-full h-48 object-cover" />
      <div className="p-2">
        <h3 className="w-full font-semibold text-sm text-center">{pelicula.name}</h3>
        <p className="text-gray-500 text-center">{pelicula.year}</p>
        <UpdateButton onClick={onUpdate}   />
      </div>
    </div>
  );
};



// Botón de actualizar
function UpdateButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}  // Llamamos a la función onUpdate cuando se hace click
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-full text-center mt-2"
    >
      Update
    </button>
  );
}

// Función para crear una nueva película
const crearPelicula = (name: string, year: string, filmPoster: string, setPeliculas: React.Dispatch<React.SetStateAction<Pelicula[]>>) => {
  const nuevaPelicula = {
    name,
    year: parseInt(year),  // Convertimos el año a número
    image: filmPoster,  // URL del poster
  };

  // Realizamos la solicitud POST para crear la nueva película
  fetch("https://json-pelicules.glitch.me/peliculas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevaPelicula),
  })
    .then((response) => response.json())  // Si la respuesta es exitosa, devolvemos los datos de la nueva película
    .then((data) => {
      setPeliculas((prevPeliculas) => [...prevPeliculas, data]);  // Actualizamos el estado con la nueva película
    })
    .catch((error) => console.error("Error al crear la película:", error));
};

// Función para actualizar una película
const actualizarPelicula = (
  id: number,
  name: string,
  year: string,
  filmPoster: string,
  setPeliculas: React.Dispatch<React.SetStateAction<Pelicula[]>>
) => {
  const updatedPelicula = {
    id,
    name,
    year: parseInt(year),  // Convertimos el año a número
    image: filmPoster,
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

// aqui definimos la colección pelicula para evitar errores posteriores en typescript.
interface Pelicula {
  id: number;
  image: string;
  name: string;
  year: number;
}

export default App;
