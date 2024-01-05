import { apiUrl } from '../config/index.mjs';

export const faxios = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// create only one promise for the refresh token = avoid multiple refresh token calls
let refreshPromise = null;
const clearPromise = () => (refreshPromise = null);

faxios.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const prevRequest = error.config;
    const errorMessage = error.response?.data;
    const isTokenExpired =
      errorPayloadCheck(errorMessage) &&
      errorMessage.message.includes('Invalid token');

    if (
      error.response?.status === 401 &&
      isTokenExpired &&
      !prevRequest?.sent
    ) {
      prevRequest.sent = true;

      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(clearPromise);
      }

      await refreshPromise;
      return faxios(prevRequest);
    }

    return Promise.reject(error);
  }
);

const refreshAccessToken = async () => {
  const response = await faxios.post('/token/refresh');
  return response;
};

function errorPayloadCheck(data) {
  return data instanceof Object && 'message' in data;
}
