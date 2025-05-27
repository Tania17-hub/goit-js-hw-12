import axios from 'axios';

export const PAGE_SIZE = 15;

export async function getImagesByQuery(query, page = 1) {
  const baseURL = 'https://pixabay.com';
  const endPoint = '/api/';
  const url = baseURL + endPoint;

  const params = {
    key: '50355121-f8c083c230eef48e4f2dd2afb',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: PAGE_SIZE,
  };

  const { data } = await axios.get(url, { params });

  return data;
}
