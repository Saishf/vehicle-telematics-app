const Vehicle = require("./vehicle");

class Bike extends Vehicle {
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
      "Bike",
      name,
      model,
      manufacturedDate,
      "petrol",
      bhp,
      torque,
      latitude,
      longitude
    );
    this.fuelLevel = fuelLevel;
    this.uniqueParts = ["spark plugs", "carburetor"];
  }

  displayInfo() {
    return `🏍️ Bike: ${this.name} (${this.model}) | Fuel: ${
      this.fuelLevel
    }% | BHP: ${this.bhp} | Torque: ${
      this.torque
    } Nm | Location: (${this.latitude.toFixed(4)}, ${this.longitude.toFixed(
      4
    )})`;
  }
}

module.exports = Bike;
