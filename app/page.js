'use client';
/*
Index.js will serve as the main container for the application.
It will render TreeVisualization and Sidebar components. 
*/

import React from 'react';
import { TreeProvider } from './static/utils/TreeContext';
import TreeVisualization from './static/components/TreeVisualization';
import Sidebar from './static/components/Sidebar';

export default function Home() {
  return (
    <TreeProvider>
      <main className="app-container">
        <TreeVisualization />
        <Sidebar />
      </main>
    </TreeProvider>
  );
}