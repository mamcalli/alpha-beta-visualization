"use client";

// import "./styles.css";

import React, { useState, useEffect, useRef, useContext } from "react";
import * as d3 from "d3";
import { TreeContext } from "../utils/TreeContext";
import NodeEditModal from './NodeEditModal'; 

const TreeVisualization = () => {
  // Tree Visualization
  const {
    treeData,
    currentStep,
    handleDeleteNode,
    handleAddChild,
    handleEditNodeValue,
  } = useContext(TreeContext);

  // State to manage context menu visibility and position
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    nodeData: null,
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingNode, setEditingNode] = useState(null);

  const initiateEditNodeValue = (nodeData) => {
    setEditingNode(nodeData);
    setIsModalVisible(true);
  };

  const handleSaveEdit = (newValue) => {
    if (editingNode) {
      console.log("here newValue", newValue, editingNode);
      handleEditNodeValue(editingNode.data.id, newValue);
    }
    setIsModalVisible(false);
    setEditingNode(null);
  };

  const handleCancelEdit = () => {
    setIsModalVisible(false);
    setEditingNode(null);
  };

  // Function to show context menu
  const showContextMenu = (event, nodeData) => {
    setContextMenu({
      visible: true,
      x: event.pageX, // Get X position from the event
      y: event.pageY, // Get Y position from the event
      nodeData, // Data of the right-clicked node
    });
    console.log("nodeData", nodeData);
  };

  // Function to hide context menu
  const hideContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, node: null });
  };

  // useEffect hook to set up the global click listener
  useEffect(() => {
    const handleGlobalClick = (event) => {
      // Close the context menu if it's open
      if (contextMenu.visible) {
        hideContextMenu();
      }
    };

    // Attach the event listener to the window object
    window.addEventListener("click", handleGlobalClick);

    // Clean-up function to remove the event listener
    return () => {
      window.removeEventListener("click", handleGlobalClick);
    };
  }, [contextMenu.visible]); // Dependency array ensures this effect runs when the visibility changes

  const svgRef = useRef();
  let width = 800;
  let height = 800;
  if (typeof window !== "undefined") {
    width = window.innerWidth - 400; // may need to adjust
    height = window.innerHeight - 400; // may need to adjust
  }

  useEffect(() => {
    if (!treeData) return;

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 90, bottom: 30, left: 90 };
    // const innerWidth = width - margin.left - margin.right;
    // const innerHeight = height - margin.top - margin.bottom;

    // Clear any previous SVG content
    svg.selectAll("*").remove();

    // Set up the tree layout
    const treeLayout = d3.tree().size([width, height]);
    const root = d3.hierarchy(treeData, (d) => d.children);

    // Assigns the x and y position for the nodes
    treeLayout(root);

    const g = svg.append("g").attr("transform", "translate(0,50)");

    // const link = g.selectAll('.link')
    // Render the links (edges) of the tree
    const link = g
      .selectAll(".link")
      .data(root.descendants().slice(1))
      .enter()
      .append("path")
      .attr("class", "link")
      .attr(
        "d",
        (d) =>
          `M${d.x},${d.y}C${d.x},${(d.y + d.parent.y) / 2} ${d.parent.x},${
            (d.y + d.parent.y) / 2
          } ${d.parent.x},${d.parent.y}`
      );

    // Render the nodes of the tree as triangles
    const node = g
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .attr("class", "node")
      .style("cursor", "pointer"); 

    // NODE COLOR
    node
      .append("path")
      .attr("d", d3.symbol().type(d3.symbolTriangle).size(500))
      .attr("stroke", "black")
      // .attr('transform', d => `translate(${d.x},${d.y})`)
      .attr("fill", (d) => {
        if (currentStep.pruned && currentStep.pruned.includes(d.data.id)) {
          return "grey";
        }
        if (currentStep.node && currentStep.node.id === d.data.id) {
          return "green"; // Highlight the current node in green
        }
        return d.depth % 2 === 0 ? "DodgerBlue" : "red";
      })
      .attr("stroke-width", 1)
      .attr("transform", (d) =>
        d.depth % 2 === 0 ? "rotate(0)" : "rotate(180)"
      );

    // Add labels to the nodes (if they have values)
    node
      .append("text")
      .attr("dy", 3)
      .attr("y", (d) => (d.children ? -30 : 30))
      .style("text-anchor", "middle")
      .text((d) => d.data.value)
      .text((d) => {
        // Show value only if the node has been evaluated
        let evaluatedIds = [];
        if (currentStep.evaluated) {
          evaluatedIds = Object.keys(currentStep.evaluated);
        }
        return evaluatedIds.includes(String(d.data.id))
          ? currentStep.evaluated[d.data.id]
          : d.data.value;
      });

    // Add right-click event listener
    node.on("contextmenu", (event, d) => {
      event.preventDefault(); // Prevent default context menu

      // Call a function to show the custom context menu
      // Pass the event for positioning and the node data 'd'
      showContextMenu(event, d);
    });

    // Add labels to the nodes
    // node.append('text')
    //   .attr('dy', 3)
    //   .attr('y', d => d.children ? -30 : 30)
    //   .style('text-anchor', 'middle')
    //   .text(d => {
    //     // Show value only if the node has been evaluated
    //     return currentStep.evaluatedNodes.includes(d.data.id) ? d.data.value : '';
    //   });
    //  handle the pruned nodes styling and overlay an 'X'
    // if (currentStep && currentStep.prunedNodes) {
    //   currentStep.prunedNodes.forEach(prunedNodeId => {
    //     node.filter(d => d.data.id === prunedNodeId)
    //       .attr('fill', 'grey')
    //       .append('text')
    //       .text('X')
    //       .attr('x', -5) // Center the X on the node
    //       .attr('y', 5)
    //       .attr('font-size', '10px')
    //       .attr('fill', 'black');
    //   });
    // }
  }, [treeData, currentStep]);

  return (
    <>
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="tree-visualization"
      ></svg>
      {contextMenu.visible && (
        <div
          className="context-menu"
          style={{
            position: "absolute",
            top: contextMenu.y,
            left: contextMenu.x,
          }}
        >
          {/* Menu items here */}
          <ul>
            <li
              onClick={() => {
                handleAddChild(contextMenu.nodeData.data.id);
                hideContextMenu();
              }}
            >
              Add Child
            </li>
            <li
              onClick={() => {
                handleDeleteNode(contextMenu.nodeData.data.id);
                hideContextMenu();
              }}
            >
              Delete Node
            </li>
            {contextMenu.nodeData.data.value !== undefined && (
              <li
                onClick={() => {
                  initiateEditNodeValue(contextMenu.nodeData);
                  hideContextMenu();
                }}
              >
                Edit Value
              </li>
            )}
          </ul>
        </div>
      )}

      <NodeEditModal
        isVisible={isModalVisible}
        value={editingNode ? editingNode.value : ""}
        onSave={handleSaveEdit}
        onCancel={handleCancelEdit}
      />
    </>
  );
};

export default TreeVisualization;
