let mainNav = document.getElementById("js-menu");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function() {
  mainNav.classList.toggle("active");
});

function closeLastRecipe() {
  // funkcja chowajaca ostatni otwierany przepis (zdjecia i teksty)
  var thisRecipe = document.getElementById(openedRecipeID);
  var lastRotateBox = document
    .getElementById(openedRecipeID)
    .getElementsByClassName("recipe-inner")[0]; // sciagam ostatniego boxa
  var lastTextBox = lastRotateBox
    .getElementsByClassName("recipe-back")[0]
    .getElementsByClassName("recipe-back-text")[0]; // sciagam ostatnie okno tekstowe
  lastRotateBox.classList.toggle("rotating", false); // forsuje odwrocenie zdjecia
  hideTextWindow(lastRotateBox, lastTextBox); // chowam okno tekstowe
  setTimeout(function() {
    setIndexToZero(thisRecipe);
  }, 500);
}

function setIndexToZero(thisRecipe) {
  thisRecipe.style.zIndex = 0;
}

function setIndexToOne(thisRecipe) {
  thisRecipe.style.zIndex = 1;
}

var openedRecipeID = null;

function changeVisibilityRecipe(clickedID) {
  // funkcja ukrywajaca lub odkrywajaca przepis w zaleznosci od stanu
  console.log(clickedID);
  var thisRecipe = document.getElementById(clickedID);
  var rotateBox = document
    .getElementById(clickedID)
    .getElementsByClassName("recipe-inner")[0]; // sciagam box
  var textBox = rotateBox
    .getElementsByClassName("recipe-back")[0]
    .getElementsByClassName("recipe-back-text")[0]; // sciagam okno tekstowe

  if (!rotateBox.classList.contains("rotating")) {
    // jesli przepis nie jest widoczny:
    if (openedRecipeID !== null) closeLastRecipe(); // jezeli poprzedni przepis otwarty to zamykam go
    rotateBox.classList.add("rotating"); // odwracam wybrane zdjecie
    unhideTextWindow(rotateBox, textBox); // pokazuje wybrany przepis
    openedRecipeID = clickedID; // istnieje otwarty przepis wiec go zapisuje
    setTimeout(function() {
      setIndexToOne(thisRecipe);
    }, 500);
  } else {
    // jezeli przepis jest juz widoczny:
    rotateBox.classList.remove("rotating"); // chowam wybrane zdjecie
    hideTextWindow(rotateBox, textBox); // chowam wybrany przepis
    openedRecipeID = null; // brak otwartych przepisów
    setTimeout(function() {
      setIndexToZero(thisRecipe);
    }, 500);
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

var addedId = 3;

document.getElementById("addForm").addEventListener("submit", function(e) {
  e.preventDefault();
  // const line = document.createElement("hr");
  // line.classList.add("line");
  // document.getElementById("freerecip").appendChild(line);
  //loading values
  const descVal = document.getElementById("rdescription").value;

  //creating elements
  const container = document.createElement("section");
  container.classList.add("recipe");
  addedId++;
  container.id = addedId;

  const inner = document.createElement("figure");
  inner.classList.add("recipe-inner");
  container.appendChild(inner);

  const front = document.createElement("div");
  front.classList.add("recipe-front");
  const img1 = document.createElement("img");
  img1.src = window.URL.createObjectURL(
    document.getElementById("rphoto0").files[0]
  );
  inner.appendChild(front);
  front.appendChild(img1);

  const back = document.createElement("div");
  back.classList.add("recipe-back");
  const img2 = document.createElement("img");
  img2.src = window.URL.createObjectURL(
    document.getElementById("rphoto1").files[0]
  );
  back.appendChild(img2);
  inner.appendChild(back);
  const backtext = document.createElement("div");
  backtext.classList.add("recipe-back-text");
  const description = document.createElement("p");
  description.textContent = descVal;
  backtext.appendChild(description);
  back.appendChild(backtext);

  document.getElementById("freerecip").appendChild(container);

  container.addEventListener("click", function() {
    changeVisibilityRecipe(container.id);
  });
  const delBut = document.createElement("button");
  delBut.textContent = "Delete";
  delBut.classList.add("delete-button");
  backtext.appendChild(delBut);
  delBut.addEventListener("click", function() {
    openedRecipeID = null;
    document.getElementById("freerecip").removeChild(container);
  });

  clearInput(document.getElementsByTagName("input"));
});

function clearInput(elements) {
  for (i = 0; i < elements.length; i++) {
    elements[i].value = "";
  }
}
