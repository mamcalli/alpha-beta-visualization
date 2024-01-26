"use client";
/*
This component displays the current alpha and beta values
*/

import React, { useContext } from "react";
import { TreeContext } from "../utils/TreeContext";

function AlphaBetaDisplay() {
  const { alpha, beta, currentStep } = useContext(TreeContext);

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <strong>Alpha: </strong>
        {alpha}
      </div>
      <div>
        <strong>Beta: </strong>
        {beta}
      </div>
      <div>
        <strong> Step: </strong>
        {currentStep.action ? currentStep.action : "Algorithm not Ran"}
      </div>
    </div>
  );
}

export default AlphaBetaDisplay;
