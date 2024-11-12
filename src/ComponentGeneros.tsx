import EliminarButton from './EliminarButton.tsx'; 
import { interfaceGeneros } from './App';

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

  export default ComponentGeneros;