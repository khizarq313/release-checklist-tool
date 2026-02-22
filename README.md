# 🚀 Release Checklist Tool

A simple full-stack single-page application that helps developers manage and track release readiness using a checklist.

The application allows users to create releases, track step completion, and automatically compute release status.

---

## ✨ Features

* View all releases
* Create a new release
* Check/uncheck release steps
* Auto-computed release status
* Update additional information
* Delete a release
* Single Page Application (SPA)
* Clean and responsive UI

---

## 🛠 Tech Stack

### Frontend

* HTML
* CSS
* Vanilla JavaScript

### Backend

* Node.js
* Express.js
* PostgreSQL (pg)
* dotenv
* cors

### Database

* PostgreSQL (hosted on Supabase)

---

## 🧠 Status Logic

Release status is automatically computed:

* **planned** → no steps completed
* **ongoing** → at least one step completed
* **done** → all steps completed

Users cannot manually set the status.

---

## 📦 Project Structure

```
release-checklist/
├── server/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   └── .env
├── client/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── README.md
```

---

# ⚙️ Setup Instructions (Run Locally)

## 1️⃣ Clone the repository

```
git clone <your-repo-url>
cd release-checklist
```

---

## 2️⃣ Database Setup (PostgreSQL)

Create the table using the following SQL:

```sql
CREATE TABLE releases (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  date TIMESTAMP NOT NULL,
  status TEXT NOT NULL,
  info TEXT,
  steps BOOLEAN[] NOT NULL
);
```

---

## 3️⃣ Backend Setup

Navigate to the server folder:

```
cd server
npm install
```

Create a `.env` file inside `server/`:

```
DATABASE_URL=your_postgresql_connection_string
```

Start the backend:

```
npm start
```

Server will run at:

```
http://localhost:5000
```

---

## 4️⃣ Frontend Setup

Open the client folder and run using Live Server (recommended):

* Open `client/index.html` in VS Code
* Click **Open with Live Server**

OR simply open the file in a browser.

---

# 🔌 API Endpoints

## Get all releases

```
GET /releases
```

**Response:** Array of release objects

---

## Create a new release

```
POST /releases
```

**Body:**

```json
{
  "name": "Release name",
  "date": "2026-02-22",
  "info": "Optional notes"
}
```

---

## Update release (steps or info)

```
PUT /releases/:id
```

**Body:**

```json
{
  "steps": [true, false, true],
  "info": "Updated info"
}
```

---

## Delete a release

```
DELETE /releases/:id
```

---

# 🗄 Database Schema

## Table: `releases`

| Column | Type        | Description             |
| ------ | ----------- | ----------------------- |
| id     | SERIAL (PK) | Unique release ID       |
| name   | TEXT        | Release name (required) |
| date   | TIMESTAMP   | Release date (required) |
| status | TEXT        | Auto-computed status    |
| info   | TEXT        | Additional information  |
| steps  | BOOLEAN[]   | Step completion states  |

---

# 🚀 Deployment

* Backend: Render
* Database: Supabase
* Frontend: GitHub Pages / Netlify

---

# 👨‍💻 Notes

* This is a single-user application
* Steps are fixed for every release
* Status is computed automatically on the server
* No authentication is required

---

**Author:** Khizar Qureshi
**Role:** Full Stack Developer (Assignment Project)
