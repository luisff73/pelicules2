import EliminarButton from './EliminarButton.tsx'; 
import UpdateButton from './UpdateButton.tsx'; 
import { interfacePelicula } from "./App";

// Componente para cada película que muestra sus detalles y botones
export const ComponentFilm = ({ pelicula, onEliminar, onUpdate }: { pelicula: interfacePelicula; onEliminar: () => void; onUpdate: () => void }) => {
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

  export default ComponentFilm;