import React, { useState, useEffect } from "react";
import "./Popup.css";
import { useSelector, useDispatch } from 'react-redux'
import { setCommand } from './popupSlice'

const Popup = () => {
  const command = useSelector((state) => state.popup.command);
  const dispatch = useDispatch();
  useEffect(() => {
    const messageToContent = async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      chrome.tabs.sendMessage(
        tab.id,
        //   {q: "setCommand", command},
        { q: "setCommand", command },
        // (res) => setPlaceholder(res.command)
      );
    };
    messageToContent();
  }, [command]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    dispatch(setCommand(e.target[0].value));
    //send a message to content to set the commend with the new input
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} id="form">
        <label>Enter a command for text processing</label>
        <input type="text" name="command" id="command" placeholder={command} />
      </form>
      <div>
        <h1>This is a popup section</h1>
      </div>
    </div>
  );
};

export default Popup;
