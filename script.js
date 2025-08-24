const carList = document.getElementById("carList");
const statusFilter = document.getElementById("statusFilter");
const searchInput = document.getElementById("searchInput");
const fuelFilter = document.getElementById("fuelFilter");
const priceFilter = document.getElementById("priceFilter");
const sortFilter = document.getElementById("sortFilter");

function displayCars(filteredCars) {
  carList.innerHTML = "";

  filteredCars.forEach(car => {
carList.innerHTML += `
  <div class="col-md-4">
    <div class="card mb-3 shadow-sm">
    <div class="card position-relative h-100 shadow-sm">
  <span class="badge-status">${car.status}</span>
      <img src="${car.image}" class="card-img-top" alt="${car.model}">
      <div class="card-body">
        <h5 class="card-title">${car.brand} ${car.model}</h5>
        <p class="card-text">${car.year} • ${car.fuel} • ${car.status}</p>
        <p class="fw-bold">${car.price.toLocaleString()} kr</p>
        <button class="btn btn-outline-primary" onclick="showCarDetails(${car.id})">Mer info</button>
      </div>
    </div>
    </div>
  </div>
`;
  });
}

function filterCars() {
  const statusValue = statusFilter.value;
  const fuelValue = fuelFilter.value;
  const maxPrice = priceFilter.value;
  const searchValue = searchInput.value.toLowerCase();

  const filtered = cars.filter(car => {
    const matchStatus = statusValue ? car.status === statusValue : true;
    const matchFuel = fuelValue ? car.fuel === fuelValue : true;
    const matchPrice = maxPrice ? car.price <= parseInt(maxPrice) : true;
    const matchSearch = car.model.toLowerCase().includes(searchValue);
    return matchStatus && matchFuel && matchPrice && matchSearch;
  });

    // Sortera resultatet
  const sortValue = sortFilter.value;
  if (sortValue === "priceLowHigh") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === "priceHighLow") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortValue === "yearNewOld") {
    filtered.sort((a, b) => b.year - a.year);
  } else if (sortValue === "yearOldNew") {
    filtered.sort((a, b) => a.year - b.year);
  }
  displayCars(filtered);
}

function showCarDetails(id) {
  const car = cars.find(c => c.id === id);

  document.getElementById("carModalTitle").textContent = `${car.brand} ${car.model}`;

document.getElementById("carModalBody").innerHTML = `
  <div class="row">
    <div class="col-md-6">
      <img src="${car.image}" class="img-fluid rounded shadow mb-3">
    </div>
    <div class="col-md-6">
      <h4 class="fw-bold mb-3">${car.brand} ${car.model}</h4>
      <p><strong>År:</strong> ${car.year}</p>
      <p><strong>Pris:</strong> ${car.price.toLocaleString()} kr</p>
      <p><strong>Bränsle:</strong> ${car.fuel}</p>
      <p><strong>Status:</strong> ${car.status}</p>
      <p class="mt-3"><em>${car.description}</em></p>
      <button class="btn btn-primary w-100 mt-3">Boka provkörning</button>
    </div>
  </div>
`;
  const modal = new bootstrap.Modal(document.getElementById("carModal"));
  modal.show();
}

// Init
displayCars(cars);

// Event listeners
statusFilter.addEventListener("change", filterCars);
searchInput.addEventListener("input", filterCars);
fuelFilter.addEventListener("change", filterCars);
priceFilter.addEventListener("input", filterCars);
sortFilter.addEventListener("change", filterCars);