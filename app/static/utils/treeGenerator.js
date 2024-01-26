'use client';
/*
Utility function to generate a random tree. 
This function will be used in TreeContext to create initial tree data 
and when the user requests a new tree.
*/


let nodeId = 0;

function createNode(depth) {
  if (depth === 0) return { id: nodeId++, value: Math.floor(Math.random() * 100) };

  const node = { id: nodeId++, children: [], isPruned: false};
  const childrenCount = Math.floor(Math.random() * 2) + 2; // 1 to 3 children
  for (let i = 0; i < childrenCount; i++) {
    node.children.push(createNode(depth - 1));
  }
  return node;
}

export function generateRandomTree(depth) {
  // Recursive function to generate a tree
  // with random values and specified depth *! and branching factor !* (not added)
  return createNode(depth);
}

export function generateUniqueID() {
  return nodeId++;
}
// Example usage: generateRandomTree(3)

export const collectValueNodes = (node, nodes = {}) => {
  if (node.value !== undefined) {
    nodes[node.id] = node.value;
  } else if (node.children) {
    node.children.forEach(child => collectValueNodes(child, nodes));
  }
  console.log("nodes: ", nodes)
  return nodes;
};