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

export async function addReceiver(squealId, receiver) {
  const squeals = await getSqueals();

  const squeal = squeals.find((squeal) => squeal.id === squealId);
  squeal.receivers.push(receiver);

  return squeal;
}

export async function changeReactions(squealId, positive, negative) {
  const squeals = await getSqueals();

  const squeal = squeals.find((squeal) => squeal.id === squealId);
  squeal.positive_reaction = positive;
  squeal.negative_reaction = negative;

  return squeal;
}
