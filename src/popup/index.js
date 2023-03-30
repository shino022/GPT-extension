import React from "react";
import { createRoot } from "react-dom/client";
import Popup from "./Popup";
import store from "./store";
import { Provider } from "react-redux";

async function init() {
  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);

  if (!appContainer) {
    throw new Error("Cannot find appContainer");
  }
  const [tab] = await chrome.tabs.query({active: true, currentWindow: true})
  chrome.tabs.sendMessage(
    tab.id,
    {q: "command", command: localStorage.getItem("command") || ""},
    (res) => setPlaceholder(res.command)
  )

  const root = createRoot(appContainer);
  root.render(
    <Provider store={store}>
      <Popup />
    </Provider>
  );
}

init();
