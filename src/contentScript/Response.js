import React, { useCallback, useState } from "react";
import { IconCopy } from "@tabler/icons-react";
const Response = ({ response }) => {
  const onClickCopyButton = useCallback(
    (e) => {
      console.log(response);
      navigator.clipboard.writeText(response);
    },
    [response]
  );
  const [showCopyIconText, setShowCopyIconText] = useState(false);
  const onHover = () => {
    setShowCopyIconText(true);
  };
  const onLeave = () => {
    setShowCopyIconText(false);
  };
  return (
    <div>
      <IconCopy
        id="copy-icon"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClickCopyButton}
      />
      {showCopyIconText && <div id="copy-icon-text">Copy</div>}
      <div id="response-text">
        {response}
      </div>
    </div>
  );
};

export default Response;
