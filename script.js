let currentLevel = 1;
let storedItems = [];

// Buat denah rak
window.onload = () => {
  renderRacks();
};

// Ganti level
function changeLevel(level) {
  currentLevel = level;
  renderRacks();
}

// Render rak A-H, 12 kolom
function renderRacks() {
  const rackMap = document.getElementById("rack-map");
  rackMap.innerHTML = "";

  const rows = ["A","B","C","D","E","F","G","H"];

  rows.forEach(row => {
    for (let i=1; i<=12; i++) {
      const rackId = `${currentLevel}.${i}${row}`;
      const div = document.createElement("div");
      div.classList.add("rack");
      div.innerText = rackId;
      div.onclick = () => selectRack(rackId, div);
      rackMap.appendChild(div);
    }
  });
}

// Pilih rak
function selectRack(rackId, element) {
  document.querySelectorAll(".rack").forEach(r => r.classList.remove("selected"));
  element.classList.add("selected");
  document.getElementById("selectedRack").value = rackId;
}

// Simpan item
document.getElementById("itemForm").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const rack = document.getElementById("selectedRack").value;
  if (!rack) {
    alert("Please select a rack first!");
    return;
  }

  const po = document.getElementById("po").value;
  const material = document.getElementById("material").value;
  const size = document.getElementById("size").value;
  const color = document.getElementById("color").value;
  const qty = document.getElementById("qty").value;

  // Simpan data ke array
  storedItems.push({ rack, po, material, size, color, qty });

  alert(`Saved to ${rack}`);

  this.reset();
  document.querySelectorAll(".rack").forEach(r => r.classList.remove("selected"));
});

// Toggle section
function showSection(section) {
  document.getElementById("input-section").classList.add("hidden");
  document.getElementById("check-section").classList.add("hidden");

  if (section === "input") {
    document.getElementById("input-section").classList.remove("hidden");
  } else if (section === "check") {
    document.getElementById("check-section").classList.remove("hidden");
    renderTable();
  }
}

// Render tabel items
function renderTable() {
  const tbody = document.getElementById("itemsTable");
  tbody.innerHTML = "";

  storedItems.forEach(item => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.rack}</td>
      <td>${item.po}</td>
      <td>${item.material}</td>
      <td>${item.size}</td>
      <td>${item.color}</td>
      <td>${item.qty}</td>
    `;
    tbody.appendChild(tr);
  });
}
