import { writeTextFile } from '@tauri-apps/api/fs';
import { appDataDir, join } from '@tauri-apps/api/path';
import { PROJECT_STORE_FILE_NAME } from './Project.service';
import { ProjectInterface } from './Projects';

const writeData = async (data: ProjectInterface[]) => {
  const appLocalDataDirPath = await appDataDir();
  const fileProjectStorePath = await join(appLocalDataDirPath, 'databases');
  const fileProjectStoreFullPath = await join(fileProjectStorePath, PROJECT_STORE_FILE_NAME);

  await writeTextFile(fileProjectStoreFullPath, JSON.stringify(data));
};
export { writeData };
