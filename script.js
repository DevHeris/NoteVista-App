const titleInput = document.querySelector("#title");
const contentInput = document.querySelector("#take-note");
const inputForm = document.querySelector(".note-form");
const noteList = document.getElementById("note-list");
const noteFilter = document.getElementById("search");
const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
const formBtn = document.querySelector(".add");

let isEditMode = false;

function displayNotes() {
  const titlesFromStorage = getTitlesFromStorage();
  const contentsFromStorage = getContentsFromStorage();

  // Trick for using for each  on two arrays at the same time
  titlesFromStorage.forEach((title, index) => {
    const content = contentsFromStorage[index];
    addNoteToDOM(title, content);
  });
}

function filterNotes(event) {
  const text = event.target.value.toLowerCase();
  const notes = noteList.querySelectorAll("li");

  notes.forEach((note) => {
    const noteTitle = note.firstElementChild.textContent.toLowerCase();
    const noteContent =
      note.firstElementChild.nextElementSibling.textContent.toLowerCase();

    if (noteTitle.indexOf(text) !== -1 || noteContent.indexOf(text) !== -1) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
}

function onAddNoteSubmit(event) {
  event.preventDefault();

  const newTitle = titleInput.value;
  const newContent = contentInput.value;

  // Input validation
  if (newContent === "" && newTitle === "") {
    alert("No note to be added");
  }

  if (isEditMode) {
    const noteToEdit = document.querySelector(".edit-mode");

    // Remove from local storage
    removeNoteFromStorage(
      noteToEdit.firstElementChild.textContent,
      noteToEdit.firstElementChild.nextElementSibling.textContent
    );

    noteToEdit.classList.remove("edit-mode");

    //Remove from DOM
    noteToEdit.remove();

    // Set edit mode back to false
    isEditMode = false;
  }

  // Create Note DOM element
  addNoteToDOM(newTitle, newContent);

  // Add Title to Local Storage
  addTitleToStorage(newTitle);

  // Add Content to Local Storage
  addContentToStorage(newContent);

  resetUI();
}

function addNoteToDOM(title, content) {
  // Create new Note li
  const li = document.createElement("li");
  li.innerHTML = ` <p class="title">${title}</p>
 <p class="content">${content}</p>
 <div class="menu-x-date">
     <p class="date">October 5, 2023</p>
     <div class="menu">
         <i class="fa-regular fa-star favorite"></i>
         <i class="fa-regular fa-pen-to-square"></i>
         <i class="fa-regular fa-trash-can"></i>
     </div>
 </div>`;

  noteList.prepend(li);
}

function addTitleToStorage(title) {
  let titlesFromStorage = getTitlesFromStorage();

  // Add new title to array
  titlesFromStorage.push(title);

  // Convert to JSON String and set to local storage
  localStorage.setItem("titles", JSON.stringify(titlesFromStorage));
}

function addContentToStorage(content) {
  let contentsFromStorage = getContentsFromStorage();

  // Add new content to array
  contentsFromStorage.push(content);

  // Convert to JSON String and set to local storage
  localStorage.setItem("contents", JSON.stringify(contentsFromStorage));
}

function getTitlesFromStorage() {
  let titlesFromStorage;

  if (localStorage.getItem("titles") === null) {
    titlesFromStorage = [];
  } else {
    //Parse converts to an actual array
    titlesFromStorage = JSON.parse(localStorage.getItem("titles"));
  }

  return titlesFromStorage;
}

function getContentsFromStorage() {
  let contentsFromStorage;

  if (localStorage.getItem("contents") === null) {
    contentsFromStorage = [];
  } else {
    //Parse converts to an actual array
    contentsFromStorage = JSON.parse(localStorage.getItem("contents"));
  }

  return contentsFromStorage;
}

function onclickNote(event) {
  if (event.target.className === "fa-regular fa-trash-can") {
    removeNote(event.target.parentElement.parentElement.parentElement);
  } else if (
    event.target.parentElement.tagName === "LI" ||
    event.target.className === "fa-regular fa-pen-to-square" ||
    event.target.className === "date"
  ) {
    setNoteToEditMode(event.target.parentElement);
  }
}

function setNoteToEditMode(note) {
  console.log(note);
  isEditMode = true;

  noteList.querySelectorAll("li").forEach((note) => {
    note.classList.remove("edit-mode");
  });

  formBtn.innerHTML = `<i class="fa-solid fa-pen"></i> Update`;
  formBtn.style.backgroundColor = "green";

  if (note.tagName === "LI") {
    note.classList.add("edit-mode");
    titleInput.value = note.firstElementChild.textContent;
    contentInput.value = note.firstElementChild.nextElementSibling.textContent;
  } else if (note.className === "menu-x-date") {
    note.parentElement.classList.add("edit-mode");
    titleInput.value = note.parentElement.firstElementChild.textContent;
    contentInput.value = note.parentElement.nextElementSibling.textContent;
  } else if (note.className === "menu") {
    note.parentElement.parentElement.classList.add("edit-mode");
    titleInput.value =
      note.parentElement.parentElement.firstElementChild.textContent;
    contentInput.value =
      note.parentElement.parentElement.firstElementChild.nextElementSibling.textContent;
  }
}

function removeNote(note) {
  if (confirm("Are you sure you want to delete this note?")) {
    // Remove note from DOM
    note.remove();

    // Remove note from local storage
    removeNoteFromStorage(
      note.firstElementChild.textContent,
      note.firstElementChild.nextElementSibling.textContent
    );
  }
}

function removeNoteFromStorage(title, content) {
  let titlesFromStorage = getTitlesFromStorage();
  let contentsFromStorage = getContentsFromStorage();

  // Filter Out title to be removed from storage
  titlesFromStorage = titlesFromStorage.filter((t) => t !== title);

  //MEANING GIVE ME AN ARRAY IN WHICH THE THE GUYS TO BE REMOVED ARE NOT A PART OF. THE GUYS TO BE REMOVED ARE THE ONES IN THE removeNoteFromStorage() PARAMETER/ARGUMENT

  // Filter Out content to be removed from storage
  contentsFromStorage = contentsFromStorage.filter((c) => c !== content);

  // New local Storage
  localStorage.setItem("titles", JSON.stringify(titlesFromStorage));
  localStorage.setItem("contents", JSON.stringify(contentsFromStorage));
}

function toggleNav() {
  const visibility = primaryNav.getAttribute("data-visible");

  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
    // Note that aria expanded is just to tell screen readers that the nav now visible
  } else if (visibility === "true") {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
}

function resetUI() {
  titleInput.value = "";
  contentInput.value = "";

  formBtn.innerHTML = ` <i class="fa-solid fa-plus"></i> Add`;
  formBtn.style.backgroundColor = "#6370ff";
  formBtn.style.color = "white";

  isEditMode = false;
}

// Initialize Application
function init() {
  // Event Listeners
  inputForm.addEventListener("submit", onAddNoteSubmit);
  noteList.addEventListener("click", onclickNote);
  noteFilter.addEventListener("input", filterNotes);
  document.addEventListener("DOMContentLoaded", displayNotes);
  navToggle.addEventListener("click", toggleNav);

  resetUI();
}

init();
