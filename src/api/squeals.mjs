import { faxios } from "../utils/faxios.mjs";

export async function getSqueals(
  author = undefined,
  receivers = undefined,
  date = undefined
) {
  const squeals = await faxios.get("/squeals.json");

  if (author) {
    return squeals.filter((squeal) => squeal.author.includes(author));
  }
  if (receivers) {
    return squeals.filter(
      (squeal) =>
        squeal.receivers.filter((receiver) => receiver.includes(receivers))
          .length > 0
    );
  }

  if (date) {
    return squeals.filter((squeal) => new Date(squeal.datetime) >= date);
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
