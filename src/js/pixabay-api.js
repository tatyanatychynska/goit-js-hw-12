import axios from "axios";

export const perPage = 15;
export async function getImagesByQuery(query, page, perPage) {
    const baseURL = 'https://pixabay.com';
    const endPoint = '/api/';
    const url = baseURL + endPoint;

    const params = {
        key: '55157705-9f4ed22218599416e91cc1d5e',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
    };


    const response = await axios.get(url, { params });    

    return response.data;

}
