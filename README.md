# Alpha-Beta Pruning Visualization

An interactive web application for visualizing how the alpha-beta pruning algorithm evaluates a minimax tree.

[View the live demo](https://mamcalli.github.io/alpha-beta-visualization/)

## Features

- Step through the alpha-beta pruning algorithm
- Track the current alpha and beta values
- Move forward and backward through each step
- Generate random trees with adjustable depth
- Edit, delete, or add nodes using the right-click menu
- See which branches are skipped by pruning

## How to Use

1. Select the desired tree depth.
2. Click **Generate New Tree** to create a tree.
3. Manually adjust the tree by right-clicking a node to edit it, delete it, or add a child.
4. Click **Run Alpha-Beta** to execute the algorithm.
5. Use **Previous** and **Next** to explore each step.


## Running Locally

Clone the repository and install its dependencies:

```bash
git clone https://github.com/mamcalli/alpha-beta-visualization.git
cd alpha-beta-visualization
npm install
npm run dev
