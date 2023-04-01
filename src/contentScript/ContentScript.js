import React, { useState, useEffect } from "react";
import "./Content.css";
import Popup from "./Popup";
import { useSelector, useDispatch } from 'react-redux'
import { togglePopup, setCommand, turnoffPopup } from './contentScriptSlice'
const ContentScript = () => {
  const showPopup = useSelector((state) => state.contentScript.showPopup);
  const command = useSelector((state => state.contentScript.command));
  const isOn = useSelector((state => state.contentScript.isOn));
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [selectedText, setSelectedText] = useState("");
  useEffect(() => {
    const onMessageFromPopup = () => {chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.q == "command") {
        dispatch(setCommand(request.command));
      } else if (request.q == "setCommand") {
        dispatch(setCommand(request.command));
      } 
    });}
    onMessageFromPopup();
    return () => {onMessageFromPopup()};
  }, [])
  useEffect(() => {
    const handleMouseUp = async (e) => {
      if (e.target.closest("#content-script")) {
        return;
      }
      const selectedText = document.getSelection().toString();
      setResponse("");
      console.log(showPopup);
      console.log(`${command}: ${selectedText}`);
      /*
      if pop up is already on -> close popup and return
      if there's no selectoin -> don't open popup and return
      if badge is off -> return
      */

      const res = await chrome.runtime.sendMessage('get-badge-text');
      
      if (res.badge == "OFF") {
        dispatch(turnoffPopup());
        return; 
      }
      if (showPopup) {
        dispatch(togglePopup());
        return;
      }
      if (!selectedText) {
        return;
      }
      dispatch(togglePopup());

      setLoading(true);
      const response = await fetch("https://2893571.xyz:4000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: `${command}: ${selectedText}`,
        }),
      });
      const data = await response.json();
      setLoading(false);

      console.log(data);
      if (response.status == 400) {
        setResponse(data.error.message);
      } else {
        setResponse(data.summary);
      }
    }
    addEventListener("mouseup", handleMouseUp);
    return () => removeEventListener("mouseup", handleMouseUp);
  }, [showPopup, command]);

  return (
    <div id="content-script">
      {showPopup && <Popup loading={loading} response={response} />}
    </div>
  );
};

export default ContentScript;
