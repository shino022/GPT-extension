import React, { useState, useEffect } from "react";
import "./Content.css";
import Popup from "./Popup";
import { useSelector, useDispatch } from 'react-redux'
import { togglePopup, setCommand } from './contentScriptSlice'

const ContentScript = () => {
  const showPopup = useSelector((state) => state.contentScript.showPopup);
  const command = useSelector((state => state.contentScript.command));
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [selectedText, setSelectedText] = useState("");
  useEffect(() => {
    const onMessageFromPopup = () => {chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      dispatch(setCommand(request.command));
      if (request.q == "command") {
        // sendResponse({ command });
      } else if (request.q == "setCommand") {
        console.log(request);
        // sendResponse({ command });
      }
    });}
    onMessageFromPopup();
    return () => {onMessageFromPopup()};
  }, [])
  useEffect(() => {
    const handleMouseUp = async (e) => {
      const selectedText = document.getSelection().toString();
      setResponse("");
      console.log(showPopup);
      console.log(`${command}: ${selectedText}`);
      /*
      if pop up is already on -> close popup
      if there's no selectoin -> don't open popup
      */
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
