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
  } catch {
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
