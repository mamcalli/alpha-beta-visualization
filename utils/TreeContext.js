"use client";
/*
Manage state changes across the application. 
This will include tree data, alpha-beta values, and algorithm steps.
*/

import React, { useEffect, createContext, useState } from "react";
import alphaBeta from "./alphaBeta"; 
import { generateRandomTree, collectValueNodes, generateUniqueID } from "./treeGenerator"; 

export const TreeContext = createContext();

export const TreeProvider = ({ children }) => {
  const [depth, setDepth] = useState(3); // Set initial depth

  // represents tree structure
  const [treeData, setTreeData] = useState(() => generateRandomTree(depth)); // Initialize with a random tree
  // alpha and beta values
  const [alpha, setAlpha] = useState(-Infinity);
  const [beta, setBeta] = useState(Infinity);

  // stores history of steps
  const [steps, setSteps] = useState([]);
  // keeps track of current step's index within 'steps' array
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  // added
  // contains information about the current step
  const [currentStep, setCurrentStep] = useState({});

  /**
   * reportStep captures and logs each step of an algorithm.
   *
   * @param {Object} node - The current node being processed.
   * @param {string} currentId - The unique identifier of the current node.
   * @param {number} alpha - The current alpha value in alpha-beta pruning.
   * @param {number} beta - The current beta value in alpha-beta pruning.
   * @param {string} action - The type of action being taken (e.g., 'updateVal').
   * @param {Object} additional - Any additional data relevant to the step.
   *
   * This function logs the current step and updates the state with the new step information.
   * If the action is 'updateVal', it adds the currentId to the list of evaluated nodes.
   */
  const reportStep = (() => {
    let prunedNodes = [];
    let evaluatedNodes = {};
    console.log("report step evaluated pre", evaluatedNodes);
    return (node, alpha, beta, action, pruned, evaluated) => {
      if (action === "pruned") {
        prunedNodes = [...prunedNodes, ...pruned];
      }

      if (action === "updating") {
        evaluatedNodes[node.id] = evaluated;
        console.log("report step evaluated post", evaluatedNodes);
      }

      const step = {
        node,
        alpha,
        beta,
        action,
        pruned: prunedNodes,
        evaluated: { ...evaluatedNodes },
      };
      setSteps((prevSteps) => [...prevSteps, step]);
    };
  })();

  useEffect(() => {
    console.log("reportStep UE steps:", steps);
  }, [currentStep]); // Dependency array with 'steps'

  /**
   * computeSteps initiates the alpha-beta computation.
   *
   * This function clears the steps array, resets the currentStepIndex, and calls
   * the alphaBeta function with the provided tree data, depth, alpha, beta, and the reportStep function
   * to capture each step.
   */

  const reset = () => {
    setSteps([]);
    setCurrentStepIndex(-1);
    setCurrentStep({
      node: null,
      alpha: -Infinity,
      beta: Infinity,
      pruned: [],
      evaluated: {},
    });
    setAlpha(-Infinity);
    setBeta(Infinity);
  };

  const computeSteps = () => {
    reset();
    setCurrentStep({action: "Start"},);
    console.log("COMPUTE STEPS")
    console.log(currentStep);
    alphaBeta(treeData, depth, -Infinity, Infinity, true, reportStep); // Assuming 'depth' is defined
  };

  useEffect(() => {
    console.log("Updated steps:", steps);
  }, [steps]); // Dependency array with 'steps'

  /**
   * generateNewTree generates a new random tree and resets various state variables.
   *
   * This function initializes a new random tree, resets alpha, beta, history, steps,
   * currentStepIndex, and initializes currentStep with empty arrays and a null active node.
   */
  const generateNewTree = () => {
    const newTree = generateRandomTree(depth); // Example depth, add ability to change
    setTreeData(newTree);
    // Reset alpha, beta, and history values
    reset();
  };

  /**
   * nextStep advances to the next step in the algorithm.
   *
   * This function updates the currentStepIndex and various state variables to display
   * the information for the next step of the algorithm.
   */
  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      console.log("nextStep pre-inc currentStepIndex", currentStepIndex);
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex((prevIndex) => prevIndex + 1);
      const step = steps[nextIndex];
      setCurrentStep({ ...step });

      setAlpha(step.alpha);
      setBeta(step.beta);
    }
  };

  /**
   * prevStep goes back to the previous step in the algorithm.
   *
   * This function updates the currentStepIndex and various state variables to display
   * the information for the previous step of the algorithm.
   */
  const prevStep = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex((prevIndex) => prevIndex - 1);
      const step = steps[prevIndex];
      setCurrentStep({ ...step });

      setAlpha(step.alpha);
      setBeta(step.beta);
    }
  };

  const handleDeleteNode = (nodeId) => {
    console.log("made it to delete");
    const deleteRecursively = (currentNode) => {
      if (currentNode.id === nodeId) {
        return null; // Remove the node
      }
      if (currentNode.children) {
        currentNode.children = currentNode.children
          .map(deleteRecursively)
          .filter((child) => child !== null); // Filter out deleted nodes
      }
      return currentNode;
    };
    console.log(" old treeData:", treeData);
    const newTreeData = deleteRecursively(treeData);
    setTreeData(newTreeData); // Update the state with the new tree
    console.log("treeData:", treeData);
    reset();
  };

  // Function to add a child node
  const handleAddChild = (parentNodeId) => {
    // Logic to add a child node to the specified parent in treeData
    // Update treeData state
    const addChildRecursively = (currentNode) => {
      if (currentNode.id === parentNodeId) {
        // Remove value if exists and add a child node
        delete currentNode.value;
        const childID = generateUniqueID();
        const newChild = {
          id: childID,
          value: Math.floor(Math.random() * 100),
          children: [],
        };
        if (currentNode.children) {
          currentNode.children.push(newChild);
        } else {
          currentNode.children = [newChild];
        }
      } else {
        if (currentNode.children) {
          currentNode.children = currentNode.children.map(addChildRecursively);
        }
      }
      return currentNode;
    };

    const updatedTree = addChildRecursively(treeData);
    setTreeData(updatedTree);
    reset();
  };

  // Function to edit a node's value
  const handleEditNodeValue = (nodeId, newValue) => {
    // Logic to edit the value of a node in treeData
    // Update treeData state
    const editValueRecursively = (currentNode) => {
      if (currentNode.id === nodeId) {
        currentNode.value = newValue; // Update the value
      } else {
        if (currentNode.children) {
          currentNode.children = currentNode.children.map(editValueRecursively);
        }
      }
      return currentNode;
    };

    const updatedTree = editValueRecursively(treeData);
    setTreeData(updatedTree);
    reset();
  };

  return (
    <TreeContext.Provider
      value={{
        treeData,
        setTreeData,
        alpha,
        beta,
        currentStep,
        setCurrentStep,
        depth,
        setDepth,
        generateNewTree,
        computeSteps,
        nextStep,
        prevStep,
        handleDeleteNode,
        handleAddChild,
        handleEditNodeValue,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
};
