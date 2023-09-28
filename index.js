const BASE_URL = 'https://api.unsplash.com/search/photos';
const KEY = 'c-yw5thinAqda5bQ2u_9Qz1QIIYLr3jdDUIf34hztCQ';

const errorMessage = document.querySelector('.error-message');
const formSearchEl = document.querySelector('.search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.querySelector('#search-results');
const searchBtn = document.getElementById('search-btn');
const showMoreButton = document.getElementById('show-more-button');
const closeBtn = document.querySelector('.close-btn');

// -----------get and show images on load the page------------------------------

async function loadImages() {
  const urlTemp = `https://api.unsplash.com/search/photos?page=1&orientation=landscape&query=mountain&client_id=${KEY}`;

  const response = await fetch(urlTemp);
  const data = await response.json();

  const results = data.results;

  showImages(results);
}

// loadImages();

// -------------------------------

let currentImg = 0;
const showImages = (data) => {
  data.forEach((item, index) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('search-result');

    const image = document.createElement('img');

    image.src = item.urls.small;
    image.alt = item.alt_description;
    image.title = 'Click to download image';
    const imageLink = document.createElement('a');
    imageLink.href = item.links.html;
    imageLink.target = '_blank';
    imageLink.title = 'Open in browser';
    imageLink.textContent = item.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);

    image.addEventListener('click', () => {
      currentImg = index;
      showPopup(item);
    });
  });
};
// -------------------------------------------

const showPopup = (item) => {
  let popup = document.querySelector('.image-popup');
  const downloadBtn = document.querySelector('.download-btn');
  const image = document.querySelector('.large-image');
  popup.classList.remove('hide');
  downloadBtn.href = item.links.html;
  image.src = item.urls.regular;

  image.addEventListener('click', () => {
    popup.classList.add('hide');
  });

  const closeBtnPop = document.querySelector('.close-btn-popup');
  closeBtnPop.addEventListener('click', () => {
    popup.classList.add('hide');
  });
};
// ---------search images on input request--------------------------------------

// let inputData = '';
let inputData = location.search.split('=').pop();
let page = 1;

async function searchImages() {
  inputData = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&orientation=landscape&query=${inputData}&client_id=${KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  if (page === 1) {
    searchResults.innerHTML = '';
  }

  const results = data.results;
  showImages(results);

  page++;

  if (page > 1) {
    showMoreButton.style.display = 'block';
  }
}

// -------------
if (inputData == '') {
  loadImages();
} else {
  searchImages();
}

// ------------

formSearchEl.addEventListener('submit', (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
  closeBtn.classList.remove('hide');
});

formSearchEl.addEventListener('keydown', (event) => {
  if (event.key == 'Enter') searchImages();
});

showMoreButton.addEventListener('click', () => {
  searchImages();
});

searchInput.addEventListener('keyup', (e) => {
  e.preventDefault();

  closeBtn.classList.remove('hide');
});

closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  closeBtn.classList.add('hide');
  searchInput.value = '';
  searchInput.focus();
});
