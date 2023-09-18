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

function openModal(event) {
    event.preventDefault();
    const photo = event.target;

    if (photo.classList.contains('gallery__image')) {
        const largeImageURL = photo.dataset.source;
        const description = photo.alt;

        const instance = new SimpleLightbox(`
      <div class="modal">
        <img src="${largeImageURL}" alt="${description}" />
      </div>`, {
            onShow: (instance) => {

                const closeOnEsc = (e) => {
                    if (e.key === 'Escape') {
                        instance.close();
                        window.removeEventListener('keydown', closeOnEsc);
                    }
                };

                window.addEventListener('keydown', closeOnEsc);
            },
        });

        instance.show();
    }
}

const gallery = document.querySelector('.gallery');
gallery.insertAdjacentHTML('beforeend', createMarkup(galleryItems));


document.addEventListener('DOMContentLoaded', function() {
    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
    });

    gallery.addEventListener('click', openModal);
});