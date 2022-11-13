import { ProjectInterface } from '../../providers/Projects';
import styles from './styles/Project.module.css';

export interface Props {
  handleClick: (projectId: number) => void;
  project: ProjectInterface;
}

function Project (props: Props) {
  return (
    <div className={styles.project}>
      <p className={styles.projectName}>{props.project.project}</p>
      <p className={styles.projectUrl}>{props.project.protocol}://{props.project.url}</p>
      <button onClick={() => props.handleClick(props.project.id)}>Ver Projecto</button>
    </div>
  );
}

export default Project;
