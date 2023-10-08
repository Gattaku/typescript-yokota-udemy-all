import { Project, ProjectStatus } from "../models/project";

//Project State Managemen
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listener: Listener<T>[] = [];
  addListener(listenerFn: Listener<T>) {
    // console.log(listenerFn)
    this.listener.push(listenerFn);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) return this.instance;
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, manday: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      manday,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    // console.log(this.listener);
    // console.log(this.projects);
    this.updateListener();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      // console.log(this.projects)
      this.updateListener();
    }
  }

  private updateListener() {
    for (const listenerFn of this.listener) {
      //listnerの中には、active / finished それぞれのアロー関数が入っている
      listenerFn(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();
