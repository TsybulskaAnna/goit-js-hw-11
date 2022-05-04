import { Notify } from 'notiflix/build/notiflix-notify-aio';

const notifySettings = {
  opacity: 0.8,
  clickToClose: true,
  timeout: 2500,
  showOnlyTheLastOne: true,
  position: 'top-right',
  fontSize: '18px',
};

export default function Eroor(data) {
  if (data.totalHits === 0) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.)',
      notifySettings,
    );
    throw new Error('data is 0 items');
  } else {
    Notify.success(`Hooray! We found ${data.totalHits} images.`, notifySettings);
  }
}