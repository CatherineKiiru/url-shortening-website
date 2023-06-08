// Define global variables
const urlWrapper = document.querySelector(".url-container");
const urlForm = document.querySelector(".url-form");
const urlInput = document.querySelector(".url-input");
const submitButton = document.querySelector("button");

// Build UI structure for url output
//insertAdjacentHTML is a method for inserting HTML code into a specified position

function shortURLOutput(id, originalURL, shortURL) {
  urlWrapper.insertAdjacentHTML(
    "beforeend",
    `
    <div class="short-url-result" id="${id}">
    <div class="old-url">
      <p><a href="${originalURL}" target="_blank">${originalURL}</a></p>
    </div>
    <div class="new-url">
      <p><a href="${shortURL}" target="_blank">${shortURL}</a></p>
    </div>
    <div class="options">
      <button type="button" class="copy-new-url btn btn-sm scale-effect">copy</button>

      <button type="button" class="delete-url scale-effect">
        <i class="fa-regular fa-trash-can icon"></i>
      </button>
    </div>
  </div>`
  );
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

  }
} 
