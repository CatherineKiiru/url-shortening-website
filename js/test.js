let UrlForm = document.querySelector("url-shorten-form");
let urlInput = UrlForm.querySelector(".url-input");
let submitButton = UrlForm.querySelector("button");
let alertMessage = UrlForm.querySelector(".alert");
let urlHtmlResult = document.querySelector(".url-shorten-results");

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
  removeURL();
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
  const copyButtons = Array.from(document.querySelectorAll(".copy-new-url"));
  copyButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Get URL Content
      const urlText = button.closest(".url-shorten-result").querySelector(".new-url p")?.textContent;
      const body = document.querySelector("body");
      const textArea = document.createElement("textarea");
      body.append(textArea);
      textArea.value = urlText;
      textArea.select();
      navigator.clipboard.writeText(textArea.value);
      button.classList.add("copied");
      button.innerHTML = "copied!";
      setTimeout(() => {
        button.classList.remove("copied");
        button.innerHTML = "copy";
      }, 2000);
    });
  });
}
