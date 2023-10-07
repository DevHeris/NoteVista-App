const notePrompt = document.querySelector(".add-box");
const noteList = document.getElementById("note-list");

function createNewAddBox(event) {
  const addNotePopUp = document.createElement("div");
  addNotePopUp.className = "add-note-pop-up";

  const form = document.createElement("form");
  form.className = "note-form";

  const childDiv1 = createDiv("title-div");
  const childDiv2 = createDiv("take-note-div");
  const childDiv3 = createDiv("bottom-content");

  childDiv1.innerHTML = ` <input type="text" name="title" id="title" class="input-title placeholder-text" placeholder="Title">`;

  childDiv2.innerHTML = `<input type="text" name="take-note" id="take-note" class="take-note placeholder-text" autofocus="on"
placeholder="Take a note...">`;

  childDiv3.innerHTML = `  <p class="close">Close</p>
<button class="add" type="submit">Add</button>`;

  form.appendChild(childDiv1);
  form.appendChild(childDiv2);
  form.appendChild(childDiv3);

  addNotePopUp.appendChild(form);

  if (event.target === notePrompt) {
    const addNoteWrapper = document.querySelector(".add-note-wrapper");
    addNoteWrapper.outerHTML = `${addNotePopUp.outerHTML}`;

    const noteForm = document.querySelector(".note-form");
    noteForm.addEventListener("submit", createNewAddBox);
  }

  let noteTitleInput = document.getElementById("title");
  let noteContentInput = document.getElementById("take-note");

  function createNewAddBox(event) {
    event.preventDefault();

    let newNoteTitle = noteTitleInput.value;
    let newNoteContent = noteContentInput.value;

    // Validate Input
    if (newNoteContent === "" && newNoteTitle === "") {
      alert("Please add title or content of this note");

      return;
    }

    // Create note DOM element
    addNoteToDOM(newNoteTitle, newNoteContent);
  }

  function addNoteToDOM(title, content) {
    // Create list notes
    const li = document.createElement("li");

    li.innerHTML = ` <p class="title">${title}</p>
    <p class="content">${content}</p>
    <p class="menu-x-date">October 5, 2023 <i class="fa-regular fa-star favorite"></i><i
    class="fa-regular fa-pen-to-square"></i><i class="fa-regular fa-trash-can"></i></p>`;

    // Add li to the DOM
    noteList.prepend(li);

    noteContentInput.value = "";
    noteTitleInput.value = "";
  }
}

function createDiv(classes) {
  const div = document.createElement("div");

  div.className = classes;

  return div;
}

// Add Notes

// Initialize Homepage
function init() {
  // Event listeners
  document.body.addEventListener("click", createNewAddBox);
}

init();
