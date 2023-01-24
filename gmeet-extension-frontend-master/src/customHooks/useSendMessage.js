import React from "react";

//It is a custom hook made to send message to a current opened tab

const useSendMessage = () => {
  const sendMessage = (message, callbackFunction) => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          url: "https://meet.google.com/*",
        },
        (tabs) => {
          console.log(tabs);
          chrome.tabs.sendMessage(
            // Current tab ID
            tabs[0].id || 0,

            //Message sent to tab(generally an object)
            message,

            // Callback executed when the content script sends a response
            (response) => {
              // callbackFunction(response);
              callbackFunction(response);
            }
          );
        }
      );
  };

  return [sendMessage];
};

export default useSendMessage;
