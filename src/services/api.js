import axios from 'axios';

const PIXA_KEY = '27472864-20a91975f294fe19c608dc0e7';
const BASE_URL = 'https://pixabay.com/api/';

const params = {
  q: '', //Qery (строка запроса поиска)
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: false,
  per_page: 12,
  page: 1,
};
const instance = axios.create({
  baseURL: BASE_URL,
});
//functions
//read
async function getPhotos() {
  try {
    const resp = await instance.get('', {
      params: { key: PIXA_KEY, ...params },
    });
    return await resp.data;
  } catch (err) {
    console.log('Трай кетч - ', err.message, ' ', err.response.data);
    return err;
  }
}
const API = { params, getPhotos };
export default API;
