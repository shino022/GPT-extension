import React, { useCallback, useState } from "react";
import { IconCopy } from "@tabler/icons-react";
const Response = ({ response }) => {
  const [showCopyIconText, setShowCopyIconText] = useState(false);
  const [copyIconText, setCopyIconText] = useState('Copy');
  const [hasCopied, setHasCopied] = useState(false);
  const onClickCopyButton = useCallback(
    (e) => {
      console.log(response);
      navigator.clipboard.writeText(response);
      setCopyIconText('Copied');
      setHasCopied(true);
    },
    [response]
  );

  const onHover = () => {
    setShowCopyIconText(true);
  };

  const onLeave = () => {
    setShowCopyIconText(false);
  };

  return (
    <div>
      <IconCopy
        className={hasCopied && "btn-disabled"}
        id="copy-icon"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClickCopyButton}
      />
      {showCopyIconText && <div id="copy-icon-text">{copyIconText}</div>}
      <div id="response-text">
        {response}
      </div>
    </div>
  );
};

export default Response;
