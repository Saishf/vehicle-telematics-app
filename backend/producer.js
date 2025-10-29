const axios = require("axios");

const types = ["Car", "Truck", "Bike", "EV"];
const fuelTypes = {
  Car: "petrol",
  Truck: "diesel",
  Bike: "petrol",
  EV: "electric",
};

const models = {
  Car: ["Honda City", "Toyota Camry", "Hyundai i20"],
  Truck: ["Tata Prima", "Ashok Leyland 3718"],
  Bike: ["Yamaha MT15", "Royal Enfield Classic"],
  EV: ["Tesla Model 3", "Tata Nexon EV"],
};

function randomCoord(base) {
  return base + (Math.random() - 0.5) * 0.1;
}

async function sendData() {
  const type = types[Math.floor(Math.random() * types.length)];
  const model = models[type][Math.floor(Math.random() * models[type].length)];

  const payload = {
    type,
    name: `${type}-${Math.floor(Math.random() * 1000)}`,
    model,
    manufacturedDate: "2021-07-01",
    fuelType: fuelTypes[type],
    bhp: Math.floor(80 + Math.random() * 200),
    torque: Math.floor(100 + Math.random() * 300),
    fuelLevel: type === "EV" ? null : Math.floor(Math.random() * 100),
    batteryLevel: type === "EV" ? Math.floor(Math.random() * 100) : null,
    latitude: randomCoord(18.5204),
    longitude: randomCoord(73.8567),
    uniqueParts:
      type === "Car"
        ? ["spark plugs", "carburetor"]
        : type === "Truck"
        ? ["glow plugs", "diesel injector"]
        : type === "Bike"
        ? ["spark plugs"]
        : ["motor", "battery pack", "controller"],
  };

  try {
    await axios.post("http://localhost:4000/api/vehicles/ingest", payload);
    console.log(`✅ Sent ${payload.type} (${payload.name})`);
  } catch (err) {
    console.error("❌ Error sending data:", err.message);
  }
}

setInterval(sendData, 4000);
