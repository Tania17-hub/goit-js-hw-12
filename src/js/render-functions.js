import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const loaderBackdrop = document.querySelector('.loader-backdrop');
export const load_btn = document.querySelector('.js-button-load');
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
<li class="gallery__item">
  <a class="gallery__link" href="${largeImageURL}">
    <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <ul class="info">
    <li><b>Likes</b> ${likes}</li>
    <li><b>Views</b> ${views}</li>
    <li><b>Comments</b> ${comments}</li>
    <li><b>Downloads</b> ${downloads}</li>
  </ul>
</li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('hidden');
  loaderBackdrop.classList.remove('hidden');
}

export function hideLoader() {
  loaderEl.classList.add('hidden');
  loaderBackdrop.classList.add('hidden');
}

// ========== fo paginashon

export function checkForLoadMoreButton(currentPage, maxPage) {
  if (currentPage < maxPage) {
    showLoadMoreButton();
  } else {
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
      timeout: 3000,
    });
    hideLoadMoreButton();
  }
}
export function showLoadMoreButton() {
  if (!load_btn) return;
  load_btn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  if (!load_btn) return;
  load_btn.classList.add('hidden');
}

// ========== slow scroll formuls

export function smoothScrollAfterLoad() {
  const galleryItems = document.querySelectorAll('.gallery li');
  if (galleryItems.length === 0) return;
  const firstCardHeight = galleryItems[0].getBoundingClientRect().height;
  window.scrollBy({
    top: firstCardHeight * 2,
    behavior: 'smooth',
  });
}
