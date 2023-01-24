import React, { useState } from "react";
import { Socket } from "socket.io";
import "./CreatePoll.scss";

const CreatePoll = ({ socket, roomName }) => {
  const [numOfOption, setNumOfOption] = useState();
  const [pollingQuestion, setPollingQuestion] = useState();
  const [options, setOptions] = useState({});

  // this event is triggered when the user clicks the create poll button in the room page and sends the number of options to the background script.
  const sendPoll = () => {
    socket.emit("insertPoll", roomName, {
      text: pollingQuestion,
      total_votes: [],
      // options: [
      //   { option: "option A", votes: [] },
      //   { option: "option B", votes: [] },
      // ],
      options,
      createdBy: socket.id,
      createdAt: Date.now(),
    });

    setNumOfOption(0);
    setOptions({});
    setPollingQuestion("");
  };

  const handleOption = async (e, i, selectedOption) => {
    let option = { ...options };
    option[i] = selectedOption;
    await setOptions(Object.values(option));
  };

  return (
    <div className="create-poll">
      <div className="heading">Start Poll</div>
      <div>
        <label>Your Question</label>
        <textarea
          className="form-control form-control-alternative text-dark"
          placeholder={`Enter your question`}
          rows="3"
          value={pollingQuestion}
          onChange={(e) => setPollingQuestion(e.target.value)}
        />
      </div>
      <div>
        <label>Number of options </label>
        <input
          className="form-control form-control-alternative"
          type="number"
          placeholder="Enter number of options"
          value={numOfOption}
          min={0}
          onChange={(e) => {
            setOptions({});
            setNumOfOption(parseInt(e.currentTarget.value, 10));
          }}
        ></input>
      </div>
      <div>
        {!!numOfOption &&
          [...Array(numOfOption)].map((el, index) => (
            <>
              <label>Option {index + 1}</label>
              <textarea
                id={index + 1}
                key={index}
                className="form-control form-control-alternative text-dark"
                placeholder={`Enter option ${index + 1}`}
                rows="2"
                value={!!options[index]?.option ? options[index]?.option : ""}
                onChange={(e) =>
                  handleOption(e, index, {
                    option: e.target.value,
                    votes: [],
                  })
                }
              />
            </>
          ))}
      </div>
      {numOfOption > 0 && (
        <button
          className="create"
          onClick={() => {
            sendPoll();
          }}
        >
          Create
        </button>
      )}
    </div>
  );
};

export default CreatePoll;
