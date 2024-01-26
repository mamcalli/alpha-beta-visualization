'use client';

import React, { useState } from "react";

const NodeEditModal = ({ isVisible, value, onSave, onCancel }) => {
  const [newValue, setNewValue] = useState(value);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Node Value</h2>
        <input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button onClick={() => onSave(newValue)}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default NodeEditModal;
