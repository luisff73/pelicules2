import React, { useState } from 'react';
import { interfaceGeneros } from './App';

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

const AgregarGenero = ({ setGeneros, crearGenero }: { 
  setGeneros: React.Dispatch<React.SetStateAction<interfaceGeneros[]>>; 
  crearGenero: (name: string, setGeneros: React.Dispatch<React.SetStateAction<interfaceGeneros[]>>) => void 
}) => {
  const [nombreGenero, setNombreGenero] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nombreGenero) {
      crearGenero(nombreGenero, setGeneros);
      setNombreGenero("");
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

export { AgregarGenero, crearGenero };

