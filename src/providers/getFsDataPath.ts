import { readTextFile } from '@tauri-apps/api/fs';
import { appDataDir, join } from '@tauri-apps/api/path';

export const getFsDataPath = async (path: string) => {
  const appLocalDataDirPath = await appDataDir();
  const fileProjectStorePath = await join(appLocalDataDirPath, 'databases');
  const fileProjectStorePathWithFile = await join(
    fileProjectStorePath,
    path
  );
  const fileProjectStoreData = await readTextFile(
    fileProjectStorePathWithFile
  );
  return JSON.parse(fileProjectStoreData);
};
