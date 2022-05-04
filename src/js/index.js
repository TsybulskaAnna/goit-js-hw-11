import '../cass/styles.scss';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import removePhoto from './fetchCard';
import Error from './notifyCard';
import * as Markup from './markup';

const el = {
  formSearch: document.querySelector('#search-form'),
  endResultsText: document.querySelector('.end-results'),
  newSearchLink: document.querySelector('.new-search'),
};
const loadMoreEl = {
  button: document.querySelector('.load-more'),
  info: {
    LOAD_MORE: 'Load more!',
    LOADING: 'Loading...',
  },
  toggles() {
    if (this.button.disabled) {
      this.button.disabled = false;
      this.button.textContent = this.info.LOAD_MORE;
    } else {
      this.button.disabled = true;
      this.button.textContent = this.info.LOADING;
    }
  },
};
let library = new SimpleLightbox('.gallery a');

el.formSearch.addEventListener('submit', onSearch);
el.newSearchLink.addEventListener('click', newSearchLink);
loadMoreEl.button.addEventListener('click', loadMore);

const input = {
  query: '',
  page: null,
  cardsCount: 0,
};

async function onSearch(event) {
  event.preventDefault();
  input.query = el.formSearch.searchQuery.value;

  try {
    input.page = 1;
    const data = await removePhoto(input.query, input.page);
    Error(data);
    input.cardsCount = data.hits.length;
    updateControls(data);
    Markup.newCard(data);
    library.refresh();
  } catch (error) {
    console.log('query failed with error: ', error);
  }
}

async function loadMore(event) {
  try {
    loadMoreEl.toggles();
    input.page += 1;
    const data = await removePhoto(input.query, input.page);
    input.cardsCount += data.hits.length;
    updateControls(data);
    Markup.appendCard(data);
    library.refresh();
    loadMoreEl.toggles();
  } catch (error) {
    console.log('query failed with error: ', error);
  }
}

function updateControls(data) {
  if (input.cardsCount >= data.totalHits) {
    loadMoreEl.button.classList.add('hidden');
    el.endResultsText.classList.remove('hidden');
  } else {
    el.endResultsText.classList.add('hidden');
    loadMoreEl.button.classList.remove('hidden');
  }
}
function newSearchLink(event) {
  event.preventDefault();
  el.formSearch.searchQuery.focus({ preventScroll: true });
  el.formSearch.reset();

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
