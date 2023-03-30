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



  const root = createRoot(appContainer);
  root.render(
    <Provider store={store}>
      <ContentScript />
    </Provider>
  );
}

init();
