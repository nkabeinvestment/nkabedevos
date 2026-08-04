# StudyMate API (Node / Express)

Mock backend for the **StudyMate** tutor-student connect demo (`apps/tutor-connect`).

The React app tries to reach this API first and falls back to built-in mock data if
it's not running, so the app works on GitHub Pages with or without the server.

## Run it

```bash
cd api/tutor-api
npm.cmd install
npm.cmd start   # → http://localhost:3002
```

## Endpoints

| Method | Path                | Description                                  |
| ------ | ------------------- | -------------------------------------------- |
| GET    | `/api/subjects`     | List of subjects                             |
| GET    | `/api/tutors`       | All tutors (`?subject=Mathematics` to filter)|
| GET    | `/api/tutors/:id`   | Single tutor profile                         |
| POST   | `/api/bookings`     | Create a booking request                     |
| GET    | `/api/bookings`     | List bookings (`?tutor=t1` or `?student=`…)  |
| PATCH  | `/api/bookings/:id` | Update booking status (`pending/confirmed/declined`) |