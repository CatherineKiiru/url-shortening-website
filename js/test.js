let UrlForm = document.querySelector("url-shorten-form");
let urlInput = UrlForm.querySelector(".url-input");
let submitButton = UrlForm.querySelector("button");
let alertMessage = UrlForm.querySelector(".alert");
let urlResult = document.querySelector(".url-shorten-results");

// Build HTML structure
htmlStructure = (id, originalUrl, shortUrl) => {
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
  deleteURL();
  copyURL();
  removeAllGeneratedURLs();
}

// LocalStorage and Mapping values into the HTML structure above
let savedURLs = [];
RebuildSavedURLS = () => {
  return savedURLs.map((url) => {
      return htmlStructure(url.id, url.originalUrl, url.shortUrl)
    })
    .join("");
}
if (localStorage.getItem("saved")) {
  savedURLs = JSON.parse(localStorage.getItem("saved"));
  RebuildSavedURLS();
} else (savedURLs = []);

// Copy URL functionality
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
      // body.removeChild(textArea);
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
