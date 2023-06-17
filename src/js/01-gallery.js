import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const divGallery = document.querySelector('.gallery');

const galleryImage = galleryItems.map(({ preview, original, description })=>{
    return `
    <a class="gallery__item"
        href="${original}">
        <img 
            class="gallery__image" 
            src="${preview}" 
            alt="${description}"
        />
    </a>
    `;

});

const stringGallery = galleryImage.join('');
divGallery.innerHTML = stringGallery;

var lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250, });

  divGallery.addEventListener('keydown', onEscPressModalClose);

  function onEscPressModalClose(event) {
        event.preventDefault();
    if (event.code === 'Escape') {
      instance.close();
      divGallery.removeEventListener('keydown', onEscPressModalClose);
    }
  }
