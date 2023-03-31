chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF'
  });
});
const handleGetBadge = async (sender, sendResponse) => {
  const badge = await chrome.action.getBadgeText({ tabId: sender.tab.id });
  console.log(badge);
  // able to fetch and printed but can't send
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

