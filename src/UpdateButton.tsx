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
export default UpdateButton