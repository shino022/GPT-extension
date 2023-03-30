import React from "react";
import { createRoot } from "react-dom/client";
import ContentScript from "./ContentScript";
import store from "./store";
import { Provider } from "react-redux";

function init() {
  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);

  if (!appContainer) {
    throw new Error("Cannot find appContainer");
  }

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.q == "command") {
      // sendResponse({ command });
    } else if (request.q == "setCommand") {
      console.log(request);
      // sendResponse({ command });
    }
  });

  const root = createRoot(appContainer);
  root.render(
    <Provider store={store}>
      <ContentScript />
    </Provider>
  );
}

init();
