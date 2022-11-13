import { createContext, useContext, useState, useEffect } from 'react';
// import projectList from '../projects.json';
import { Store } from 'tauri-plugin-store-api';

export interface RequestInterface {
  method: string;
  url: string;
  'auth-required': boolean;
  body?: any;
}

export interface ProjectInterface {
  id: number;
  project: string;
  url: string;
  protocol: string;
  'auth-token': string;
  requests: RequestInterface[];
}

export interface ProjectContextInterface {
  projects: ProjectInterface[] | null;
  setProjects: (projects: ProjectInterface[]) => void;
  usedProject: ProjectInterface | null;
  setUsedProject: (projects: ProjectInterface) => void;
  changeUsedProject: (project: ProjectInterface | null) => void;
}

const Project = createContext<ProjectContextInterface>({
  projects: null,
  setProjects: () => {},
  usedProject: null,
  setUsedProject: () => {},
  changeUsedProject: (project: ProjectInterface | null) => {}
});

export default function ProjectProvider (props: any) {
  const store = new Store('devy-request-projects.json');
  const loadData = async () => {
    // await store.set('devy-request-projects', projectList);
    return await store.get('devy-request-projects');
  };

  const [projects, setStateProjects] = useState<ProjectInterface[] | null>([]);
  const [usedProject, setUsedProject] = useState<ProjectInterface | null>(null);

  useEffect(() => {
    loadData().then((data) => {
      setStateProjects(data as ProjectInterface[]);
    });
  }, []);

  const changeUsedProject = (project: ProjectInterface | null) => {
    setUsedProject(project);
  };

  const setProjects = async (projects: ProjectInterface[] | null) => {
    await store.set('devy-request-projects', projects);
    setStateProjects(projects);
  };

  return (
    <Project.Provider value={{ projects, setProjects, usedProject, changeUsedProject, setUsedProject }}>
      {props.children}
    </Project.Provider>
  );
}

export const useProjects = () => useContext(Project).projects;
export const useSetProject = () => useContext(Project).setProjects;
export const useUsedProject = () => useContext(Project).usedProject;
export const useSetUsedProject = () => useContext(Project).setUsedProject;
export const useChangeUsedProject = () => useContext(Project).changeUsedProject;
