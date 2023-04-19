import React from "react";
import Response from "./Response";

const Popup = ({ response, loading  }) => {
  return(
    <div id="content-popup">
      {loading ? <div id="content-popup-loading">Loading...</div> : <Response response={response} />}
    </div>
  )
}

export default Popup;