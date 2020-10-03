import axios from 'axios';
import { API_KEY, API_URL_V3, SESSION_ID } from '../config';

const configHeaders = {
  'Content-Type': 'application/json',
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
  getMovieDetails: async function (movieId) {
    const config = {
      headers: configHeaders,
    };

    try {
      const { data } = await axios.get(`${API_URL_V3}/movie/${movieId}`, config);

      return data;
    } catch (error) {
      throw error;
    }
  },
  rateMovie: async function (movieId, rating) {
    const config = {
      headers: configHeaders,
      params: {
        session_id: SESSION_ID,
      },
    };

    try {
      const { data } = await axios.post(
        `${API_URL_V3}/movie/${movieId}/rating`,
        {
          value: rating,
        },
        config,
      );

      return data;
    } catch (error) {
      throw error;
    }
  },
};
