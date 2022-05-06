// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
};

generateGalleryMarkup(galleryItems, refs.gallery);

let galleryBox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionSelector: 'self',
  captionType: 'attr',
  captionAttribute: 'title',
  captionPosition: 'bottom',
  captionDelay: 250,
  showCounter: false,
});

function generateGalleryMarkup(items, containerNode) {
  const images = items.map(item => {
    const galleryItem = document.createElement('a');
    galleryItem.classList.add('gallery__item');
    galleryItem.href = item.original;
    galleryItem.title = item.description;
    galleryItem.innerHTML = `<img class="gallery__image"
            src="${item.preview}"
            alt="${item.description}" />`;
    return galleryItem;
  });
  containerNode.append(...images);
}

// console.log(galleryItems);
