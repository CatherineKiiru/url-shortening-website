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

function shortURLOutput(id, oldUrl, newUrl) {
  urlWrapper.insertAdjacentHTML(
    "beforeend",
    <div class="url-shorten-results" id="${id}">
      <div class="old-url">
        <p>
          <a href="${oldUrl}" target="_blank">
            ${oldUrl}
          </a>
        </p>
      </div>
      <div class="new-url">
        <p>
          <a href="${newUrl}" target="_blank">
            ${newUrl}
          </a>
        </p>
      </div>
      <div class="options">
        <button type="button" class="copy-new-url btn btn-sm scale-effect">
          copy
        </button>

        <button type="button" class="delete-url scale-effect">
          <i class="fa-regular fa-trash-can icon"></i>
        </button>
      </div>
    </div>
  );
  // These are functions to manipulate the URL behavior. The first function removes the URL,
  //The second URL copies the new URL and the removeAllURLs deletes the copies URLs
  removeOneUrl();
  copyUrl();
  removeAllUrls();
}

// Place delete button at the end of generated links function

deleteButton = (newNode, currentNode) => {
  currentNode.parentNode.insertBefore(
    newNode,
    currentNode,
    currentNode.nextSibling
  );
};

removeAllNewURLs = () => {
  // Checks whether there are two url-shorten-results classes in the urlWrapper element.
  // If the condition is true, this function creates a "delete all button" to remove two generated URLs
  // The classlist method adds CSS classes to the button element
  // The textContent property returns content of the element i.e the delete all contne for the button element
  // Finally, use the insertAfter method to insert the dynamic button after the last elemet in the urllWrapper child
  if (urlWrapper.querySelectorAll(".url-shorten-results").length >= 2) {
    if (urlWrapper.querySelector(".delete-all-urls")) {
      urlWrapper.querySelector(".delete-all-urls").remove();
    }
    // we're creating a button with the "delete-all" text
    /* you first define a variable with the createElement method. Then define the button type.  */
    let button = document.createElement("button");
    button.type = "button";
    button.classList = "btn btn-sm delete-all-urls scale-effect";
    button.textContent = "delete all";
    insertAfter(button, urlWrapper.lastElementChild);

    //
    let deleteAllUrls = urlWrapper.querySelector(".delete-all-urls");
    deleteAllUrls.addEventListener("click", () => {
      urlWrapper.innerHTML = "";
      savedUrls = [];
      localStorage.removeItem("saved");
    });
  } else {
    if (urlWrapper.querySelector("delete-all-urls")) {
      urlWrapper.querySelector(".delete-all-urls").remove();
    }
  }
  // Create dynamic button for deleting URLs
};

// removing a single URL
// start by selecting the button with the trash icon by using querySelectorAll and passing in the class "delete-url"
// Get the URL ID with the urlId variable
// Remove URL from the list with the .closest method which returns the first ancestor which matches the querySelectorAll element. In this case it's "delete-url"
// Once you remove from the list, remove it from the array by getting the URLs index.
removeOneUrl = () => {
  let deleteButton = urlWrapper.querySelectorAll(".delete-url");
  deleteButton.forEach((button) => {
    button.addEventListener("click", () => {
      let urlId = button.closest(".url-shorten-results").id;
      button.closest(".url-shorten-results").remove();
      const index = savedUrls.findIndex((url) => url.id == urlId);
      savedUrls.splice(index, 1);
      localStorage.setItem("saved", JSON.stringify(savedUrls));
      removeAllNewURLs();
    });
  });
};

// Copy URL
CopyUrl = () => {
  let copyButton = urlWrapper.querySelectorAll(".copy-new-url");
  copyButton.forEach((button) => {
    button.addEventListener("click", () => {
      let urlText = button 
      .closest(".url-shorten-results")
      .querySelector(".new-url p").textContent;
      const body = document.querySelector("body");
      const area = document.createElement("textarea");
      body.appendChild(area);
      area.value = urlText;
      area.select();
      document.execCommand("copy"); //this command has been deprecated with no alternative. 
      button.classList.add("copied");
      button.innerHTML = "copied!";
      setTimeout(() => {
        button.classList.remove("copied");
        button.innerHTML = "copy";
      }, 1500);
      body.removeChild(area);
    })
  }) 

}

