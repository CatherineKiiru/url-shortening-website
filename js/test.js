let UrlForm = document.querySelector("url-shorten-form");
let urlInput = UrlForm.querySelector(".url-input");
let submitButton = UrlForm.querySelector("button");
let alertMessage = UrlForm.querySelector(".alert");
let urlHtmlResult = document.querySelector(".url-shorten-results");

// Build HTML structure
function htmlStructure(is, originalURL, shortUrl) {
  urlHtmlResult.insertAdjacentHTML(
  "beforeend",
  `<div class="url-shorten-result" id='${id}'>
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
}

//localstorage function
localStorage.getItem("saved")
  ? ((savedURLs = JSON.parse(localStorage.getItem("saved"))),
    RebuildSavedURLS())
  : (savedURLs = []);
