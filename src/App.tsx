import React, { useState, useEffect } from "react"; // Importamos los hooks useState y useEffect
import './index.css';  // Importamos el fichero de estilos css personalizado que carga los estilos de tailwind.
import EliminarButton from './EliminarButton.tsx'; 


// Componente principal de la aplicación
function App() {
  const [peliculas, setPeliculas] = useState<interfacePelicula[]>([]); // Estado para almacenar las películas "peliculas" es una variable que almacenara las peliculas y setPeliculas lo utilizamos para actualizar el valor de la variable Peliculas
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState<interfacePelicula | null>(null); // Estado para almacenar la película seleccionada para actualizar la asignamos a null al principio.
  const [generos, setGeneros] = useState<interfaceGeneros[]>([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState<interfaceGeneros | null>(null);
 
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
          generoSeleccionado={generoSeleccionado} // Pasa la prop
        />

        <AgregarGenero setGeneros={setGeneros} crearGenero={crearGenero} />


        {/* Grid que muestra todos los generos */}
        <GridFilmsGeneros
         generos={generos}
         setGeneros={setGeneros}
         setGeneroSeleccionado={setGeneroSeleccionado}
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

// Función para crear un nuevo género
const crearGenero = (name: string, setGeneros: React.Dispatch<React.SetStateAction<interfaceGeneros[]>>) => {
  const nuevoGenero = { name };

  fetch("https://json-pelicules.glitch.me/generos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoGenero),
  })
    .then((response) => response.json())
    .then((data) => {
      setGeneros((prevGeneros) => [...prevGeneros, data]);
    })
    .catch((error) => console.error("Error al crear el género:", error));
};

const AgregarGenero = ({ setGeneros, crearGenero }: { setGeneros: React.Dispatch<React.SetStateAction<interfaceGeneros[]>>; crearGenero: (name: string, setGeneros: React.Dispatch<React.SetStateAction<interfaceGeneros[]>>) => void }) => {
  const [nombreGenero, setNombreGenero] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombreGenero) {
      crearGenero(nombreGenero, setGeneros);  // Llamar a la función crearGenero con los dos parámetros
      setNombreGenero("");  // Limpiar el campo de texto
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mb-8">
      <input
        type="text"
        value={nombreGenero}
        onChange={(e) => setNombreGenero(e.target.value)}
        className="p-2 border border-gray-800 rounded-md w-4/5 mx-3"
        placeholder="Nuevo género"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
        
        Agregar Género
      </button>
    </form>
  );
};



// Componente que muestra la lista de Generos
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
          onSelectGenero={setGeneroSeleccionado} // Pasa la función como prop
        />
      ))}
    </div>
  );
  
};




// Componente para cada película que muestra sus detalles y botones
const ComponentFilm = ({ pelicula, onEliminar, onUpdate }: { pelicula: interfacePelicula; onEliminar: () => void; onUpdate: () => void }) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden relative">
      <EliminarButton onEliminar={onEliminar} />  {/*Esta funcion esta en el fichero EliminarButton.tsx para reutilizarla.*/}
      <img src={pelicula.image} className="w-full h-48 object-cover" />
      <div className="p-2">
        <h3 className="w-full font-semibold text-sm text-center">{pelicula.name}</h3>
        <p className="text-gray-500 text-center">{pelicula.year}</p>
        <p className="text-gray-500 text-center">{pelicula.genero}</p>
        <UpdateButton onClick={onUpdate}   />
      </div>
    </div>
  );
};


const ComponentGeneros = ({generos,onEliminar, onSelectGenero}: {generos: interfaceGeneros;onEliminar: () => void; onSelectGenero: (genero: interfaceGeneros) => void;}) => {
  return (
    <div className="bg-white rounded-md shadow-md overflow-hidden relative" onClick={() => onSelectGenero(generos)}> 
      <EliminarButton onEliminar={onEliminar} />
      <div className="p-2">
        <h3 className="w-full font-semibold text-sm text-center">{generos.name}</h3>
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
const crearPelicula = (name: string, year: string, filmPoster: string, genero: string, setPeliculas: React.Dispatch<React.SetStateAction<interfacePelicula[]>>) => {
  const nuevaPelicula = {
    name,
    year: parseInt(year),  // Convertimos el año a número
    image: filmPoster,  // URL del poster
    genero: genero,
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
  id
: number,
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

// aqui definimos la colección pelicula para evitar errores posteriores en typescript.
interface interfacePelicula {
  id: number;
  image: string;
  name: string;
  year: number;
  genero: string;
}

interface interfaceGeneros {
  id:number;
  name:string;
}

export default App;
