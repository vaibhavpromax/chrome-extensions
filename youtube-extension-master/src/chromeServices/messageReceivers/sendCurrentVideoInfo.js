const videoElement = document.getElementsByClassName("html5-main-video")[0];

export const sendCurrentVideoInfo = () => {
  return {
    msg: "vdo Element extracted",
    info: {
      paused: videoElement.paused,
      playbackSpeed: videoElement.playbackRate,
    },
  };
};

//web scraping the video Info
