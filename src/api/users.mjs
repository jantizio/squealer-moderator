export async function getUsers() {
  const response = await fetch('../../db/users.json');
  const users = await response.json();
  return users;
}
