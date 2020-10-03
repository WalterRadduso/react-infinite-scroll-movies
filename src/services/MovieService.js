import axios from 'axios';
import { API_KEY, API_URL_V3 } from '../config';

const configHeaders = {
  Authorization: `Bearer ${API_KEY}`,
};

export default {
  getMovies: async function (page) {
    const config = {
      headers: configHeaders,
      params: {
        page,
      },
    };

    try {
      const { data } = await axios.get(`${API_URL_V3}/movie/top_rated`, config);

      return data;
    } catch (error) {
      throw error;
    }
  },
  getGenre: async function () {
    const config = {
      headers: configHeaders,
    };

    try {
      const { data } = await axios.get(`${API_URL_V3}/genre/movie/list`, config);

      return data;
    } catch (error) {
      throw error;
    }
  },
};
