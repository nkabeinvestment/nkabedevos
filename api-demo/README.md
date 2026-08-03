# API Demo (Node / Express)

A small backend sample you can run **locally**. Because GitHub Pages only serves static
files, this API is not hosted on the live site — it's here to show your backend skills
in a call or when sharing code.

## Run it

1. Install dependencies:

   ```bash
   npm install
   ```

   (On Windows, if `npm` is blocked, use `npm.cmd install`.)

2. Start the server:

   ```bash
   npm start
   ```

3. Open http://localhost:3000 — you'll see the JSON overview.

## Endpoints

| Method | Path                | Description                    |
| ------ | ------------------- | ------------------------------ |
| GET    | `/`                 | API overview                   |
| GET    | `/api/projects`     | List all projects              |
| GET    | `/api/projects/:id` | Get a single project by ID     |
| POST   | `/api/visit`        | Increment and return visit count |

Try these in a browser or with `Invoke-RestMethod` / `curl`.