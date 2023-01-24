import React, { useEffect, useState } from "react";
import "./Stats.scss";
import usePlaylistInfo from "../../customHooks/usePlaylistInfo";
import moment from "moment";

let url = "";
var playlistID = "";
chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  url = tabs[0]["url"];
  if (url.includes("youtube.com")) {
  }
});
var Query = new URLSearchParams(url.substring(url.indexOf("&") + 1));

const Stats = () => {
  const { getPlaylistInfo, playlistTime, error } = usePlaylistInfo();
  console.log(playlistTime);

  const getInfo = async () => {
    getPlaylistInfo({ playlistID });
  };

  useEffect(() => {
    Query = new URLSearchParams(url.substring(url.indexOf("&") + 1));
    playlistID = Query.get("list");
  }, [url]);

  return (
    <div className="stats">
      <div className="content">
        <button
          onClick={() => {
            getInfo();
          }}
          className="playlist-btn"
        >
          Get Overall Playlist Time
        </button>
        {playlistTime ? (
          <div className="playlist-time">
            {Math.floor(playlistTime / 3600)} hours{" "}
            {Math.floor((playlistTime % 3600) / 60)} minutes{" "}
            {Math.floor((playlistTime % 3600) % 60)} seconds
          </div>
        ) : error ? (
          <div className="playlist-time">{error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default Stats;
