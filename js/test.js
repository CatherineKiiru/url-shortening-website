let UrlForm = document.querySelector("url-shorten-form");
let urlInput = UrlForm.querySelector(".url-input");
let submitButton = UrlForm.querySelector("button");
let alertMessage = UrlForm.querySelector(".alert");
let urlResult = document.querySelector(".url-shorten-results");

// Build HTML structure
htmlStructure = (id, originalLink, shortLink) => {
  urlResult.insertAdjacentHTML(
    "beforeend",
    `
  <div class="url-shorten-result" id='${id}'>
    <div class="old-url">
    <p><a href="${originalLink}" target="_blank">${originalLink}</a></p>
    </div>
    <div class="new-url">
      <p><a href="${shortLink}" target="_blank">${shortLink}</a></p>
      <div class="options">
        <button type="button" class="copy-new-url btn btn-sm scale-effect">
          copy
        </button>

        <button type="button" class="delete-url scale-effect">
          <i class="fa-regular fa-trash-can icon"></i>
        </button>
      </div>
    </div>
  </div>`
  );
  deleteLink();
  copyLink();
  deleteAllLinks();
};

// LocalStorage and Mapping values into the HTML structure above
let savedLinks = [];
RebuildSavedLinks = () => {
  return savedLinks
    .map((url) => {
      return htmlStructure(url.id, url.originalUrl, url.shortUrl);
    })
    .join("");
};
if (localStorage.getItem("saved")) {
  savedLinks = JSON.parse(localStorage.getItem("saved"));
  RebuildSavedLinks();
} else savedLinks = [];

// Copy URL functionality
function copyLink() {
  let copyButtons = urlResult.querySelectorAll(".copy-new-url");
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get URL Content
      let urlText = button
        .closest(".url-shorten-result")
        .querySelector(".new-url p").textContent;
      let body = document.querySelector("body");
      let textArea = document.createElement("textarea");
      body.append(textArea);
      textArea.value = urlText; //textArea is an object that takes in the value prop
      textArea.select();
      navigator.clipboard.writeText(textArea.value);
      button.classList.add("copied");
      button.innerHTML = "copied!";
      setTimeout(() => {
        button.classList.remove("copied");
        button.innerHTML = "copy";
      }, 2000);
      // body.removeChild(textArea);
    });
  });
}

// Delete one link
function deleteLink() {
  let deleteURLButton = urlResult.querySelectorAll(".delete-url");
  deleteURLButton.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".url-shorten-result").remove();
      localStorage.removeItem("saved");
    });
  });
}

// Delete all links
function deleteAllLinks() {
  if (urlResult.querySelectorAll(".url-shorten-result").length >= 2) {
    if (urlResult.querySelectorALL(".delete-all-urls")) {
      urlResult.querySelector(".delete-all-urls").remove();
    }
    let deleteButton = document.createElement("button");
    deleteButton.classList = ("btn btn-sm delete-all-urls scale-effect");
    deleteButton.innerText = "delete all links";

    function insertAfter(newButton, existingPosition) {
      existingPosition.parentNode.insertBefore(newButton, existingPosition.nextSibling);
    }
    insertAfter(deleteButton, urlResult.lastElementChild);

    //Remove deleted links from local storage
    let deleteAll = urlResult.querySelector("delete-all-urls");
    deleteAll.addEventListener("click", () => {
      localStorage.removeItem("saved");
      deleteAll.innerHTML = "";
    });
  } else {
    if (urlResult.querySelector("delete-all-urls")) {
      urlResult.querySelector("delete-all-urls").remove();
    }
  }
};

//Fetch shortcode API
async function urlApi (url) {
  let baseApi = "https://api.shrtco.de/v2/";
  
}

