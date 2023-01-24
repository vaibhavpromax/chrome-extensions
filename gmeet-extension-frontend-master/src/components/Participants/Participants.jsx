import React from "react";
import { socket } from "../../customHooks/useSockets";
import "./Participants.scss";

const Participants = ({ participants, inactiveUsers }) => {
  return (
    <>
      <div className="list-wrapper">
        <div className="heading pt-3">Participants</div>
        <ul className="list">
          {participants.map((participant, index) => {
            return (
              <li className="list-item" key={index}>
                <div>
                  <i className="fas fa-user list-item-image" />
                </div>
                <div className="list-item-content">
                  <div>
                    {participant.displayName}{" "}
                    {participant.user_id === socket.id ? ` (You)` : ``}
                  </div>
                  <div>
                    {inactiveUsers.some((el) => el === participant.user_id) ? (
                      <div className="dot" style={{ background: "red" }} />
                    ) : (
                      <div className="dot " style={{ background: "green" }} />
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Participants;
