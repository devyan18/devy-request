import styles from './styles/CreateProject.module.css';
export interface CreateProjectInterface {}

function CreateProject (props: CreateProjectInterface) {
  return (
    <div className={styles.createProject}>
      <h1>Create Project</h1>
    </div>
  );
}

export default CreateProject;
