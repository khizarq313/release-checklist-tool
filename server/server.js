import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

const STEPS_COUNT = 7;

function computeStatus(steps) {
  const done = steps.filter(Boolean).length;
  if (done === 0) return "planned";
  if (done === STEPS_COUNT) return "done";
  return "ongoing";
}

app.get("/releases", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM releases ORDER BY date DESC"
  );
  res.json(rows);
});

app.post("/releases", async (req, res) => {
  const { name, date, info } = req.body;

  const steps = new Array(STEPS_COUNT).fill(false);
  const status = computeStatus(steps);

  const { rows } = await pool.query(
    `INSERT INTO releases (name, date, info, steps, status)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [name, date, info || "", steps, status]
  );

  res.json(rows[0]);
});

app.put("/releases/:id", async (req, res) => {
  const { steps, info } = req.body;
  const status = computeStatus(steps);

  const { rows } = await pool.query(
    `UPDATE releases
     SET steps=$1, info=$2, status=$3
     WHERE id=$4 RETURNING *`,
    [steps, info, status, req.params.id]
  );

  res.json(rows[0]);
});

app.delete("/releases/:id", async (req, res) => {
  await pool.query("DELETE FROM releases WHERE id=$1", [
    req.params.id
  ]);
  res.json({ success: true });
});

app.listen(5000, () =>
  console.log("✅ API running on http://localhost:5000")
);