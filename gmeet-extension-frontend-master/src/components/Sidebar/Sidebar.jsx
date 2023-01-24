import React from "react";
import "./Sidebar.scss";
import { ReactComponent as Logo } from "../../assets/gmeet.svg";
import { ReactComponent as CreatePoll } from "../../assets/createPoll.svg";
import { ReactComponent as Participants } from "../../assets/people.svg";

const Sidebar = ({ page, setPage, off }) => {
  return (
    <div className={`sidebar`}>
      <div className="logo">
        <Logo
          onClick={() => {
            setPage((prevState) => {
              if (prevState === 0) {
                return 0;
              } else {
                return 1;
              }
            });
          }}
        />
      </div>
      {off ? (
        <>
          {" "}
          <div className={`${page === 2 ? "active" : ""}`}>
            <CreatePoll
              onClick={() => {
                setPage(2);
              }}
            />
          </div>
          <div className={`${page === 3 ? "active" : ""}`}>
            <Participants
              onClick={() => {
                setPage(3);
              }}
            />
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Sidebar;
