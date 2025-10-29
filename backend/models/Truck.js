const Vehicle = require("./vehicle");

class Truck extends Vehicle {
  constructor(
    name,
    model,
    manufacturedDate,
    bhp,
    torque,
    fuelLevel,
    latitude,
    longitude
  ) {
    super(
      "Truck",
      name,
      model,
      manufacturedDate,
      "diesel",
      bhp,
      torque,
      latitude,
      longitude
    );
    this.fuelLevel = fuelLevel;
    this.uniqueParts = ["glow plugs", "ICE (Internal Combustion Engine)"];
  }

  displayInfo() {
    return `🚛 Truck: ${this.name} (${this.model}) | Fuel: ${
      this.fuelLevel
    }% | BHP: ${this.bhp} | Torque: ${
      this.torque
    } Nm | Location: (${this.latitude.toFixed(4)}, ${this.longitude.toFixed(
      4
    )})`;
  }
}

module.exports = Truck;
