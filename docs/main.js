import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery, PAGE_SIZE } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  checkForLoadMoreButton,
  hideLoadMoreButton,
  smoothScrollAfterLoad,
  load_btn,
} from './js/render-functions.js';

// =========== html elements founded

const form = document.querySelector('.form');
const input = form.elements['search-text'];

// ========== global constants

let page;
let MAX_PAGE;
let query = '';

//=========== listeners

form.addEventListener('submit', onSearch);
load_btn.addEventListener('click', loadMore);

//=========== global logic

async function onSearch(e) {
  e.preventDefault();
  query = input.value.trim();
  page = 1;
  MAX_PAGE = 1;
  if (query.length < 1) {
    iziToast.info({
      message: 'Search field is empty. Please type a keyword.',
      position: 'topRight',
      timeout: 3000,
    });
    return;
  }
  clearGallery();
  showLoader();
  try {
    const data = await getImagesByQuery(query, page);
    MAX_PAGE = Math.ceil(data.totalHits / PAGE_SIZE);
    if (!data.hits.length) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 4000,
      });
      hideLoadMoreButton();
      return;
    }
    createGallery(data.hits);

    checkForLoadMoreButton(page, MAX_PAGE);
    console.log('End of try block reached successfully');
  } catch (error) {
    iziToast.error({
      message: 'Network error. Please try later.',
      position: 'topRight',
      timeout: 4000,
    });
  } finally {
    hideLoader();
    input.value = '';
  }
}

// ========== paginashon

async function loadMore() {
  showLoader();
  page += 1;
  try {
    const res = await getImagesByQuery(query, page);
    createGallery(res.hits);
    smoothScrollAfterLoad();
    checkForLoadMoreButton(page, MAX_PAGE);
  } catch (error) {
    iziToast.error({
      message: 'Network error. Please try later.',
      position: 'topRight',
      timeout: 4000,
    });
  } finally {
    hideLoader();
  }
}
