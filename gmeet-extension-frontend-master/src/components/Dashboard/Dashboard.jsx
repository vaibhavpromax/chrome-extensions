import React, { useState } from "react";
import "./Dashboard.scss";

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

const Dashboard = ({
  polls,
  socket,
  roomName,
  participants,
  selectedOption,
  setSelectedOption,
  submittedQuestion,
  setSubmittedQuestion,
  result,
  setResult,
}) => {
  // const [selectedOption, setSelectedOption] = useState({});
  // const [submittedQuestion, setSubmittedQuestion] = useState([]);
  // const [result, setResult] = useState([]);

  const hanldeSelection = async (quesIndex, selectedOptions) => {
    let selected = { ...selectedOption };
    selected[quesIndex] = selectedOptions;
    await setSelectedOption(selected);
  };

  const handleSubmit = (quesIndex) => {
    console.log("selected", selectedOption[quesIndex], roomName);

    if (!selectedOption[quesIndex]) {
      alert("Please Select an option");
      return;
    }

    setSubmittedQuestion((prev) => [...prev, quesIndex]);

    socket.emit(
      "insertVoterId",
      roomName,
      selectedOption[quesIndex].quesIndex,
      selectedOption[quesIndex].optionIndex
    );
  };
  // this event is triggered when the user clicks on the submit button in the poll page of the room and sends the selected option to the background script.

  socket.on("voterAdded", (data) => {
    console.log("voter data", data);
    setResult(data);
  });
  // this event is triggered when the background script sends the result of the poll to the frontend.

  return (
    <div className="dashboard ">
      <div className="heading pt-3">dashboard</div>
      <div className="all-question">
        {polls.map((poll, quesIndex) => {
          const isSubmitted = !!submittedQuestion?.some((index) => {
            return Number(index) === Number(quesIndex);
          });
          return (
            <>
              <div className="quiz-container" id="quiz">
                <div className="quiz-header">
                  <div className="poll-header">
                    <h2 className="questions">{poll.text}</h2>
                    <h6>
                      by&nbsp;
                      {participants.map((participant) => {
                        if (participant.user_id === poll.createdBy) {
                          return participant.displayName;
                        }
                      })}
                    </h6>
                  </div>
                  <ul>
                    {poll.options.map((option, optionIndex) => {
                      const optionVotes =
                        result[quesIndex]?.options[optionIndex]?.votes.length;
                      const totalOptionVotes =
                        result[quesIndex]?.total_votes.length;
                      const votePercentage = (
                        (optionVotes * 100) /
                        totalOptionVotes
                      ).toFixed(2);
                      return (
                        <li>
                          <input
                            type="radio"
                            name={quesIndex}
                            className="mx-2"
                            disabled={isSubmitted}
                            onClick={() => {
                              hanldeSelection(quesIndex, {
                                quesIndex,
                                optionIndex,
                              });
                            }}
                          />
                          <div className="d-flex w-100">
                            <div>{option.option}</div>
                            {!!submittedQuestion.length && isSubmitted && (
                              <>
                                {/* {optionVotes} / {totalOptionVotes} */}
                                <div
                                  className="progress mx-4"
                                  style={{ height: "20px", width: "100%" }}
                                >
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{
                                      width: `${votePercentage}%`,
                                    }}
                                    aria-valuenow={optionVotes}
                                    aria-valuemin="0"
                                    aria-valuemax={totalOptionVotes}
                                  >
                                    {votePercentage} %
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                {!!submittedQuestion.length && isSubmitted ? (
                  <>
                    {poll.createdBy === socket.id && (
                      <div class="student-result-container">
                        <h3 className="result-heading">Result</h3>
                        <ul>
                          {result[quesIndex]?.total_votes.map((voterId) => {
                            return (
                              <li className="d-flex justify-content-between">
                                <div>
                                  {participants.map((participant) => {
                                    if (participant.user_id === voterId) {
                                      return participant.displayName;
                                    }
                                  })}
                                </div>
                                <div>
                                  {result[quesIndex]?.options.map((opt, i) => {
                                    if (
                                      opt.votes.some((el) => el === voterId)
                                    ) {
                                      // return opt.option;
                                      return `Option ${i + 1}`;
                                    }
                                  })}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="">
                      <button
                        onClick={() => handleSubmit(quesIndex)}
                        type="button"
                        className="sub-button"
                        id="button"
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
