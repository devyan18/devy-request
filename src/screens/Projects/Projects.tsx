import { Project } from '../../components';
import {
  useChangeUsedProject,
  useProjects
} from '../../providers/ProjectProvider';
import styles from './styles/Projects.module.css';

function Projects () {
  const projects = useProjects();
  const changeUsedProject = useChangeUsedProject();

  return (
    <div className={styles.projects}>
      {projects &&
        projects.map((project) => {
          return (
            <Project
              key={project.id}
              project={project}
              handleClick={changeUsedProject}
            />
          );
        })}
    </div>
  );
}

export default Projects;
