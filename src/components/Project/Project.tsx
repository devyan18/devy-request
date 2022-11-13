import { ProjectInterface } from '../../providers/ProjectProvider';
import styles from './styles/Project.module.css';

export interface Props {
  handleClick: (project: ProjectInterface | null) => void;
  project: ProjectInterface;
}

function Project (props: Props) {
  return (
    <div className={styles.project}>
      <p className={styles.projectName}>{props.project.project}</p>
      <p className={styles.projectUrl}>{props.project.protocol}://{props.project.url}</p>
      <button onClick={() => props.handleClick(props.project)}>Ver Projecto</button>
    </div>
  );
}

export default Project;
