// Define global variables
const urlWrapper = document.querySelector(".url-container");
const urlForm = document.querySelector("#url-form");
const urlInput = document.querySelector(".url-input");
const submitButton = document.querySelector("button");
const alert = document.querySelector(".alert");

// Build UI structure for url output
//insertAdjacentHTML is a method for inserting HTML code into a specified position
// set the main url container's class to url-container and id to "${id}".
// Create divs for the old url & the new url
//create another div with "options" class to hold 2 buttons:
// One button is for copying the new url and another button is for deleting the copied url 
// In the second button, insert a trash can icon to symbolize the delete button 

function shortURLOutput(id, oldURL, newURL) {
  urlWrapper.insertAdjacentHTML(
    "beforeend",
    <div class="url-container" id="${id}">
    <div class="old-url">
      <p><a href="${oldURL}" target="_blank">${oldURL}</a></p>
    </div>
    <div class="new-url">
      <p><a href="${newURL}" target="_blank">${newURL}</a></p>
    </div>
    <div class="options">
      <button type="button" class="copy-new-url btn btn-sm scale-effect">copy</button>

      <button type="button" class="delete-url scale-effect">
        <i class="fa-regular fa-trash-can icon"></i>
      </button>
    </div>
  </div>
  );
  // These are functions to manipulate the URL behavior. The first function removes the URL, 
  //The second URL copies the new URL and the removeAllURLs deletes the copies URLs
  removeURL();
  copyURL();
  removeAllURLs(); 
};

// Place delete button at the end of generated links function

function deleteButton(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode, nextSibling);
}

// Function for removing all generated URLs

function deleteGeneratedURLs () {
  if (urlWrapper.querySelectorAll(".url-container").length >=2) {
    if (urlWrapper.querySelector("delete-all-urls")) {
      urlWrapper.querySelector("delete-all-urls").remove();
    }
    // Create delete generated URLS button 
    let button = document.createElement("button");
    button.type = "button"; 
    button.classList = "btn btn-sm delete-all-urls scale-effect";
    button.textContent = "delete all";
    insertAfter(button, urlWrapper.lastElementChild);

    //delete generated URLS and Local storage
    let deleteAll = urlWrapper.querySelector(".delete-all-urls");
    deleteAll.addEventListener("click", () => {
      urlWrapper.innerHTML = "";
      savedURLS = [];
      localStorage.removeItem("saved");
    });
  } else {
    if (urlWrapper.querySelector(".delete-all-urls")) {
      urlWrapper.querySelector("delete-all-urls").remove();
    }
  }
}

// function for deleting one userSelect: 

function removeOneURL (){
  let 
}
