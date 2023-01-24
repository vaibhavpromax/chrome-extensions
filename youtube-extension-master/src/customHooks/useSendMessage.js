import React from "react";

//It is a custom hook made to send message to a current opened tab

const useSendMessage = () => {
  const sendMessage = (message, callbackFunction) => {
    chrome.tabs &&
      chrome.tabs.query(
        {
          active: true,
          currentWindow: true,
        },
        (tabs) => {
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

// it is a custom hook used to send messages to the web page and receive response from it. It uses Chrome API to send message to the web page and receive response from it.
