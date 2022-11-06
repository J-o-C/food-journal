let btnAdd = document.getElementById("add");
let btnDelete = document.getElementById("delete");

btnAdd.addEventListener("click", function() {
  // fetch("localhost:3000");
  window.location.replace("http://localhost:3000/add-field");
});

btnDelete.addEventListener("click", function() {
  window.location.replace("http://localhost:3000/delete-field");
})
