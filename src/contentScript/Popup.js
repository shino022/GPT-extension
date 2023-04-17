import React from "react";
import Response from "./Response";

const Popup = ({ response, loading  }) => {
  return(
    <div id="content-popup">
      <div>
        {/* {loading ? <div>Loading</div> : <Response response={response} />} */}
        <Response response={response} />

      </div>
    </div>
  )
}

export default Popup;