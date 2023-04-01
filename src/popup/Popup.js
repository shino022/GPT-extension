import React, { useState, useEffect } from "react";
import "./Popup.css";
import { useSelector, useDispatch } from "react-redux";
import { setCommand } from "./popupSlice";
import Switch from "react-switch";

const Popup = () => {
  const command = useSelector((state) => state.popup.command);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    (async() => {
      const res = await chrome.storage.sync.get(["badge"])
      const currentBadge = res.badge;
      if (currentBadge == "ON") {
        setChecked(true);
      } else {
        setChecked(false);
      }
    })();
    
  },[]);
  useEffect(() => {
    const messageToContent = async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      chrome.tabs.sendMessage(
        tab.id,
        //   {q: "setCommand", command},
        { q: "setCommand", command }
        // (res) => setPlaceholder(res.command)
      );
    };
    messageToContent();
  }, [command]);

  const handleChange = (e) => setInputValue(e.currentTarget.value);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setInputValue("");
    dispatch(setCommand(e.target[0].value));
    //send a message to content to set the commend with the new input
  };

  const handleToggle = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const res = await chrome.storage.sync.get(["badge"])
    const prevState = res.badge;
    const nextState = prevState === "ON" ? "OFF" : "ON";
    await chrome.action.setBadgeText({
      text: nextState,
    });
    await chrome.storage.sync.set({ badge: nextState });
    if (nextState === "ON") {
      // send a message to content script
      setChecked(true);
      chrome.tabs.sendMessage(tab.id, { q: "turnOn" });
    } else if (nextState === "OFF") {
      setChecked(false);
      chrome.tabs.sendMessage(tab.id, { q: "turnOff" });
    }
  };

  return (
    <div>
      <Switch
        onChange={handleToggle}
        checked={checked}
        onColor="#70afd4"
        onHandleColor="#156bb5"
        handleDiameter={16}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 3px 0px rgba(0, 0, 0, 0.4)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={12}
        width={28}
        className="react-switch"
        id="material-switch"
      />
      <form onSubmit={handleFormSubmit} id="form">
        <label>Enter a command</label>
        <input
          type="text"
          name="command"
          id="command"
          onChange={handleChange}
          placeholder={command}
          value={inputValue}
        />
      </form>
    </div>
  );
};

export default Popup;
