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
