import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(""); // Estado de error

  // Consumiendo la API con fetch
  useEffect(() => {
    setLoading(true); // Indicamos que la carga está en progreso
    fetch("examenrichi.duckdns.org/api/pets")

      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la respuesta de la API");
        }
        return response.json();
      })
      .then((data) => {
        setPets(data); // Guardamos los datos obtenidos
        setLoading(false); // Indicamos que la carga ha terminado
      })
      .catch((error) => {
        setError("Hubo un error al obtener los datos: " + error.message);
        setLoading(false); // Indicamos que la carga ha terminado incluso si hubo error
      });
  }, []);

  return (
    <div className="App">
      <h1>Gestión de Mascotas</h1>

      {/* Mostrar mensaje de carga */}
      {loading && <p>Cargando...</p>}

      {/* Mostrar error si ocurre */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Mostrar las mascotas */}
      <ul>
        {pets.map((pet, index) => (
          <li key={index}>{`${pet.name} - ${pet.raza} - ${pet.edad} años`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
