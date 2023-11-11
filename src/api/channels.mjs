export async function getChannels() {
  const response = await fetch('../../db/channels.json');
  const channels = await response.json();
  return channels;
}
