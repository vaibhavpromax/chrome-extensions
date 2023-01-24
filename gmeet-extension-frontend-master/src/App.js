import "./App.scss";
import React, { useEffect, useState } from "react";
import useSendMessage from "./customHooks/useSendMessage";
import Homepage from "./components/Homepage/Homepage";
import { socket } from "./customHooks/useSockets";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import CreatePoll from "./components/CreatePoll/CreatePoll";
import Participants from "./components/Participants/Participants";

//
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
// this snippet helps in extracting url from the current tab

function App() {
  const [page, setPage] = useState(0);
  const [connected, setConnected] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [polls, setPolls] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [selectedOption, setSelectedOption] = useState({});
  const [submittedQuestion, setSubmittedQuestion] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    socket.on("connect", function () {
      setConnected(true);
      console.log("You are now connected  ");
    });
    socket.on("roomInfo", (data) => {
      console.log(data);
      setParticipants(data.participants);
      setInactiveUsers(data.inactiveUsers);
      setRoomName(data.roomName);
      setPolls(data.polls);
      if (page === 0) {
        setPage(1);
      }
    });
    socket.on("roomInfoUpdationAtIntervals", (data) => {
      console.log(data);
      setParticipants(data.participants);
      setInactiveUsers(data.inactiveUsers);
      setRoomName(data.roomName);
      setPolls(data.polls);
    });
  }, []);
  console.log(socket.id);

  // this socket event receives the room information at the time of joining the room

  // this socket event receives the poll information at the time of creating a poll
  socket.on("pollAdded", (data) => {
    console.log("pole received", data);
    setPolls(data);
  });

  // this is the structure of the data that is sent to the server
  return (
    <div className="App">
      <Sidebar page={page} setPage={setPage} off={page} />
      {page === 0 ? <Homepage socket={socket} connected={connected} /> : ""}
      {page === 1 ? (
        <Dashboard
          polls={polls}
          participants={participants}
          socket={socket}
          roomName={roomName}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          submittedQuestion={submittedQuestion}
          setSubmittedQuestion={setSubmittedQuestion}
          result={result}
          setResult={setResult}
        />
      ) : (
        ""
      )}
      {page === 2 ? <CreatePoll socket={socket} roomName={roomName} /> : ""}
      {page === 3 ? (
        <Participants
          participants={participants}
          socket={socket}
          inactiveUsers={inactiveUsers}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
