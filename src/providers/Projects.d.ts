import { ProjectService } from './Project.service';

export interface RequestInterface {
  method: string;
  url: string;
  'auth-required': boolean;
  body?: any;
}

export interface ProjectInterface {
  id: number;
  project: string;
  url: string;
  protocol: string;
  'auth-token': string;
  requests: RequestInterface[];
}

export interface ProjectContextInterface {
  projects: ProjectInterface[] | null;
  setProjects: (projects: ProjectInterface[]) => void;
  usedProject: ProjectInterface | null;
  setUsedProject: (projects: ProjectInterface) => void;
  changeUsedProject: (projectId:number) => void;
  methods: ProjectService
}
