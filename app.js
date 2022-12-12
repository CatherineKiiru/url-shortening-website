const urlForm = document.querySelector('.url-form');

const submitUrl = async(e) => {
    e.preventDefault();

    const url = document.querySelector('.url').value;
    const request = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const data = await request.json();
    const cardsContainer = document.querySelector('.url-shortened-cards');
    cardsContainer.innerHTML += `<div class="card">
    <p>${url}</p>
    <div class="shortened-link-container">
    <p>$data.result.short_link</p>
    <button class ="shortened-link-button" type="button">Copy</button>
    </div>    
    </div>`
    console.log('Form Submitted');
}

urlForm.addEventListener('Submit', submitUrl);