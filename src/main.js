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
    document.querySelector('.end-message').classList.add('hidden');
    hideLoadMoreButton();
    showLoader();
    userInput = inputField.value;
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
    if (data.total === 0) {
        iziToast.show({
            title: 'Try again',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            color: 'blue',
        });
        hideLoader();
        return;
    }

    createGallery(data.hits);
    } catch (error) {
        iziToast.show({
            title: 'Error',
            message: 'Something went wrong in createGallery',
            color: 'red',
        });
    } finally {
        hideLoader();
        checkBtnStatus();

    }
    
})

loadMore.addEventListener('click', async e => {
    hideLoadMoreButton();
    showLoader();
    page += 1;
      try {
    const data = await getImagesByQuery(userInput, page);
    if (data.total === 0) {
        iziToast.show({
            title: 'Try again',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            color: 'blue',
        });
        hideLoader();
        return;
    }

    createGallery(data.hits);
    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth'
    });
    } catch (error) {
        iziToast.show({
            title: 'Error',
            message: 'Something went wrong in createGallery',
            color: 'red',
        });
    } finally {
        hideLoader();
        checkBtnStatus();

    }
})

function checkBtnStatus() {
    if (totalPages === 0) return;
    if (page >= totalPages ) {
        hideLoadMoreButton();
        document.querySelector('.end-message').classList.remove("hidden");
        return;
    }
    showLoadMoreButton();
    return;
    }