import { faxios } from "../utils/faxios.mjs";

export async function getChannels() {
  const channels = await faxios.get("/db/channels.json")
  return channels;
}

export async function changeChannelDescription(channelName, description) {
  const channels = await getChannels();
  const channel = channels.find((channel) => channel.name === channelName);
  channel.description = description;

  return channel;
}

export async function deleteChannel(channelName) {
  const channels = await getChannels();
  const channelIndex = channels.findIndex(
    (channel) => channel.name === channelName
  );
  channels.splice(channelIndex, 1);
  return channels;
}

export async function addChannel(channel) {
  const channels = await getChannels();
  channels.push(channel);
  return channels;
}
