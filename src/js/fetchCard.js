import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const perPage = 40;

export default async function removePhoto(query, page) {
  const params = {
    params: {
      key: '27177277-8253913f2182577fd0bf27e94',
      q: query,
      per_page: perPage,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      order: 'popular',
      page: page,
    },
  };

  try {
    const response =  await axios.get('', params);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('caugth in fetch.js, ', error);
    return;
  }
}