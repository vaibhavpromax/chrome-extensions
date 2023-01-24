//Whatever script you write here gets embeded in that active web page for your extension
import { FUNCTION_MAP } from "./map";

console.log("Hello from the webpage");

const messagesFromReactAppListener = (msg, sender, sendResponse) => {
  console.log("[content.js]. Message received", msg);

  try {
    if (msg.type) {
      const runFunction = FUNCTION_MAP[msg.type];
      const response = runFunction();
      sendResponse(response);
    }
  } catch (err) {
    console.log(err);
    // Prepare the response object with information about the site
    const response = {
      msg: "No Function available",
    };
    sendResponse(response);
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

// code which listens to messages from the react app and sends back the response to the react app to update the UI accordingly.
// this uses chrome APIs to listen to messages from the react app.
