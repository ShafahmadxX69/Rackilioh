let currentLevel = 1;

// Buat peta rak saat load
window.onload = () => {
  renderRacks();
};

// Ganti level
function changeLevel(level) {
  currentLevel = level;
  renderRacks();
}

// Render rak 1.1A - 1.12H
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

  alert(`Saved:\nRack: ${rack}\nPO: ${po}\nMaterial: ${material}\nSize: ${size}\nColor: ${color}\nQTY: ${qty}`);
  
  this.reset();
  document.querySelectorAll(".rack").forEach(r => r.classList.remove("selected"));
});
