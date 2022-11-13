import { useId } from 'react';
import { Link } from 'react-router-dom';
import { Request } from '../../components';
import { useChangeUsedProject, useUsedProject } from '../../providers/ProjectProvider';
import styles from './styles/Requests.module.css';
export interface RequestsInterface {}

function Requests (props: RequestsInterface) {
  const project = useUsedProject();

  const changeUsedProject = useChangeUsedProject();

  const handleClickback = () => {
    changeUsedProject(null);
  };

  return (
    <div className={styles.requests}>
      <Link to="create">ir a crear</Link>
      <p className={styles.back} onClick={handleClickback}>@{project?.project}</p>
      {project &&
        project.requests.map((request) => (
          <Request key={useId()} request={request} project={project.project} protocol={project.protocol} />
        ))}
    </div>
  );
}

export default Requests;
