# RideNow API (Node / Express)

Mock backend for the **RideNow** ride-hailing demo (`apps/uber-clone`).

The React app tries to reach this API first and falls back to built-in mock data if
it's not running, so the app works on GitHub Pages with or without the server.

## Run it

```bash
cd api/uber-api
npm.cmd install
npm.cmd start   # → http://localhost:3001
```

## Endpoints

| Method | Path              | Description                              |
| ------ | ----------------- | ---------------------------------------- |
| GET    | `/api/vehicles`   | Available ride options with prices       |
| GET    | `/api/estimate`   | Fare estimate per vehicle (`?dist=8`)    |
| POST   | `/api/ride`       | Book a ride, returns assigned driver     |
| GET    | `/api/history`    | List of rides created in this session    |