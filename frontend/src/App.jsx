import { useEffect, useState } from "react";

// 🔹 Small reusable progress bar component
const ProgressBar = ({ value, color }) => (
  <div className="w-full bg-gray-700 rounded-full h-2">
    <div
      className={`h-2 rounded-full transition-all duration-300 ${color}`}
      style={{ width: `${value}%` }}
    ></div>
  </div>
);

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch vehicle data from backend
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        "https://vehicle-telematics-app.onrender.com/api/vehicles"
      );
      const data = await res.json();
      setVehicles(data.reverse()); // newest first
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Error fetching vehicles:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🕒 Auto refresh every 30 seconds + on initial load
  useEffect(() => {
    fetchVehicles(); // Initial load
    const interval = setInterval(fetchVehicles, 5000); // 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const typeColors = {
    Truck: "bg-orange-500",
    Car: "bg-blue-500",
    Bike: "bg-purple-500",
    EV: "bg-green-500",
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          🚘 Vehicle Telematics Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-400">
            Last Updated:{" "}
            <span className="text-gray-200 font-medium">{lastUpdated}</span>
          </p>
          <button
            onClick={fetchVehicles}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                Refreshing...
              </>
            ) : (
              "Refresh"
            )}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-gray-800 rounded-2xl shadow-lg">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
            <tr>
              {[
                "ID",
                "Type",
                "Name",
                "Model",
                "Manufactured",
                "Fuel Type",
                "BHP",
                "Torque",
                "Fuel Level",
                "Battery Level",
                "Location",
                "Unique Parts",
              ].map((header) => (
                <th key={header} className="p-3 border-b border-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr
                key={v.id}
                className="border-b border-gray-700 hover:bg-gray-700/40 transition"
              >
                <td className="p-3">{v.id}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      typeColors[v.type] || "bg-gray-500"
                    }`}
                  >
                    {v.type}
                  </span>
                </td>
                <td className="p-3 font-semibold text-blue-400 hover:underline cursor-pointer">
                  {v.name}
                </td>
                <td className="p-3">{v.model}</td>
                <td className="p-3">{v.manufacturedDate}</td>
                <td className="p-3">{v.fuelType}</td>
                <td className="p-3">{v.bhp}</td>
                <td className="p-3">{v.torque}</td>

                {/* Fuel Level */}
                <td className="p-3">
                  {v.fuelLevel != null ? (
                    <>
                      <p className="text-xs text-gray-400">{v.fuelLevel}%</p>
                      <ProgressBar
                        value={v.fuelLevel}
                        color={
                          v.fuelLevel > 60
                            ? "bg-green-500"
                            : v.fuelLevel > 30
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }
                      />
                    </>
                  ) : (
                    "—"
                  )}
                </td>

                {/* Battery Level */}
                <td className="p-3">
                  {v.batteryLevel != null ? (
                    <>
                      <p className="text-xs text-gray-400">{v.batteryLevel}%</p>
                      <ProgressBar
                        value={v.batteryLevel}
                        color={
                          v.batteryLevel > 60
                            ? "bg-green-500"
                            : v.batteryLevel > 30
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }
                      />
                    </>
                  ) : (
                    "—"
                  )}
                </td>

                <td className="p-3">{v.location}</td>
                <td className="p-3 text-gray-300">
                  {Array.isArray(v.uniqueParts)
                    ? v.uniqueParts.join(", ")
                    : v.uniqueParts}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Auto-refreshes every 5 seconds 🔁
      </p>
    </div>
  );
}

export default App;
