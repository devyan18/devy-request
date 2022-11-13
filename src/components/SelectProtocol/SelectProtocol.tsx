import type { ChangeEvent } from 'react';
import {
  useSetUsedProject,
  useUsedProject
} from '../../providers/ProjectProvider';
import styles from './styles/SelectProtocol.module.css';

function SelectProtocol () {
  const setUsedProject = useSetUsedProject();
  const usedProject = useUsedProject();

  const handleChangeSelectProject = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    if (usedProject) {
      setUsedProject({ ...usedProject, protocol: event.currentTarget.value });
    }
  };

  return (
    <select
      className={styles.selectprotocol}
      value={usedProject?.protocol}
      onChange={handleChangeSelectProject}
    >
      <option value="http">http</option>
      <option value="https">https</option>
    </select>
  );
}

export default SelectProtocol;
