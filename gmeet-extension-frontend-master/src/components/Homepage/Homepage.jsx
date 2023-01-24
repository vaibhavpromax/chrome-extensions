import React, { useState } from "react";
import "./Homepage.scss";
import logo from "./../../assets/homepage.png";

var url = "";
chrome.tabs.query(
  {
    active: true,
    url: "https://meet.google.com/*",
  },
  (tabs) => {
    url = tabs[0].url;
  }
);

const Homepage = ({ socket, connected }) => {
  const [name, setName] = useState("");
  const [joining, setJoining] = useState(false);

  const joinRoom = (e) => {
    // this event is sent to the background script to join the room and get the participants
    if (name === "") {
      return;
    }
    setJoining(true);
    socket.emit(
      "joinRoom",
      url.substring(
        url.lastIndexOf("/") + 1,
        url.indexOf("?") === -1 ? url.length : url.indexOf("?")
      ),
      name
    );
  };

  return (
    <div className="homepage d-flex ">
      <form class="sub-form">
        <div className="d-flex justify-content-center ">
          <img
            width="100"
            // src="https://img.icons8.com/external-kiranshastry-gradient-kiranshastry/64/000000/external-user-interface-kiranshastry-gradient-kiranshastry.png"
            src={logo}
          />
        </div>
        <div class="input-contain mt-3">
          <input
            type="text"
            placeholder="Enter your name"
            required
            maxlength="100"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            name="user_name"
          />

          <div className="allsub">
            <button
              className="submit"
              disabled={joining || !connected}
              onClick={() => {
                if (!joining && connected) {
                  joinRoom();
                }
              }}
            >
              {!connected ? "Connecting..." : "Join"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Homepage;
