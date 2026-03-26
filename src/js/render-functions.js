import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="gallery-item">
            <a href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
            <ul class="gallery-info">
                <li><b>Likes</b> ${likes}</li>
                <li><b>Views</b> ${views}</li>
                <li><b>Comments</b> ${comments}</li>
                <li><b>Downloads</b> ${downloads}</li>
            </ul>
        </li>
    `).join('');

    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
}

export function clearGallery() {
    gallery.innerHTML = '';

}
const loader = document.querySelector('.loader');

export function showLoader() {
    loader.classList.remove('hidden');
}

export function hideLoader() {
    loader.classList.add('hidden');
}

const loadMore = document.querySelector('button[type="button"]')

export function showLoadMoreButton() {
    loadMore.classList.remove('hidden');

}

export function hideLoadMoreButton() {
    loadMore.classList.add('hidden');

}