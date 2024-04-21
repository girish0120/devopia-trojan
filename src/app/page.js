import React, { useState } from "react";

function Home() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState(null);

  const apiKey = process.env.GOOGLE_API_KEY;

  const handleGetDirections = () => {
    const request = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        setDirections(data);
      })
      .catch((error) => {
        console.error("Error fetching directions:", error);
      });
  };

  return (
    <div className="App">
      <h1>Directions App</h1>
      <div>
        <label>Origin:</label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </div>
      <div>
        <label>Destination:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <button onClick={handleGetDirections}>Get Directions</button>

      {directions && (
        <div>
          <h2>Directions:</h2>
          <ul>
            {directions.routes[0].legs[0].steps.map((step, index) => (
              <li key={index}>{step.html_instructions}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
