const Vehicle = require("./vehicle");

class EV extends Vehicle {
  constructor(
    name,
    model,
    manufacturedDate,
    bhp,
    torque,
    batteryLevel,
    latitude,
    longitude
  ) {
    super(
      "EV",
      name,
      model,
      manufacturedDate,
      "EV",
      bhp,
      torque,
      latitude,
      longitude
    );
    this.batteryLevel = batteryLevel;
    this.uniqueParts = ["motor", "battery pack", "controller"];
  }

  displayInfo() {
    return `⚡ EV: ${this.name} (${this.model}) | Battery: ${
      this.batteryLevel
    }% | BHP: ${this.bhp} | Torque: ${
      this.torque
    } Nm | Location: (${this.latitude.toFixed(4)}, ${this.longitude.toFixed(
      4
    )})`;
  }
}

module.exports = EV;
