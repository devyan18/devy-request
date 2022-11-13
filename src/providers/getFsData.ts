import { createDir, exists, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { appDataDir, join } from '@tauri-apps/api/path';
import { PROJECT_STORE_FILE_NAME } from './Project.service';
import projectList from '../projects.json';
import { ProjectInterface } from './Projects';

const getData = async () => {
  const appLocalDataDirPath = await appDataDir();
  const fileProjectStorePath = await join(appLocalDataDirPath, 'databases');

  const fileProjectStoreExists = await exists(fileProjectStorePath);
  if (!fileProjectStoreExists === true) {
    await createDir(fileProjectStorePath);
  }

  const fileProjectStoreFullPath = await join(fileProjectStorePath, PROJECT_STORE_FILE_NAME);

  if (await exists(fileProjectStoreFullPath)) {
    const contents = await readTextFile(fileProjectStoreFullPath);
    return JSON.parse(contents) as ProjectInterface[];
  } else {
    await writeTextFile(fileProjectStoreFullPath, JSON.stringify(projectList));
    const contents = await readTextFile(fileProjectStoreFullPath);
    return JSON.parse(contents) as ProjectInterface[];
  }
};

export { getData };
