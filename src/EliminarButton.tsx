
// Botón de eliminar
function EliminarButton({ onEliminar }: { onEliminar: () => void }) {
    return (
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onEliminar}  // Llamamos a la función eliminar cuando se hace click
          className="absolute right-2 text-white hover:bg-blue-600 hover:text-white rounded-full p-1"
        >
          X
        </button>
      </div>
    );
  }

  export default EliminarButton;