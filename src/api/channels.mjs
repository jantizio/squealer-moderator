export async function getChannels() {
  const response = await fetch('../../db/channels.json');
  const channels = await response.json();
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
