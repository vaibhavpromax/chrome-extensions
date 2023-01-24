import React, { useState, useEffect } from "react";
import "./AdvancedControls.scss";
import useSendMessage from "../../customHooks/useSendMessage";

const AdvancedControls = ({ videoInfo }) => {
  const [sendMessage] = useSendMessage();
  const [currentPlaybackSpeed, setCurrentPlaybackSpeed] = useState("1");
  const playbackSpeedIncrease = () => {
    const callbackFunction = (response) => {
      setCurrentPlaybackSpeed(response.currentPlaybackSpeed);
      console.log(response);
    };
    sendMessage({ type: "INCREASE_PLAYBACK_SPEED" }, callbackFunction);
  };

  const playbackSpeedDecrease = () => {
    const callbackFunction = (response) => {
      setCurrentPlaybackSpeed(response.currentPlaybackSpeed);
      console.log(response);
    };
    sendMessage({ type: "DECREASE_PLAYBACK_SPEED" }, callbackFunction);
  };

  useEffect(() => {
    setCurrentPlaybackSpeed(videoInfo.playbackSpeed);
  }, [videoInfo]);

  return (
    <div className="advanced-controls">
      <div className="content">
        <div className="title">Playback Speed:</div>
        <div className="speed-count">{currentPlaybackSpeed}x</div>
        <div className="controls">
          <button
            className="custom-btn"
            onClick={() => playbackSpeedIncrease()}
            disabled={currentPlaybackSpeed >= 10}
          >
            +
          </button>
          <button
            className="custom-btn"
            onClick={() => playbackSpeedDecrease()}
            disabled={currentPlaybackSpeed <= 0.25}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedControls;
