import { getImagesByQuery, perPage } from "./js/pixabay-api";
import { clearGallery, createGallery, hideLoader, hideLoadMoreButton, showLoader, showLoadMoreButton } from "./js/render-functions";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputField = document.querySelector('input[name="search-text"]');
const form = document.querySelector('.form');
const loadMore = document.querySelector('button[type="button"]')

let userInput;
let page;
let totalPages;
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    page = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();
    userInput = inputField.value.trim();
    if (userInput === '') {
        iziToast.show({
            title: 'Empty form',
            message: 'Please add some text and click "Search"',
            color: 'blue',
        });
        hideLoader();
        return;
    }
    try {
        const data = await getImagesByQuery(userInput, page);
        totalPages = Math.ceil(data.totalHits / perPage);
    if (data.hits.length === 0) {
        iziToast.show({
            message: 'Sorry, there are no images matching your search query. Please try again!',
            color: 'blue',
        });
        hideLoader();
        return;
    }

        createGallery(data.hits);
        checkBtnStatus();
    } catch (error) {
        iziToast.show({
            title: 'Error',
            message: `Error received: ${error}`,
            color: 'red',
        });
    } finally {
        hideLoader();

    }
    
})

// ! ====== Load more

loadMore.addEventListener('click', async e => {
    hideLoadMoreButton();
    showLoader();
    page += 1;
      try {
    const data = await getImagesByQuery(userInput, page);
    if (data.hits.length === 0) {
        iziToast.show({
            message: 'Sorry, there are no images matching your search query. Please try again!',
            color: 'blue',
        });
        hideLoader();
        return;
    }
          createGallery(data.hits);
          checkBtnStatus();

          
// ! ====== Scroll
    const card = document.querySelector('.gallery-item');
    if (card) {
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth'
        });
    }
// ! ====== end Scroll

      } catch (error) {
          page -= 1;
          hideLoadMoreButton();
          iziToast.show({
            title: 'Error',
            message: `Error received: ${error}`,
            color: 'red',
        });
    } finally {
        hideLoader();

    }
})

// ! ====== end Load more

function checkBtnStatus() {
    if (totalPages === 0) return;
    if (page >= totalPages ) {
        hideLoadMoreButton();
        iziToast.show({
            message: `We're sorry, but you've reached the end of search results.`,
            color: 'blue',
        });
        return;
    }
    showLoadMoreButton();
    return;
    }