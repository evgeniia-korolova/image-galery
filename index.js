const BASE_URL = 'https://api.unsplash.com/search/photos';
const KEY = 'c-yw5thinAqda5bQ2u_9Qz1QIIYLr3jdDUIf34hztCQ';
const errorMessage = document.querySelector('.error-message');
const formSearchEl = document.querySelector('.search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.querySelector('#search-results');
const searchBtn = document.getElementById('search-btn');
const showMoreButton = document.getElementById('show-more-button');

// const galeryElem = document.querySelector('.random-img');



// let endpoint = `https://api.unsplash.com/search/photos?page=1&orientation=landscape&query=dog&client_id=${KEY}`;

async function showImages() {
  
  const urlTemp = `https://api.unsplash.com/search/photos?page=1&orientation=landscape&query=dog&client_id=${KEY}`;

  const response = await fetch(urlTemp);
  const data = await response.json();
  console.log(data);
 

  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('search-result');

    const image = document.createElement('img');

    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = '_blank';
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });
 
}

showImages()

// -------------------------------------------------------------------------------

let inputData = '';
let page = 1;

async function searchImages() {
  inputData = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&orientation=landscape&query=${inputData}&client_id=${KEY}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  if (page === 1) {
    searchResults.innerHTML = '';
  }

  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('search-result');

    const image = document.createElement('img');

    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = '_blank';
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;

  if (page > 1) {
    showMoreButton.style.display = 'block';
  }
}

formSearchEl.addEventListener('submit', (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

formSearchEl.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') searchImages();
});

showMoreButton.addEventListener('click', () => {
  searchImages();
});
