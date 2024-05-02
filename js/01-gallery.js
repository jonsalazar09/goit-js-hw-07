import { galleryItems } from './gallery-items';
// Change code below this line
const imageGallery = document.querySelector('.gallery');
const cardsMarkup = createImageCardsMarkup(galleryItems);

function createImageCardsMarkup(images) {
  return images
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>`
    )
    .join('');
}

imageGallery.insertAdjacentHTML('beforeend', cardsMarkup);

imageGallery.addEventListener('click', onCurrentImageClick);

function onCurrentImageClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  const currentImageLink = evt.target.dataset.source;
  const marcup = `<img src="${currentImageLink}">`;

  const instance = basicLightbox.create(marcup, {
    onShow: () => onOpenInstance(),
    onClose: () => onCloseInstance(),
  });

  instance.show();

  function onOpenInstance() {
    window.addEventListener('keydown', onEscKeyPress);
  }

  function onCloseInstance() {
    window.removeEventListener('keydown', onEscKeyPress);
  }

  function onEscKeyPress(evt) {
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = evt.code === ESC_KEY_CODE;

    if (isEscKey) {
      instance.close();
    }
  }
}

console.log(galleryItems);