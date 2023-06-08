// Define global variables
const urlWrapper = document.querySelector(".url-container");
const urlForm = document.querySelector(".url-form");
const urlInput = document.querySelector(".url-input");
const submitButton = document.querySelector("button");

// Build UI structure for url output
//insertAdjacentHTML is a

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
  </div>
        
        `
  );
}
