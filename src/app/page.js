"use client"
// import React, { useState } from "react";

// export default function Home() {
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [directions, setDirections] = useState(null);

//   const apiKey = "AIzaSyBbhcu_9r_b9h-fwACLlCvsuOpVmHJ00-I";

//   const handleGetDirections = () => {
//     const request = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

//     fetch(request)
//       .then((response) => response.json())
//       .then((data) => {
//         setDirections(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching directions:", error);
//       });
//   };
  

//   return (
//     <div className="App">
//       <h1>Directions App</h1>
//       <div>
//         <label>Origin:</label>
//         <input
//           type="text"
//           value={origin}
//           onChange={(e) => setOrigin(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Destination:</label>
//         <input
//           type="text"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//       </div>
//       <button onClick={handleGetDirections}>Get Directions</button>

//       {directions && (
//         <div>
//           <h2>Directions:</h2>
//           <ul>
//             {directions.routes[0].legs[0].steps.map((step, index) => (
//               <li key={index}>{step.html_instructions}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useState, useEffect } from "react";

// export default function Home() {
//   const [origin, setOrigin] = useState("");
//   const [destination, setDestination] = useState("");
//   const [directionsRenderer, setDirectionsRenderer] = useState(null);
//   const [map, setMap] = useState(null);
//   const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);

//   const apiKey = "AIzaSyBbhcu_9r_b9h-fwACLlCvsuOpVmHJ00-I";

//   useEffect(() => {
//     if (!googleMapsLoaded) {
//       const script = document.createElement("script");
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
//       script.onload = () => setGoogleMapsLoaded(true);
//       document.body.appendChild(script);
//     }
//   }, [googleMapsLoaded, apiKey]);

//   useEffect(() => {
//     if (map && !directionsRenderer) {
//       const renderer = new window.google.maps.DirectionsRenderer();
//       renderer.setMap(map);
//       setDirectionsRenderer(renderer);
//     }
//   }, [map, directionsRenderer]);

//   const handleGetDirections = () => {
//     if (!origin || !destination) {
//       alert("Please enter both origin and destination.");
//       return;
//     }

//     const directionsService = new window.google.maps.DirectionsService();
//     directionsService.route(
//       {
//         origin: origin,
//         destination: destination,
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       },
//       (response, status) => {
//         if (status === "OK") {
//           directionsRenderer.setDirections(response);
//         } else {
//           console.error("Directions request failed due to " + status);
//         }
//       }
//     );
//   };

//   const handleMapLoaded = (mapInstance) => {
//     setMap(mapInstance);
//   };

//   return (
//     <div className="App">
//       <h1>Directions App</h1>
//       <div>
//         <label>Origin:</label>
//         <input
//           type="text"
//           value={origin}
//           onChange={(e) => setOrigin(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Destination:</label>
//         <input
//           type="text"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />
//       </div>
//       <button onClick={handleGetDirections}>Get Directions</button>

//       {googleMapsLoaded && (
//         <div
//           style={{ width: "100%", height: "400px", marginTop: "20px" }}
//           ref={(mapElement) => {
//             if (mapElement && !map) {
//               const mapInstance = new window.google.maps.Map(mapElement, {
//                 center: { lat: 0, lng: 0 },
//                 zoom: 2,
//               });
//               setMap(mapInstance);
//             }
//           }}
//         ></div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";

export default function Home() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [map, setMap] = useState(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const apiKey = "AIzaSyBbhcu_9r_b9h-fwACLlCvsuOpVmHJ00-I";

  useEffect(() => {
    if (!googleMapsLoaded) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.onload = () => setGoogleMapsLoaded(true);
      document.body.appendChild(script);
    }
  }, [googleMapsLoaded, apiKey]);

  useEffect(() => {
    if (googleMapsLoaded && !map) {
      const mapInstance = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 0, lng: 0 },
        zoom: 2,
      });
      setMap(mapInstance);
    }
  }, [googleMapsLoaded, map]);

  useEffect(() => {
    if (map && !directionsRenderer) {
      const renderer = new window.google.maps.DirectionsRenderer();
      renderer.setMap(map);
      setDirectionsRenderer(renderer);
    }
  }, [map, directionsRenderer]);

  const handleGetDirections = () => {
    if (!origin || !destination) {
      alert("Please enter both origin and destination.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
        } else {
          console.error("Directions request failed due to " + status);
        }
      }
    );
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

      <div
        id="map"
        style={{ width: "100%", height: "400px", marginTop: "20px" }}
      >
        Loading map...
      </div>
    </div>
  );
}
