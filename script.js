const titleInput = document.querySelector("#title");
const contentInput = document.querySelector("#take-note");
const inputForm = document.querySelector(".note-form");
const noteList = document.getElementById("note-list");

function displayNotes() {
  const titlesFromStorage = getTitlesFromStorage();
  const contentsFromStorage = getContentsFromStorage();

  // Trick for using for each  on two arrays at the same time
  titlesFromStorage.forEach((title, index) => {
    const content = contentsFromStorage[index];
    addNoteToDOM(title, content);
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

  // Create Note DOM element
  addNoteToDOM(newTitle, newContent);

  // Add Title to Local Storage
  addTitleToStorage(newTitle);

  // Add Content to Local Storage
  addContentToStorage(newContent);

  // Clear typed-in value on form submission
  titleInput.value = "";
  contentInput.value = "";
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

function getTitlesFromStorage(param) {
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

  // new to local Storage
  localStorage.setItem("titles", JSON.stringify(titlesFromStorage));
  localStorage.setItem("contents", JSON.stringify(contentsFromStorage));
}

// Initialize Application
function init() {
  // Event Listeners
  inputForm.addEventListener("submit", onAddNoteSubmit);
  noteList.addEventListener("click", onclickNote);
  document.addEventListener("DOMContentLoaded", displayNotes);
}

init();
