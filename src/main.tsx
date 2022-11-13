import React from 'react';
import ReactDOM from 'react-dom/client';
import ProjectProvider from './providers/ProjectProvider';
import Router from './Router';
import './style.css';
import { getData } from './providers/getFsData';

const element = document.getElementById('root') as HTMLElement;

getData();

ReactDOM.createRoot(element).render(
  <React.StrictMode>
    <ProjectProvider>
      <Router />
    </ProjectProvider>
  </React.StrictMode>
);
