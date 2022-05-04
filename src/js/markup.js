import templateImages from'../handlebars/card.hbs';

const galleryElement = document.querySelector('.gallery');

export function newCard(el) {
  const markup = el.hits.map(templateImages);
  galleryElement.innerHTML = markup.join('');
}

export function appendCard(el) {
  const markup = el.hits.map(templateImages);
  galleryElement.insertAdjacentHTML('beforeend', markup.join(''));
}
