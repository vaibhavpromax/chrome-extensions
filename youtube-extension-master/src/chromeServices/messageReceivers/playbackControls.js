const videoElement = document.getElementsByClassName("html5-main-video")[0];

export const increasePlaybackSpeed = () => {
  videoElement.playbackRate += 0.25;
  const currentPlaybackSpeed = videoElement.playbackRate;
  return { msg: "speed increased", currentPlaybackSpeed };
};

export const decreasePlaybackSpeed = () => {
  videoElement.playbackRate -= 0.25;
  const currentPlaybackSpeed = videoElement.playbackRate;
  return { msg: "speed decreased", currentPlaybackSpeed };
};

export const getPlaybackSpeed = () => {
  let currentPlaybackSpeed = videoElement.playbackRate;
  return { msg: "speed fetched", currentPlaybackSpeed };
};

export const setPlaybackSpeed = (playbackSpeed) => {
  videoElement.playbackRate = playbackSpeed;
  return { msg: "speed set", playbackSpeed };
};

//manages speed of playback speed of video
