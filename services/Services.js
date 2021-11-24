import axios from 'axios';

const apiURL = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=7d119c926e40d008eac0d7547c05566d';

// Get Popular Movies
export const getPopularMovies = async () => {
  const respn = await axios.get(`${apiURL}/movie/popular?${apiKey}`);
  return respn.data.results;
};

// Get Upcoming Movies
export const getUpcomingMovies = async () => {
  const respn = await axios.get(`${apiURL}/movie/upcoming?${apiKey}`);
  return respn.data.results;
};

// Get Popular TV
export const getPopularTv = async () => {
  const respn = await axios.get(`${apiURL}/tv/popular?${apiKey}`);
  return respn.data.results;
};

// Get Family Movie
export const getFamilyMovie = async () => {
  const respn = await axios.get(
    `${apiURL}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return respn.data.results;
};

// Get Documentary
export const getDocumentary = async () => {
  const respn = await axios.get(
    `${apiURL}/discover/movie?${apiKey}&with_genres=99`,
  );
  return respn.data.results;
};

// Get Movie Details
export const getMovieDetail = async id => {
  const respn = await axios.get(`${apiURL}/movie/${id}?${apiKey}`);
  return respn.data;
};

// Get search movie/tv shows
export const searchMovieTv = async (query, type) => {
  const respn = await axios.get(
    `${apiURL}/search/${type}?${apiKey}&query=${query}`,
  );
  return respn.data.results;
};
