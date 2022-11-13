import React from 'react';
import ReactDOM from 'react-dom/client';
import ProjectProvider from './providers/ProjectProvider';
import Router from './Router';
import './style.css';

const element = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(element).render(
  <React.StrictMode>
    <ProjectProvider>
      <Router />
    </ProjectProvider>
  </React.StrictMode>
);
