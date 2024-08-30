// === Select Element === //
// === inputs Ele
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let catagery = document.getElementById("catagery");
let total = document.getElementById("total");
let createBtn = document.getElementById("submit");
let mood = "create";
let temp;
let search = document.getElementById("search");
// === inputs Func
function getPrice() {
  if (price.value !== "" && +price.value > 0) {
    let res = +price.value + +ads.value + +taxes.value - +discount.value;
    total.innerHTML = res; // add price to GUI
    total.style.backgroundColor = "#040";
  } else {
    total.innerHTML = ""; // Remove Price From GUI
    total.style.backgroundColor = "tomato";
  }
}
// === Create === //
// Check LocalStorage
let dataArr = [];

if (localStorage.getItem("Proudcuts")) {
  dataArr = JSON.parse(localStorage.getItem("Proudcuts"));
  // Show Data
  showDate();
}
createBtn.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    catagery: catagery.value.toLowerCase(),
  };
  if (
    title.value !== "" &&
    price.value !== "" &&
    catagery.value !== "" &&
    +newPro.count < 100
  ) {
    if (mood === "create") {
      // Create Product Upon Count
      if (newPro.count > 1) {
        // make loop to repeat element
        for (let i = 0; i < newPro.count; i++) {
          // push Element To Array
          dataArr.push(newPro);
        }
      } else {
        // push Element To Array
        dataArr.push(newPro);
      }
    } else if ((mood = "update")) {
      dataArr[temp] = newPro;
      mood = "create";
      createBtn.innerHTML = "Create";
      count.style.display = "block";
    }
    // Clear Input Data
    clearData();
  }
  // Save Prouduct In LocalStorage
  localStorage.setItem("Proudcuts", JSON.stringify(dataArr));
  // show Data
  showDate();
};

// Clear Data
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  catagery.value = "";
}

// show Data
function showDate() {
  getPrice();
  let table = "";
  for (let i = 0; i < dataArr.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${dataArr[i].title || "NO TILTLE"}</td>
    <td>${dataArr[i].price}</td>
    <td>${dataArr[i].ads}</td>
    <td>${dataArr[i].discount}</td>
    <td>${dataArr[i].total}</td>
    <td>${dataArr[i].catagery}</td>
    <td><button id="update" onclick="update(${i})">update</button></td>
    <td><button onclick="delDate(${i})" id="delete">delete</button></td>
    </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  //   update UI To Add Delete Buttton
  let clearBox = document.getElementById("clear");
  if (dataArr.length > 0) {
    clearBox.innerHTML = `
          <button onclick="deleteAll()">Clear (${dataArr.length})</button>
      `;
  } else {
    clearBox.innerHTML = "";
  }
}

// Delete
function delDate(i) {
  // Remove From Array
  dataArr.splice(i, 1);
  // Remove From LocalStorage
  localStorage.setItem("Proudcuts", JSON.stringify(dataArr));
  // Update UI
  showDate();
}

function deleteAll() {
  // remove arr
  dataArr.splice(0);
  // update localstorage
  localStorage.setItem("Proudcuts", dataArr);
  // update ui
  showDate();
}

// update
function update(index) {
  title.value = dataArr[index].title;
  price.value = dataArr[index].price;
  taxes.value = dataArr[index].taxes;
  ads.value = dataArr[index].ads;
  catagery.value = dataArr[index].catagery;
  discount.value = dataArr[index].discount;
  getPrice();
  count.style.display = "none";
  createBtn.innerHTML = "Update";
  mood = "update";
  temp = index;
  // scroll to top
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

// Search
let searchMood = "title";
function getSearchMood(id) {
  if (id === "search-title") {
    searchMood = "title";
  } else if (id === "search-catagery") {
    searchMood = "catagery";
  }
  search.placeholder = "Search By " + searchMood;
  search.focus();
  search.value = "";
  showDate();
}

function searchDate(keyWord) {
  if (!keyWord) return;
  let table = "";
  for (let i = 0; i < dataArr.length; i++) {
    if (searchMood === "title") {
      if (dataArr[i].title.includes(keyWord)) {
        table += `
            <tr>
            <td>${i + 1}</td>
            <td>${dataArr[i].title || "NO TILTLE"}</td>
            <td>${dataArr[i].price}</td>
            <td>${dataArr[i].ads}</td>
            <td>${dataArr[i].discount}</td>
            <td>${dataArr[i].total}</td>
            <td>${dataArr[i].catagery}</td>
            <td><button id="update" onclick="update(${i})">update</button></td>
            <td><button onclick="delDate(${i})" id="delete">delete</button></td>
            </tr>
            `;
      }
    } else if (searchMood === "catagery") {
      if (dataArr[i].catagery.includes(keyWord)) {
        table += `
              <tr>
              <td>${i + 1}</td>
              <td>${dataArr[i].title || "NO TILTLE"}</td>
              <td>${dataArr[i].price}</td>
              <td>${dataArr[i].ads}</td>
              <td>${dataArr[i].discount}</td>
              <td>${dataArr[i].total}</td>
              <td>${dataArr[i].catagery}</td>
              <td><button id="update" onclick="update(${i})">update</button></td>
              <td><button onclick="delDate(${i})" id="delete">delete</button></td>
              </tr>
              `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}

// clean Data
