const API = "http://localhost:5000";
const STEPS = [
  "GitHub PR merged",
  "Changelog updated",
  "Tests passing",
  "Release created",
  "Deployed to demo",
  "Tested in demo",
  "Deployed to production"
];

let releases = [];
let current = null;

async function load() {
  const res = await fetch(`${API}/releases`);
  releases = await res.json();
  renderTable();
}

function renderTable() {
  const table = document.getElementById("table");

  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Date</th>
      <th>Status</th>
      <th>Actions</th>
    </tr>
  `;

  releases.forEach(r => {
    table.innerHTML += `
      <tr>
        <td>${r.name}</td>
        <td>${new Date(r.date).toLocaleDateString()}</td>
        <td>${r.status}</td>
        <td>
          <button onclick="view(${r.id})">View</button>
          <button onclick="del(${r.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function showCreate() {
  current = null;
  showDetail({
    name: "",
    date: "",
    info: "",
    steps: new Array(STEPS.length).fill(false)
  });
}

function view(id) {
  current = releases.find(r => r.id === id);
  showDetail(current);
}

function showDetail(data) {
  document.getElementById("listView").classList.add("hidden");
  const div = document.getElementById("detailView");
  div.classList.remove("hidden");

  div.innerHTML = `
    <h2>${current ? "Edit" : "New"} Release</h2>

    Name:<br>
    <input id="name" value="${data.name || ""}"><br><br>

    Date:<br>
    <input id="date" type="date"
      value="${data.date ? data.date.split("T")[0] : ""}"><br><br>

    ${STEPS.map((s, i) => `
      <label>
        <input type="checkbox" ${data.steps[i] ? "checked" : ""}
          onchange="toggleStep(${i})">
        ${s}
      </label><br>
    `).join("")}

    <br>
    Additional info:<br>
    <textarea id="info">${data.info || ""}</textarea><br><br>

    <button onclick="save()">Save</button>
    <button onclick="back()">Back</button>
  `;
}

function toggleStep(i) {
  current.steps[i] = !current.steps[i];
}

async function save() {
  const payload = {
    name: document.getElementById("name").value,
    date: document.getElementById("date").value,
    info: document.getElementById("info").value,
    steps: current?.steps || new Array(STEPS.length).fill(false)
  };

  if (current?.id) {
    await fetch(`${API}/releases/${current.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  } else {
    await fetch(`${API}/releases`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
  }

  back();
  load();
}

async function del(id) {
  await fetch(`${API}/releases/${id}`, { method: "DELETE" });
  load();
}

function back() {
  document.getElementById("detailView").classList.add("hidden");
  document.getElementById("listView").classList.remove("hidden");
}

load();