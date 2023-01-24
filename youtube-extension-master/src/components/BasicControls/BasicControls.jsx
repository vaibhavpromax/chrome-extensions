import React, { useState, useEffect } from "react";
import "./BasicControls.scss";
import useVideoInfo from "../../customHooks/useVideoInfo";
import useSendMessage from "../../customHooks/useSendMessage";
import { changeCurrentTime } from "../../chromeServices/messageReceivers/basicControls";

var videoID = "";
let url = "";
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  url = tabs[0]["url"];
  if (url.includes("youtube.com")) {
    videoID = url.substring(
      url.indexOf("=") + 1,
      url.indexOf("&") !== -1 ? url.indexOf("&") : url.length
    );
  }
});

const BasicControls = ({ setPage, videoInfo }) => {
  const [isPlaying, setIsPlaying] = useState(1);
  const { basicData, loading, error, getBasicInfo } = useVideoInfo();
  const [sendMessage] = useSendMessage();
  const snippets = basicData?.items[0]?.snippet;
  const thumbnailURL = snippets?.thumbnails?.medium?.url;
  const title = snippets?.title;
  const channelTitle = snippets?.channelTitle;

  useEffect(() => {
    getBasicInfo(videoID);
  }, []);

  useEffect(() => {
    if (error === "No VideoID") {
      setPage(-1);
    }
  }, [error]);

  useEffect(() => {
    setIsPlaying(!videoInfo.paused);
  }, [videoInfo]);

  const changeVideoRunningStatus = () => {
    const callbackFunction = (response) => {
      setIsPlaying(response.running);
      console.log(response);
    };
    sendMessage({ type: "CHANGE_VIDEO_RUNNING_STATUS" }, callbackFunction);
  };

  const changeCurrentTime = (increase) => {
    const callbackFunction = (response) => {
      console.log(response);
    };
    if (increase) {
      sendMessage({ type: "INCREASE_CURRENT_TIME" }, callbackFunction);
    } else {
      sendMessage({ type: "DECREASE_CURRENT_TIME" }, callbackFunction);
    }
  };

  return (
    <div className="basic-controls">
      <div className="content">
        <div className="video-info">
          <p>youtube.com</p>
          <div className="title">
            <marquee>
              <h4>{title}</h4>
            </marquee>
          </div>
          <div className="channel-title">
            <h5>{channelTitle} </h5>
          </div>

          <div className="controls">
            <div className="general-controls">
              <button
                className="custom-btn"
                onClick={() => {
                  changeCurrentTime(false);
                }}
              >
                <a>
                  <i class="fas fa-backward"></i>
                </a>
              </button>
              <button
                className="custom-btn "
                onClick={() => {
                  changeVideoRunningStatus();
                }}
              >
                {!isPlaying ? (
                  <i class="fas fa-play"></i>
                ) : (
                  <i class="fas fa-pause"></i>
                )}
              </button>
              <button
                className="custom-btn"
                onClick={() => {
                  changeCurrentTime(true);
                }}
              >
                <a>
                  <i class="fas fa-forward"></i>
                </a>
              </button>
            </div>
            <div>
              <button className="custom-btn">
                <a
                  target="_blank"
                  href={`https://www.youtubepp.com/watch?v=${videoID}`}
                  rel="noreferrer"
                >
                  <i class="fas fa-download"></i>
                </a>
              </button>
            </div>
          </div>
        </div>

        <div className="thumbnail">
          <img src={thumbnailURL} alt="VideoThumbnail" />
        </div>
      </div>
    </div>
  );
};

export default BasicControls;
