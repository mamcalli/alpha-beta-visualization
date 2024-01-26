"use client";

/*
Contains the alpha beta algorithm 
*/
function alphaBeta(node, depth, alpha, beta, maximizingPlayer, reportStep) {
  // Base case: leaf node or depth limit reached
  if (node.value || node.isLeaf) {
    reportStep(node, alpha, beta, "returning value", [], null);
    return node.value;
  }

  if (maximizingPlayer) {
    let value = -Infinity;
    reportStep(node, alpha, beta, "maximizing", [], null);

    for (let child of node.children) {
      value = Math.max(value, alphaBeta(child, depth - 1, alpha, beta, false, reportStep));
      alpha = Math.max(alpha, value);
      reportStep(node, alpha, beta, "updating", [], value);
      if (alpha >= beta) {
        let pruned = [];
        for (let subsequentChild of node.children.slice(node.children.indexOf(child) + 1)) {

          pruned.push(subsequentChild.id);
        }
        reportStep(node, alpha, beta, "pruned", pruned, null);
        break; // Beta cut-off
      }
    }
    return value;
  } else {
    let value = Infinity;
    reportStep(node, alpha, beta, "minimizing", [], []);
    for (let child of node.children) {
      value = Math.min(value, alphaBeta(child, depth - 1, alpha, beta, true, reportStep));
      beta = Math.min(beta, value);
      reportStep(node, alpha, beta, "updating", [], value);
      
      if (beta <= alpha) {
        let pruned = []
        for (let subsequentChild of node.children.slice(node.children.indexOf(child) + 1)) {
          pruned.push(subsequentChild.id);
        }
        reportStep(node, alpha, beta, "pruned", pruned, null);
        // reportStep(node, alpha, beta, "pruned");
        break; // Alpha cut-off
      }
    }
    // node.value = value;
    // reportStep(node, alpha, beta, "updateVal");
    return value;
  }
}

export default alphaBeta;
