import { galleryItems } from './gallery-items.js';


console.log(galleryItems);

function createMarkup(arr) {
    return arr.map(({ preview, original, description }) => `
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
    `).join("")
}


let instance;

function handleClick(event) {


    event.preventDefault();
    if (event.target === event.currentTarget) {
        return;
    }

    const photo = event.target;
    if (photo.classList.contains('gallery__image')) {
        const largeImageURL = photo.dataset.source;
        const description = photo.alt;

        instance = basicLightbox.create(`
      <div class="modal">
        <img src="${largeImageURL}" alt="${description}" />
      </div>
    `, {
            onShow: (instance) => {
                window.addEventListener('keydown', onEscKeyDown);
            },
            onClose: (instance) => {
                window.removeEventListener('keydown', onEscKeyDown);

            }
        });

        instance.show();
    }



}

const gallery = document.querySelector(".gallery");
gallery.insertAdjacentHTML("beforeend", createMarkup(galleryItems))

gallery.addEventListener("click", handleClick);

function onEscKeyDown(e) {
    console.log(e)
    if (e.code === 'Escape') {
        instance.close();
    }
}