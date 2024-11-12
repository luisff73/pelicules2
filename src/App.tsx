import { useState } from "react"; // Importamos los hooks useState y useEffect
import './index.css';  // Importamos el fichero de estilos css personalizado que carga los estilos de tailwind.
import FormNewFilm from './FormNewFilm.tsx';
import GridFilms from './GridFilms.tsx';
import GridFilmsGeneros from "./GridFilmsGeneros.tsx";
import {AgregarGenero, crearGenero} from './AgregarGenero.tsx';

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

        {/* Cargamos el componente FormNewFilm del fichero.tsx que es un Formulario para crear o actualizar películas y le pasamos los parametros setPeliculas y peliccula seleccionada*/}
        
        <FormNewFilm 
          setPeliculas={setPeliculas} 
          peliculaSeleccionada={peliculaSeleccionada} // Le pasamos la película seleccionada si está en edición
          generoSeleccionado={generoSeleccionado} // Pasa la prop del genero seleccionado
        />

        <AgregarGenero 
        setGeneros={setGeneros} 
        crearGenero={crearGenero} 
        />

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

// aqui definimos y exportamos la colección pelicula para evitar errores posteriores en typescript.
export interface interfacePelicula {
  id: number;
  image: string;
  name: string;
  year: number;
  genero: string;
}

export interface interfaceGeneros {
  id:number;
  name:string;
}

export default App;
