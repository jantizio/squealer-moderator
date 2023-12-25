import { faxios } from '../utils/faxios.mjs';

export async function getUsers(
  username = undefined,
  type = undefined,
  popularity = undefined
) {
  const usernameQuery = username
    ? `&username=${encodeURIComponent(username)}`
    : '';
  const typeQuery = type ? `&type=${encodeURIComponent(type)}` : '';
  const popularityQuery = popularity
    ? `&popularity=${encodeURIComponent(popularity)}`
    : '';

  const users = await faxios.get(
    `/users/?${usernameQuery}${typeQuery}${popularityQuery}`
  );

  return users;
}

export async function getMe() {
  const user = await faxios.get('/users/me');
  return user;
}

export async function changeUserQuota(username, quota) {
  const newQuota = await faxios.patch(`/users/${username}/quota`, { dailyQuota: quota });
  return newQuota;
}

export async function changeBlockedStatus(username, blocked) {
  const user = await faxios.patch(`/users/${username}/blocked`, { blocked });
  return user;
}
