let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function() {
  mainNav.classList.toggle("active");
});

function closeRecipes() {
  // funkcja chowajaca wszystkie przepisy (zdjecia i teksty)
  var recipes = document.getElementsByClassName("recipe"); // wyciagam przepisy (klasa recipe)

  var recipe;
  for (recipe of recipes) {
    // iteruje po przepisach
    var rotateBox = recipe.getElementsByClassName("recipe-inner")[0]; // sciagam box
    var textBox = rotateBox
      .getElementsByClassName("recipe-back")[0]
      .getElementsByClassName("recipe-back-text")[0]; // sciagam okno tekstowe
    rotateBox.classList.toggle("rotating", false); // forsuje odwrocenie zdjecia
    hideTextWindow(rotateBox, textBox); // chowam okno tekstowe
  }
}

function changeVisibilityRecipe(clickedID) {
  console.log(clickedID);
  giveZIndex(clickedID);
  // funkcja ukrywajaca lub odkrywajaca przepis w zaleznosci od stanu
  var rotateBox = document
    .getElementById(clickedID)
    .getElementsByClassName("recipe-inner")[0]; // sciagam box
  var textBox = rotateBox
    .getElementsByClassName("recipe-back")[0]
    .getElementsByClassName("recipe-back-text")[0]; // sciagam okno tekstowe

  if (!rotateBox.classList.contains("rotating")) {
    // jesli przepis nie jest widoczny
    closeRecipes(); // to chowam wszystkie inne przepisy
    rotateBox.classList.add("rotating"); // odwracam wybrane zdjecie
    unhideTextWindow(rotateBox, textBox); // pokazuje wybrany przepis
  } else {
    // jezeli przepis jest juz widoczny
    rotateBox.classList.remove("rotating"); // chowam wybrane zdjecie
    hideTextWindow(rotateBox, textBox); // chowam wybrany przepis
  }
}

function unhideTextWindow(rotateBox, textBox) {
  // wysuwanie okna tekstowego
  textBox.style.transform = "scaleY(1)";
  textBox.style.transitionDelay = "0.5s";
  rotateBox.style.transitionDelay = "0s";
}

function hideTextWindow(rotateBox, textBox) {
  // chowanie okna tekstowego
  textBox.style.transform = "scaleY(0)";
  textBox.style.transitionDelay = "0s";
  rotateBox.style.transitionDelay = "0.5s";
}

function giveZIndex(id) {
  const index = 999 - id;
  document.getElementById(id).style.zIndex = index;
}

const addForm = document.forms["addForm"];
addedId = 3;

addForm.addEventListener("submit", function(e) {
  e.preventDefault();
  //loading values
  const descVal = document.getElementById("rdescription").value;
  //create elements
  const section = document.createElement("section");
  section.classList.add("recipe");
  section.id = addedId;

  const figure = document.createElement("figure");
  figure.classList.add("recipe-inner");

  const recfront = document.createElement("div");
  recfront.classList.add("recipe-front");
  const img1 = document.createElement("img");
  img1.src = window.URL.createObjectURL(
    document.getElementById("rphoto0").files[0]
  );
  recfront.appendChild(img1);

  const recback = document.createElement("div");
  recback.classList.add("recipe-back");
  const img2 = document.createElement("img");
  img2.src = window.URL.createObjectURL(
    document.getElementById("rphoto1").files[0]
  );
  recback.appendChild(img2);

  const recbacktxt = document.createElement("div");
  recbacktxt.classList.add("recipe-back-text");
  const desc = document.createElement("p");
  desc.textContent = descVal;
  recbacktxt.appendChild(desc);
  recback.appendChild(recbacktxt);

  const del = document.createElement("button");

  delete button;
  del.textContent = "Delete";
  del.classList.add("delete-button");
  section.appendChild(del);
  figure.appendChild(recfront);
  figure.appendChild(recback);
  section.appendChild(figure);
  del.addEventListener("click", function() {
    document.getElementById("freerecip").removeChild(section);
  });
  //appending
  document.getElementById("freerecip").appendChild(section);
  //tutej
  section.onclick = changeVisibilityRecipe(addedId);

  clearInput(document.getElementsByTagName("input"));
  //section.addEventListener("click", changeVisibilityRecipe(this.id));
  addedId++;
});

function clearInput(elements) {
  for (i = 0; i < elements.length; i++) {
    elements[i].value = "";
  }
}
