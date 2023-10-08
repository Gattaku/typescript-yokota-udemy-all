import { Project, ProjectStatus } from "../models/project.js";
class State {
    constructor() {
        this.listener = [];
    }
    addListener(listenerFn) {
        // console.log(listenerFn)
        this.listener.push(listenerFn);
    }
}
export class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new ProjectState();
        return this.instance;
    }
    addProject(title, description, manday) {
        const newProject = new Project(Math.random().toString(), title, description, manday, ProjectStatus.Active);
        this.projects.push(newProject);
        // console.log(this.listener);
        // console.log(this.projects);
        this.updateListener();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((prj) => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            // console.log(this.projects)
            this.updateListener();
        }
    }
    updateListener() {
        for (const listenerFn of this.listener) {
            //listnerの中には、active / finished それぞれのアロー関数が入っている
            listenerFn(this.projects.slice());
        }
    }
}
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map