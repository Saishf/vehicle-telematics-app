const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
const vehicleRoutes = require("./routes/vehicleRoutes"); // ✅ import route file

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ register all vehicle routes under /api/vehicles
app.use("/api/vehicles", vehicleRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Vehicle Telematics API Running 🚗");
});
