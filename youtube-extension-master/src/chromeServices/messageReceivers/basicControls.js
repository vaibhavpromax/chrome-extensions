const videoElement = document.getElementsByClassName("html5-main-video")[0];

export const changeVideoRunningStatus = () => {
  !videoElement.paused ? videoElement.pause() : videoElement.play();
  return { msg: "status changed", running: !videoElement.paused }; //running:1 means running
};

export const increaseCurrentTime = () => {
  console.log(videoElement.currentTime);
  videoElement.currentTime = videoElement.currentTime + 10;

  return {
    msg: "currentTime increased",
    currentTime: videoElement.currentTime,
  };
};

export const decreaseCurrentTime = () => {
  videoElement.currentTime = videoElement.currentTime - 10;

  return {
    msg: "currentTime decreased",
    currentTime: videoElement.currentTime,
  };
};

//pause play
