import { RequestInterface } from '../../providers/ProjectProvider';
import { SelectProtocol } from '../SelectProtocol';
import styles from './styles/Request.module.css';

interface RequestProps {
  project: string;
  protocol: string;
  request: RequestInterface;
}

function Request (props: RequestProps) {
  return (
    <div className={styles.request}>
      <p className={styles.method}>{props.request.method}</p>
      <p className={styles.url}>
        <span><SelectProtocol />://</span>
        <span className={styles.projectTag}>@{props.project}</span>
        <span className={styles.projectUrl}>{props.request.url}</span>
      </p>
    </div>
  );
}

export default Request;
