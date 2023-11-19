import { faxios } from "../utils/faxios.mjs";

export async function getUsers(
  username = undefined,
  type = undefined,
  popularity = undefined
) {
  const users = await faxios.get("/db/users.json");
  if (username) {
    return users.filter((user) => user.username.includes(username));
  }
  if (type) {
    return users.filter((user) => user.type === type);
  }

  return users;
}

export async function getMe() {
  const users = await faxios.get("/db/users.json");
  return users[3];
}

export async function changeUserQuota(username, quota) {
  const users = await getUsers();
  const user = users.find((user) => user.username === username);
  user.quota = quota;
}

export async function changeBlockedStatus(username, blocked) {
  const users = await getUsers();
  const user = users.find((user) => user.username === username);
  user.blocked = blocked;
}
