import { createContext, useContext, useState, useEffect } from 'react';
import { ProjectService } from './Project.service';
import { ProjectContextInterface, ProjectInterface } from './Projects';

const ProjectContext = createContext<ProjectContextInterface>({
  projects: null,
  setProjects: () => {},
  usedProject: null,
  setUsedProject: () => {},
  changeUsedProject: (projectId: number) => {},
  methods: new ProjectService(() => {})
});

export default function ProjectProvider (props: any) {
  const [projects, setStateProjects] = useState<ProjectInterface[] | null>([]);
  const [usedProject, setUsedProject] = useState<ProjectInterface | null>(null);

  const methods = new ProjectService(setStateProjects);

  useEffect(() => {
    methods.getProjects().then((data) => {
      setStateProjects(data as ProjectInterface[]);
    });
  }, []);

  const changeUsedProject = (projectId: number) => {
    methods.getProject(projectId).then((project) => {
      setUsedProject(project);
    });
  };

  const setProjects = async (projects: ProjectInterface[] | null) => {
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        usedProject,
        changeUsedProject,
        setUsedProject,
        methods
      }}
    >
      {props.children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectContext).projects;
export const useUsedProject = () => useContext(ProjectContext).usedProject;
export const useSetUsedProject = () => useContext(ProjectContext).setUsedProject;
export const useChangeUsedProject = () => useContext(ProjectContext).changeUsedProject;
export const useProjectService = () => useContext(ProjectContext).methods;
