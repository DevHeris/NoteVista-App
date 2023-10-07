const inputs = document.querySelectorAll(".input");
const button = document.getElementById("btn");

function addClass(event) {
  let parent = event.target.parentNode.parentNode;
  parent.classList.add("focus");
}

function removeClass(event) {
  let parent = event.target.parentNode.parentNode;
  if (event.target.value == "") {
    parent.classList.remove("focus");
  }
}

function onButtonClick(event) {
  event.preventDefault();

  let welcomeMessage = document.createElement("div");
  welcomeMessage.className = "welcome-message";
  const emailInput = document.getElementById("email");

  if (event.target.value === "Reset") {
    if (emailInput.value === "") {
      alert("Please fill in your Email Address");
    } else {
      welcomeMessage.textContent = `Instructions have been sent to ${emailInput.value}`;
      setTimeout(() => {
        document.body.prepend(welcomeMessage);
      }, 1);
      setTimeout(() => {
        document.body.removeChild(welcomeMessage);
      }, 5000);
    }
  }

  const passwordInput = document.getElementById("password");
  const usernameInput = document.getElementById("username");

  if (event.target.value === "Log In") {
    //Login form validation
    if (passwordInput.value === "" && usernameInput.value === "") {
      alert("Please fill in your Username and Password");
    } else if (passwordInput.value === "") {
      alert("Please fill in your Password");
    } else if (usernameInput.value === "") {
      alert("Please fill in your Username");
    } else {
      welcomeMessage.textContent = `Welcome Back ${usernameInput.value}!`;
      setTimeout(() => {
        document.body.prepend(welcomeMessage);
      }, 1);
      setTimeout(() => {
        document.body.removeChild(welcomeMessage);
      }, 800);
      setTimeout(() => {
        window.location.href = "home.html";
      }, 800);
    }
  } else if (event.target.value === "Sign Up") {
    //Signup validation
    if (
      passwordInput.value === "" ||
      usernameInput.value === "" ||
      emailInput.value === ""
    ) {
      alert("Please fill all the user information");
    } else {
      welcomeMessage.textContent = `Welcome to NoteVista ${usernameInput.value}!`;
      setTimeout(() => {
        document.body.prepend(welcomeMessage);
      }, 1);
      setTimeout(() => {
        document.body.removeChild(welcomeMessage);
      }, 900);
      setTimeout(() => {
        window.location.href = "home.html";
      }, 900);
    }
  }
}

// Initialize app
function init() {
  // Event Listeners
  inputs.forEach((input) => {
    input.addEventListener("focus", addClass);
    input.addEventListener("blur", removeClass);
  });
  button.addEventListener("click", onButtonClick);
}

init();
