import React, { useEffect, useState } from "react";
import axios from "axios";

const VehicleTable = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/vehicles");
        setVehicles(res.data);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
      }
    };

    fetchVehicles();
    const interval = setInterval(fetchVehicles, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🚗 Vehicle Telematics Dashboard</h2>
      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>ID</th>
            <th>Type</th>
            <th>Speed</th>
            <th>Fuel Level</th>
            <th>Battery</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.type}</td>
              <td>{v.speed}</td>
              <td>{v.fuel_level}</td>
              <td>{v.battery_level}</td>
              <td>{v.latitude}</td>
              <td>{v.longitude}</td>
              <td>{v.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleTable;
