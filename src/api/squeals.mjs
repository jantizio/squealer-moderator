export async function getSqueals(author = undefined, receivers = undefined) {
  const response = await fetch('../../db/squeals.json');
  const squeals = await response.json();

  if (author) {
    return squeals.filter((squeal) => squeal.author === author);
  }
  if (receivers) {
    return squeals.filter((squeal) => squeal.receivers.includes(receivers));
  }
  return squeals;
}
