const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const VEHICLES = [
  { id: "x", name: "Ride X", cap: 4, eta: 3, price: 12.5, icon: "🚗", desc: "Affordable everyday rides" },
  { id: "comfort", name: "Comfort", cap: 4, eta: 5, price: 18.0, icon: "🚘", desc: "Newer cars, extra legroom" },
  { id: "xl", name: "XL", cap: 6, eta: 7, price: 26.0, icon: "🚙", desc: "Room for 6, great for groups" },
];

const DRIVER_POOL = [
  { name: "Dennis M.", car: "Toyota Corolla · Silver", plate: "KCL 123A", rating: 4.9 },
  { name: "Grace A.", car: "Honda Fit · White", plate: "KDK 451B", rating: 4.8 },
  { name: "Samuel K.", car: "Mazda 3 · Black", plate: "KCG 782C", rating: 4.7 },
];

const rides = [];
let nextId = 1;

app.get("/", (_req, res) => {
  res.json({ message: "RideNow mock API", endpoints: ["/api/vehicles", "/api/estimate", "/api/ride", "/api/history"] });
});

app.get("/api/vehicles", (_req, res) => {
  res.json(VEHICLES);
});

app.get("/api/estimate", (req, res) => {
  const dist = Number(req.query.dist) || 5;
  const estimates = VEHICLES.map((v) => ({
    ...v,
    estimate: (v.price * (0.8 + dist * 0.12)).toFixed(2),
  }));
  res.json({ distanceKm: dist, vehicles: estimates });
});

app.post("/api/ride", (req, res) => {
  const { destination, vehicleId } = req.body || {};
  const vehicle = VEHICLES.find((v) => v.id === vehicleId) || VEHICLES[0];
  const driver = DRIVER_POOL[Math.floor(Math.random() * DRIVER_POOL.length)];
  const ride = {
    id: "RID-" + String(nextId++).padStart(4, "0"),
    destination: destination || "Unknown",
    vehicle,
    driver,
    fare: vehicle.price,
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  rides.unshift(ride);
  res.status(201).json(ride);
});

app.get("/api/history", (_req, res) => {
  res.json(rides);
});

app.listen(PORT, () => {
  console.log(`RideNow API running on http://localhost:${PORT}`);
});
