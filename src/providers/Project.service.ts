import { Dispatch } from 'react';
import { Store } from 'tauri-plugin-store-api';
import { getFsDataPath } from './getFsDataPath';
import { ProjectInterface } from './Projects';

export const PROJECT_STORE_FILE_NAME = 'devy-request-projects.json'; ;

const store = new Store(PROJECT_STORE_FILE_NAME);

const localData = await getFsDataPath(PROJECT_STORE_FILE_NAME);
await store.set(PROJECT_STORE_FILE_NAME, localData);

class ProjectService {
  constructor (
    private setState: Dispatch<ProjectInterface[] | null>
  ) {}

  async refreshProjects () {
    const newData = await this.getProjects();
    this.setState(newData);
  }

  async idProjectGenetator (): Promise<number> {
    const projects = await this.getProjects();
    if (!projects) {
      return 0;
    }
    return Math.max(...projects.map((project) => project.id)) + 1;
  }

  async getProjects (): Promise<ProjectInterface[] | null> {
    const data = await store.get(
      PROJECT_STORE_FILE_NAME
    ) as ProjectInterface[];

    return data;
  }

  async addProjects (data: { name: string; url: string }): Promise<void> {
    if (!store) {
      return;
    }
    const projects = await this.getProjects();

    const newId = await this.idProjectGenetator();

    const newProject: ProjectInterface = {
      id: newId,
      project: data.name,
      url: data.url,
      protocol: 'https',
      'auth-token': '',
      requests: []
    };

    if (!projects) {
      await store.set(PROJECT_STORE_FILE_NAME, [newProject]);
      this.refreshProjects();
      return;
    }

    await store.set(PROJECT_STORE_FILE_NAME, projects.concat(newProject));

    this.refreshProjects();
  }

  async deleteProject (projectId: number): Promise<void> {
    if (!store) {
      return;
    }
    const projects = await this.getProjects();
    if (!projects) {
      return;
    }
    await store.set(
      PROJECT_STORE_FILE_NAME,
      projects.filter((project) => project.id !== projectId)
    );

    this.refreshProjects();
  }

  async updateProject (
    projectId: number,
    data: { name: string; url: string }
  ): Promise<void> {
    if (!store) {
      return;
    }
    const projects = await this.getProjects();
    if (!projects) {
      return;
    }
    const project = projects.find((project) => project.id === projectId);
    if (!project) {
      return;
    }
    project.project = data.name;
    project.url = data.url;
    await store.set(PROJECT_STORE_FILE_NAME, projects);

    this.refreshProjects();
  }

  async getProject (projectId: number): Promise<ProjectInterface | null> {
    if (!store) {
      return null;
    }
    const projects = await this.getProjects();
    if (!projects) {
      return null;
    }
    return projects.find((project) => project.id === projectId) || null;
  }
}

export { ProjectService };
