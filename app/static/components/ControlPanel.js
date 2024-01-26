"use client";
/*
Controls for the alpha-beta algorithm 
visualization (next, prev, reset), generate a new tree.
*/

import React, { useContext } from "react";
import { TreeContext } from "../utils/TreeContext";
import styles from "./ControlPanel.module.css";
import AlphaBetaDisplay from "./AlphaBetaDisplay";

function ControlPanel() {
  const { generateNewTree, computeSteps, nextStep, prevStep, depth, setDepth } =
    useContext(TreeContext);

  const handleDepthChange = (event) => {
    const newDepth = parseInt(event.target.value, 10);
    setDepth(newDepth);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <AlphaBetaDisplay />
        {/* Test  */}
      </div>

      <div>
        <button className={styles.button} onClick={computeSteps}>
          Run Alpha-Beta
        </button>
      </div>

      <div className={styles.stepControls}>
        <button className={styles.stepButton} onClick={prevStep}>
          &laquo; Previous
        </button>
        <button className={styles.stepButton} onClick={nextStep}>
          Next &raquo;
        </button>
      </div>

      <div>
        <button className={styles.generateButton} onClick={generateNewTree}>
          Generate New Tree
        </button>
      </div>

      <div className={styles.sliderContainer}>
        <label htmlFor="tree-depth-slider">Tree Depth: {depth + 1}</label>
        <input
          id="tree-depth-slider"
          type="range"
          min="0"
          max="5"
          value={depth}
          onChange={handleDepthChange}
        />
      </div>

    </div>
  );
}

export default ControlPanel;
