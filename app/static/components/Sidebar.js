/*
This component will contain the AlphaBetaDisplay and ControlPanel.
*/
"use client";

// import React from "react";
// import AlphaBetaDisplay from "./AlphaBetaDisplay";
// import ControlPanel from "./ControlPanel";

// function Sidebar() {
//   return (
//     <div className="sidebar">
//       <div className="information">
//         ⓘ <br />
//         Press Run Alpha-Beta to execute the algorithm. <br />
//         Navigate through the steps of the algorithm using the next and previous
//         buttons. <br />
//         Right Click a Node to edit, delete, or add a child. <br />
//       </div>
//       {/* <AlphaBetaDisplay /> */}
//       <ControlPanel />
//     </div>
//   );
// }

// export default Sidebar;

import React from "react";
import ControlPanel from "./ControlPanel";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <ControlPanel />
      </div>
      <div className="information">
        ⓘ <br />
        Press Run Alpha-Beta to execute the algorithm. <br />
        Navigate through the steps of the algorithm using the next and previous
        buttons. <br />
        Right Click a Node to edit, delete, or add a child. <br />
      </div>
    </div>
  );
}

export default Sidebar;