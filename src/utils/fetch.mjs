import { baseUrl } from '../config/index.mjs';

export const axios = {
  get,
  post,
  put,
  delete: _delete,
};

const deaultOptions = {};

function get(url) {
  const requestOptions = {
    ...deaultOptions,
    method: 'GET',
  };
  return makeRequest(url, requestOptions);
}

function post(url, body) {
  const requestOptions = {
    ...deaultOptions,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return makeRequest(url, requestOptions);
}

function put(url, body) {
  const requestOptions = {
    ...deaultOptions,
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return makeRequest(url, requestOptions);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(url) {
  const requestOptions = {
    ...deaultOptions,
    method: 'DELETE',
  };
  return makeRequest(url, requestOptions);
}

// helper functions

async function makeRequest(url, requestOptions) {
  const response = await fetch(`${baseUrl}${url}`, requestOptions);
  return handleResponse(response);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = data?.message || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
