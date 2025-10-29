const sqlite3 = require("sqlite3").verbose();

const DBSOURCE = "vehicle_telematics.db";

let db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database.");

    db.run(
      `CREATE TABLE IF NOT EXISTS vehicles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT,
        name TEXT,
        model TEXT,
        manufacturedDate TEXT,
        fuelType TEXT,
        bhp INTEGER,
        torque INTEGER,
        fuelLevel INTEGER,
        batteryLevel INTEGER,
        location TEXT,
        uniqueParts TEXT
      )`,
      (err) => {
        if (err) {
          console.error("Error creating table:", err.message);
        } else {
          console.log("🚗 Vehicle table ready with detailed specs.");
        }
      }
    );
  }
});

module.exports = db;
