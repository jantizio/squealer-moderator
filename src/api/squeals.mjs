import { faxios } from '../utils/faxios.mjs';

export async function getSqueals(
  author = undefined,
  receiver = undefined,
  date = undefined
) {
  const authorQuery = author ? `&author=${encodeURIComponent(author)}` : '';
  const receiverQuery = receiver
    ? `&receiver=${encodeURIComponent(receiver)}`
    : '';
  const dateQuery = date ? `&date=${encodeURIComponent(date)}` : '';

  const squeals = await faxios.get(
    `/squeals/?${authorQuery}${receiverQuery}${dateQuery}`
  );
  return squeals;
}

export async function addReceiver(squealId, receiver) {
  const squeal = faxios.patch(`/squeals/${squealId}/receivers`, { receiver });
  return squeal;
}

export async function changeReactions(squealId, positive, negative) {
  const squeal = await faxios.patch(`/squeals/${squealId}/reactions`, {
    positive,
    negative,
  });
  return squeal;
}
