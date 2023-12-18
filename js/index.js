// Global Variables
let urlForm = document.querySelector("#url-shorten-form");
let input = urlForm.querySelector(".url-input");
let submitButton = urlForm.querySelector("button");
let alertMessage = urlForm.querySelector(".alert");
let urlResult = document.querySelector(".url-shorten-results");

// THIS IS THE CREATE WORKFLOW FROM THE CRUD OPERATION

// Build Short URL HTML Structure
function htmlStructure(id, originalUrl, shortUrl) {
  urlResult.insertAdjacentHTML(
    "beforeend",
    `
  <div class="url-shorten-result" id='${id}'>
    <div class="old-url">
    <p><a href="${originalUrl}" target="_blank">${originalUrl}</a></p>
    </div>
    <div class="new-url">
      <p><a href="${shortUrl}" target="_blank">${shortUrl}</a></p>
      <div class="options">
        <button type="button" class="copy-new-url btn btn-sm">
          copy
        </button>

        <button type="button" class="delete-url">
          <i class="fa-regular fa-trash-can icon"></i>
        </button>
      </div>
    </div>
  </div>`
  );
  removeURL();
  copyURL();
  removeAllGeneratedURLs();
}

let savedURLs = [];
function RebuildSavedURLS() {
  return savedURLs.map((url) => {
      return htmlStructure(url.id, url.originalUrl, url.shortUrl);
    })
    .join(""); //concatenates the returned values into one string
}

if (localStorage.getItem("saved")) {
  savedURLs = JSON.parse(localStorage.getItem("saved"));
  RebuildSavedURLS();
};

// Rebuilding and mapping the URLs from the HTML structure

// THIS IS THE READ WORKFLOW FROM THE CRUD OPERATION

//Copy URl functionality
function copyURL() {
  let copyButtons = urlResult.querySelectorAll(".copy-new-url");
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get URL Content
      let urlText = button.closest(".url-shorten-result").querySelector(".new-url p").textContent;
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
       body.removeChild(textArea);
    });
  });
}

// Delete one URL functionality
function removeURL() {
  let deleteURLButton = urlResult.querySelectorAll(".delete-url");
  deleteURLButton.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".url-shorten-result").remove();
      localStorage.removeItem("saved");
    });
  });
}

// Delete all URLs functionality
function removeAllGeneratedURLs() {
  if (urlResult.querySelectorAll(".url-shorten-result").length >= 2) {
    if (urlResult.querySelector(".delete-all-urls")) {
      urlResult.querySelector(".delete-all-urls").remove();
    }

    let button = document.createElement("button");
    button.type = "button";
    button.classList = "btn btn-sm delete-all-urls";
    button.innerHTML = "delete all links";

    function insertAfter(newButton, existingPosition) {
      existingPosition.parentNode.insertBefore(newButton, existingPosition.nextSibling);
    }
    insertAfter(button, urlResult.lastChild);

    let deleteAll = urlResult.querySelector(".delete-all-urls");
    deleteAll.addEventListener("click", () => {
      localStorage.removeItem("saved");
      urlResult.innerHTML = [];
    });
  } else {
    if (urlResult.querySelector(".delete-all-urls")) {
      urlResult.querySelector(".delete-all-urls").remove();
    }
  }
}

// THIS IS THE READ & UPDATE WORKFLOW FROM THE CRUD OPERATION
// Random ID and Shortening API

function randomIds() {
  let currentTime = Date.now();
  let currentTimeString = currentTime.toString(32).slice(0, 8);
  let reandomNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    .toString()
    .slice(0, 4);
  let randomId = `${currentTimeString}-${reandomNumber}`;
  return randomId;
}
  
async function makeShortURL() {
  const headers = new Headers();
  headers.append("apikey", "wbQw1TQmWchjWw8Tdy0UOK2GkUGECKNV");
  
 let url = RebuildSavedURLS();

  const requestOptions = {
    method: "POST",
    redirect: "follow",
    headers: headers,
    body: url,
  };

  // let apiBaseURL = "https://api.apilayer.com/short_url/hash";
  // let shortenQuery = `shorten?url=`;
  // let fetchLink = `${apiBaseURL}${shortenQuery}${url}`;

  try {
    let response = await fetch( "https://api.apilayer.com/short_url/hash",
    requestOptions);
    let data = await response.json();
    let status = data.ok;
  

    // Response With Data
    if (status) {
      let originalUrl = data.result.original_url;
      let shortUrl = data.short_url;
      // Make Object For [originalUrl, shortUrl]
      let generatedURL = {
        id: randomIds(),
        originalUrl: originalUrl,
        shortUrl: shortUrl,
      };
      // Change Submit Button Text & Style
      urlForm.classList.add("success");
      submitButton.innerHTML = `<i class="fa-solid fa-check icon"></i> shortened!`;
      setTimeout(() => {
        urlForm.classList.remove("success");
        submitButton.innerHTML = "shorten it!";
      }, 2000);
      htmlStructure(randomIds(), originalUrl, shortUrl);
      // Save [link] Object To Localstorage After Pushing It To The [savedURLs] Array
      savedURLs.push(generatedURL);
      localStorage.setItem("saved", JSON.stringify(savedURLs));
    }
    // Response With Error Message [No Data].
    else {
      // Change Submit Button Text
      submitButton.innerHTML = "shorten it!";
      
    }
  } catch (error) {
    // Incase Can't Connect To The Api [Ex: No Internet Connection]
    alerts("Sorry, unknown error happened please try again later.");
  }
}

// 3.
urlForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get Input Value & Remove Extra Spaces.
  let inputValue = input.value.trim().replace(" ", "");
  // Change Submit Button Text
  submitButton.innerHTML = `<i class="fa-solid fa-spinner icon fa-spin"></i> Generating...`;
  makeShortURL(inputValue);
  // Clear Input
  urlForm.reset();
});

// 4. Show Alerts

function alerts(message) {
  urlForm.classList.add("empty");
  alertMessage.textContent = message;

  setTimeout(() => {
    urlForm.classList.remove("empty");
  }, 5000);
}

// Responsive mobile navigation function
function mobileNavigation() {
  let navigation = document.querySelector(".header-section .main-navigation");
  let toggleMenu = document.querySelector(".header-section .burger-menu");
  let icon = toggleMenu.querySelector(".icon");
  let closed = true;

  toggleMenu.addEventListener("click", () => {
    // Change Icon
    icon.classList.contains("fa-bars")
      ? (icon.className = "fa-regular fa-xmark icon")
      : (icon.className = "fa-regular fa-bars icon");
    // Open Or Close Navgation Menu
    let navigationHeight = navigation.scrollHeight;
    closed
      ? (navigation.style.height = `${navigationHeight}px`)
      : (navigation.style.height = "");
    closed = !closed;
  });
  // Close Navgation For Devices Greater Than 992px Width.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      icon.className = "fa-regular fa-bars icon";
      navigation.style.height = "";
      closed = true;
    }
  });
}
mobileNavigation();
