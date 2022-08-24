import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');

const itemsMarkup = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup);

galleryContainer.addEventListener('click', onClickModalOpen);

function createGalleryItemsMarkup(items) {
    return items.map(({ preview, original, description }) => {
        return `
        <div class="gallery__item">
            <a class="gallery__link" href="${original}">
                <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
                />
            </a>
        </div>
        `;
    })
        .join('');
} 

let instance = null;

function onClickModalOpen(event) {
    event.preventDefault(); 

    window.addEventListener('keydown', onEscModalClose);

    if (!event.target.classList.contains('gallery__image')) {
        return;
    }    
    instance = basicLightbox.create(`<img 
                class="gallery__image"
                src="${event.target.dataset.source}"
                />`)

    instance.show()
}

function onEscModalClose (event) {
    console.log(event.code); 
    if (event.code === 'Escape') {        
    window.removeEventListener('keydown', onEscModalClose);    
    instance.close();
    }
}



