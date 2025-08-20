const galleryContainer = document.querySelector('.gallery');
let lightbox = null;

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
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <p><b>Likes:</b> ${likes}</p>
          <p><b>Views:</b> ${views}</p>
          <p><b>Comments:</b> ${comments}</p>
          <p><b>Downloads:</b> ${downloads}</p>
        </div>
      </li>
    `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  const loader = document.querySelector('.loader-wrapper');
  if (loader) loader.classList.remove('hidden');
}

export function hideLoader() {
  const loader = document.querySelector('.loader-wrapper');
  if (loader) loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  const btn = document.querySelector('.load-more');
  if (btn) btn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  const btn = document.querySelector('.load-more');
  if (btn) btn.classList.add('hidden');
}
