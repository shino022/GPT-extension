import React from "react";
import "./Popup.css";

function Popup() {
  const handleFormSubmit = async (e) => {
    // const command = e.target[0].value;
    //send a message to content to set the commend with the new input
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    console.log("message sent");
    chrome.tabs.sendMessage(
      tab.id,
      //   {q: "setCommand", command},
      { q: "setCommand", command: "explain it" },
      (res) => setPlaceholder(res.command)
    );
  };
  return (
    <div className="w-52 h-20">
      <div>
        <h1 onClick={handleFormSubmit} className="text-center p-5 text-xl">
          This is a popup section
        </h1>
      </div>
    </div>
  );
}

export default Popup;
