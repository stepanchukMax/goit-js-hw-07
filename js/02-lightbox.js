import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

function createMarkup(arr) {
    return arr
        .map(
            ({ preview, original, description }) => `
    <li class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
        </a>
    </li>
    `
        )
        .join('');
}


const gallery = document.querySelector('.gallery');
gallery.insertAdjacentHTML('beforeend', createMarkup(galleryItems));

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
});