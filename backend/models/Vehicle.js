class Vehicle {
  constructor(
    type,
    name,
    model,
    manufacturedDate,
    fuelType,
    bhp,
    torque,
    latitude,
    longitude
  ) {
    this.type = type;
    this.name = name;
    this.model = model;
    this.manufacturedDate = manufacturedDate;
    this.fuelType = fuelType;
    this.bhp = bhp;
    this.torque = torque;
    this.latitude = latitude;
    this.longitude = longitude;
    this.uniqueParts = [];
  }

  displayInfo() {
    return `${this.type} - ${this.model} (${this.fuelType}), ${this.bhp}BHP, ${this.torque}Nm`;
  }
}

module.exports = Vehicle;
