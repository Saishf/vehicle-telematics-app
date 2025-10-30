const express = require("express");
const router = express.Router();
const db = require("../db");

// Fetch all vehicles
router.get("/", (req, res) => {
  const sql = "SELECT * FROM vehicles";
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("❌ Error fetching data:", err.message);
      res.status(400).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

//  Ingest vehicle data
router.post("/ingest", (req, res) => {
  const {
    type,
    name,
    model,
    manufacturedDate,
    fuelType,
    bhp,
    torque,
    fuelLevel,
    batteryLevel,
    latitude,
    longitude,
    uniqueParts,
  } = req.body;

  if (!type || !name || !model || !manufacturedDate || !fuelType) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const location = `${latitude}, ${longitude}`;
  const partsJson = JSON.stringify(uniqueParts || []);

  db.run(
    `INSERT INTO vehicles 
      (type, name, model, manufacturedDate, fuelType, bhp, torque, fuelLevel, batteryLevel, location, uniqueParts)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      type,
      name,
      model,
      manufacturedDate,
      fuelType,
      bhp,
      torque,
      fuelLevel,
      batteryLevel,
      location,
      partsJson,
    ],
    function (err) {
      if (err) {
        console.error("❌ DB insert error:", err.message);
        return res.status(500).json({ error: "Database error" });
      }
      console.log("✅ Vehicle inserted successfully!");
      res.json({ success: true, id: this.lastID });
    }
  );
});

module.exports = router;
