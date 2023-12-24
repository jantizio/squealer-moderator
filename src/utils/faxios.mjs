import { apiUrl } from '../config/index.mjs';

export const faxios = {
  get,
  post,
  put,
  delete: _delete,
  patch,
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

function patch(url, body) {
  const requestOptions = {
    ...deaultOptions,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return makeRequest(url, requestOptions);
}

// helper functions

async function makeRequest(url, requestOptions) {
  const response = await fetch(`${apiUrl}${url}`, requestOptions);
  return await handleResponse(response);
}

async function handleResponse(response) {
  const responseText = await response.text();
  const data = responseText && JSON.parse(responseText);

  if (!response.ok) {
    const error = data?.message || response.statusText;
    return Promise.reject(error);
  }

  return data;
}
