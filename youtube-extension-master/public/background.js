//whatever you write here runs whenever you open extension or you install it for the first time

chrome.runtime.onInstalled.addListener(() => {
  console.log("installed");
  //check google extensions docs to know about whats written below
  // https://developer.chrome.com/docs/extensions/mv3/
  // chrome.storage.local.set({
  //   cookie: "",
  //   personalData: "",
  //   scrapedData: "",
  // })
});
