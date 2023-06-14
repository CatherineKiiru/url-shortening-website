/*

  ////// NOTE ///////
  
LocalStorage Doesn't Wok On Coden Pen [Access Denied]. So When Refreshing The Browser All The Generated URLs will Be Removed.

To View The Full Functionality Of The Website, You Can Visit My Github Page

https://github.com/MohamedAridah/frontendmentor_url-shortening-api

*/

// Global Variables. The hastag (#) selector selects the ide from the HTML file, while the dot (.) selects the class
let shortURLsWrapper = document.querySelector(".url-shorten-results");
let shortUrlForm = document.querySelector("#url-shorten-form");
let submitButton = shortUrlForm.querySelector("button");
let input = shortUrlForm.querySelector(".url-input");
let alertMessage = shortUrlForm.querySelector(".alert");

// Build Short URL HTML Structure
function generatedShortUrlHtml(id, originalURL, shortUrl) {
  shortURLsWrapper.insertAdjacentHTML(
    "beforeend",
    `
  <div class="url-shorten-result" id='${id}'>
    <div class="old-url">
    <p><a href="${originalURL}" target="_blank">${originalURL}</a></p>
    </div>
    <div class="new-url">
      <p><a href="${shortUrl}" target="_blank">${shortUrl}</a></p>
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
  removeURL();
  copyURL();
  removeAllGeneratedURLs();
}

// Put Delete Button At The End Of The Generated Links Function
function insertAfter(newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

// Add Remove All Generated URls
function removeAllGeneratedURLs() {
  // When There Is More Than One Generated URL & Delete Button Is Already Exists Delete It And Then Add It To The End Of The URLs List.
  if (shortURLsWrapper.querySelectorAll(".url-shorten-result").length >= 2) {
    if (shortURLsWrapper.querySelector(".delete-all-urls")) {
      shortURLsWrapper.querySelector(".delete-all-urls").remove();
    }
    // Create Delete Generated URLs Button
    let button = document.createElement("button");
    button.type = "button";
    button.classList = "btn btn-sm delete-all-urls scale-effect";
    button.textContent = "delete all";
    insertAfter(button, shortURLsWrapper.lastElementChild);
    // Delete All Genetared URLs & LocalStorage
    let deleteAll = shortURLsWrapper.querySelector(".delete-all-urls");
    deleteAll.addEventListener("click", () => {
      shortURLsWrapper.innerHTML = "";
      savedURLs = [];
      localStorage.removeItem("saved");
    });
  } else {
    if (shortURLsWrapper.querySelector(".delete-all-urls")) {
      shortURLsWrapper.querySelector(".delete-all-urls").remove();
    }
  }
}

// Remove Single URL
function removeURL() {
  let deleteURLButton = shortURLsWrapper.querySelectorAll(".delete-url");
  deleteURLButton.forEach((button) => {
    button.addEventListener("click", () => {
      // Get URL ID
      let linkId = button.closest(".url-shorten-result").id;
      // Remove URL From The List
      button.closest(".url-shorten-result").remove();
      // Get Index Of This URL And Remove It From Array
      const index = savedURLs.findIndex((url) => url.id == linkId);
      // Remove URL From The Array
      savedURLs.splice(index, 1);
      // Resave The Array & LocalStorage
      localStorage.setItem("saved", JSON.stringify(savedURLs));
      removeAllGeneratedURLs();
    });
  });
}

// Copy URl
function copyURL() {
  let copyButtons = shortURLsWrapper.querySelectorAll(".copy-new-url");
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get URL Content
      let urlText = button
        .closest(".url-shorten-result")
        .querySelector(".new-url p").textContent;
      const body = document.querySelector("body");
      const area = document.createElement("textarea");
      body.appendChild(area);
      area.value = urlText;
      area.select();
      document.execCommand("copy");
      button.classList.add("copied");
      button.innerHTML = "copied!";
      setTimeout(() => {
        button.classList.remove("copied");
        button.innerHTML = "copy";
      }, 1500);
      body.removeChild(area);
    });
  });
}

// Generate Random IDs
function reandomIds() {
  let currentTime = Date.now();
  let currentTimeString = currentTime.toString(32).slice(0, 8);
  let reandomNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
    .toString()
    .slice(0, 4);
  let reabdomId = `${currentTimeString}-${reandomNumber}`;
  return reabdomId;
}

// shrtcode API
const makeShortURL = async (userUrl) => {
  let apiBaseURL = "https://api.shrtco.de/v2/";
  let shortenQuery = `shorten?url=`;
  let fetchLink = `${apiBaseURL}${shortenQuery}${userUrl}`;

  try {
    let response = await fetch(fetchLink);
    let data = await response.json();
    let status = data.ok;

    // Response With Data
    if (status) {
      let originalURL = data.result.original_link;
      let shortUrl = data.result.full_short_link;
      // Make Object For [originalURL, shortUrl]
      let generatedURL = {
        id: reandomIds(),
        originalURL: originalURL,
        shortUrl: shortUrl
      };
      // Change Submit Button Text & Style
      shortUrlForm.classList.add("success");
      submitButton.innerHTML = `<i class="fa-solid fa-check icon"></i> shortened!`;
      setTimeout(() => {
        shortUrlForm.classList.remove("success");
        submitButton.innerHTML = "shorten it!";
      }, 1700);
      generatedShortUrlHtml(reandomIds(), originalURL, shortUrl);
      // Save [link] Object To Localstorage After Pushing It To The [savedURLs] Array
      savedURLs.push(generatedURL);
      localStorage.setItem("saved", JSON.stringify(savedURLs));
    }
    // Response With Error Message [No Data].
    else {
      // Change Submit Button Text
      submitButton.innerHTML = "shorten it!";
      let errorCode = data.error_code;
      switch (errorCode) {
        // If Input Is Empty
        case 1:
          alerts("Please add a link first");
          break;
        // If URL Is Not Valid
        case 2:
          alerts(data.error.split(",")[0] + ", Please check your link again.");
          break;
        // If URL Is Not Allowed To Be Shortened
        case 10:
          alerts("The link you entered is not allowed to be shortened.");
          break;
        // Any Other Problem
        default:
          alerts(data.error);
      }
    }
  } catch (error) {
    // Incase Can't Connect To The Api [Ex: No Internet Connection]
    alerts("Sorry, unknown error happened please try again later.");
  }
};

shortUrlForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get Input Value & Remove Extra Spaces.
  let inputValue = input.value.trim().replace(" ", "");
  // Change Submit Button Text
  submitButton.innerHTML = `<i class="fa-solid fa-spinner icon fa-spin"></i> Generating...`;
  makeShortURL(inputValue);
  // Clear Input
  shortUrlForm.reset();
});

// Show Alerts
function alerts(message) {
  shortUrlForm.classList.add("empty");
  alertMessage.textContent = message;

  setTimeout(() => {
    shortUrlForm.classList.remove("empty");
  }, 5000);
}

// Expand Header Navgation Function
function expandNavgation() {
  let navgation = document.querySelector(".header .main-navgation");
  let toggleMenu = document.querySelector(".header .burger-menu");
  let icon = toggleMenu.querySelector(".icon");
  let closed = true;

  toggleMenu.addEventListener("click", () => {
    // Change Icon
    if (icon.classList.contains("fa-bars")) {
      icon.className = "fa-regular fa-xmark icon";
    } else {
      icon.className = "fa-regular fa-bars icon";
    }

    // Open Or Close Navgation Menu
    let navgationHeight = navgation.scrollHeight;
    if (closed) {
      navgation.style.height = `${navgationHeight}px`;
    } else {
      navgation.style.height = "";
    }
    closed = !closed;
  });
  // Close Navgation For Devices Greater Than 992px Width.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      icon.className = "fa-regular fa-bars icon";
      navgation.style.height = "";
      closed = true;
    }
  });
}
expandNavgation();
