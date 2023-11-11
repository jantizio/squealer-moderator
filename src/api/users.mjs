export async function getUsers() {
  const response = await fetch('../../db/users.json');
  const users = await response.json();
  return users;
}

export async function changeUserQuota(username, quota) {
  const users = await getUsers();
  const user = users.find((user) => user.username === username);
  user.quota = quota;
}
