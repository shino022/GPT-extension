//default settings on install
chrome.runtime.onInstalled.addListener((async ()=>{
  const res = await chrome.storage.sync.get(["badge"])
  chrome.action.setBadgeText({
    text: res.badge || 'OFF'
  });
}))
//update badge text
chrome.tabs.onUpdated.addListener((async ()=>{
  const res = await chrome.storage.sync.get(["badge"])
  chrome.action.setBadgeText({
    text: res.badge || 'OFF'
  });
}))

const handleGetBadge = async (sender, sendResponse) => {
  const badge = await chrome.action.getBadgeText({ tabId: sender.tab.id });
  sendResponse({badge});
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(request, sender);
    if (request === "get-badge-text"){
      handleGetBadge(sender, sendResponse);
    }
    return true;
  }
);

