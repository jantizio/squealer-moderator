import { faxios } from '../utils/faxios.mjs';

export async function getChannels() {
  const channels = await faxios.get('/channels/');
  return channels;
}

export async function changeChannelDescription(channelName, description) {
  const channel = await faxios.put(
    `/channels/${channelName}/description`,
    description
  );
  return channel;
}

export async function deleteChannel(channelName) {
  await faxios.delete(`/channels/${channelName}`);
  const channels = await getChannels();
  return channels;
}

export async function addChannel(channel) {
  await faxios.post('/channels/', channel);
  const channels = await getChannels();
  return channels;
}
