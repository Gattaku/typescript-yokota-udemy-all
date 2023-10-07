enum ProjectStatus {
    Active, Finished
}

//Project type
class Project {
    constructor(
        public id:string,
        public title:string,
        public description:string,
        public manday:number,
        public status: ProjectStatus
        ){}
}



//Project State Managemen
type Listener<T> = (items: T[])=>void;

class State<T> {
    protected listener: Listener<T>[] = [];
    addListener(listenerFn:Listener<T>) {
        // console.log(listenerFn)
        this.listener.push(listenerFn);
    }
}

class ProjectState extends State<Project>{
    
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) return this.instance;
        this.instance  = new ProjectState();
        return this.instance;
    }

 

    addProject(title:string, description:string, manday: number){
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
        this.listener[0](this.projects.slice()); //listnerFnの中には同じアロー関数が入っている。（なぜか元のconstructorが２回走るため）そのため、呼び出しは１回で十分なので、forloopは不要
        // for (const listenerFn of this.listener) {
        //     listenerFn(this.projects.slice());
        // }
    }
} 

const projectState = ProjectState.getInstance();


//validation

// console.log("aaaa")

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}
function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}


//autobind decorator
function autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor;
}

//Component Class
abstract class Component<T extends HTMLElement,U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId:string, hostElementId:string,insertAtStart:boolean, newElementId?:string){
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        if (newElementId){
            this.element.id = newElementId;
        }

        this.attach(insertAtStart);
    }

    abstract configure():void;
    abstract renderContent():void;

    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
    }
}

//Project Item class
class ProjectItem extends Component<HTMLUListElement,HTMLLIElement> {
    private project:Project;
    constructor(hostId:string,project:Project){
        super("single-project",hostId,false,project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }
    configure(){}
    renderContent(){
        this.element.querySelector("h2")!.textContent = this.project.title;
        this.element.querySelector("h3")!.textContent = this.project.manday.toString();
        this.element.querySelector("p")!.textContent = this.project.description;
        
    }
}



// ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
    assignedProject: Project[];
    constructor(private type: "active" | "finished") {
        super("project-list","app",false,`${type}-projects`);
        this.assignedProject = [];

        this.configure();
        this.renderContent();
    }

    configure() {
        projectState.addListener((projects:Project[])=>{ //projectListのインスタンスを作成した際に、この引数のアロー関数自体をprojectstateクラスのListenern配列に登録することで、addProjectメソッドが走るたびにここのアロー関数がよびだされる。
            // console.log("projectListのconstructorです。")
            const relevantProject = projects.filter(prj => {
                if (this.type === "active") return prj.status === ProjectStatus.Active
                return prj.status === ProjectStatus.Finished;
            })
            this.assignedProject = relevantProject;
            this.renderProjects();
        })
    }
    
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector("h2")!.textContent = this.type === "active" ? "実行中プロジェクト" : "完了プロジェクト";
    }

    private renderProjects(){
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML =  "";
        for (const prjItem of this.assignedProject){
            // const listItem = document.createElement("li");
            // listItem.textContent = prjItem.title;
            // listEl.appendChild(listItem);
            //要素をその都度作るやり方ではなく、Obj指向に乗っ取って、要素を作るclassをインスタンス化することでレンダリングさせる。↓↓↓
            new ProjectItem(listEl.id, prjItem); //Component側にattachがあるため、appendchildしなくてもhostタグに勝手にattachしにいく。
        }
    }   
}


// ProjectInput Class
class ProjectInput extends Component<HTMLDivElement,HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    mandayInputElement: HTMLInputElement;

    constructor() {
        super("project-input","app",true,"user-input");
        // this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
        // this.hostElement = document.getElementById("app")! as HTMLDivElement;

        // const importedNode = document.importNode(this.templateElement.content, true);
        // this.element = importedNode.firstElementChild as HTMLFormElement;
        // this.element.id = "user-input";
        this.titleInputElement = this.element.querySelector("#title")! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector("#description")! as HTMLInputElement;
        this.mandayInputElement = this.element.querySelector("#manday")! as HTMLInputElement;
        
        this.configure();
    }
    
    configure() {
        // this.element.addEventListener("submit", this.submitHandler.bind(this));
        this.element.addEventListener("submit", this.submitHandler);
    }
    renderContent(){}
    
    private gatherUserInput(): [string, string, number] | void {
        const enterdTitle = this.titleInputElement.value;
        const enterdDescription = this.descriptionInputElement.value;
        const enterdManday = this.mandayInputElement.value;

        const titleValidatable: Validatable = {
            value: enterdTitle,
            required: true,
        }
        const descriptionValidatable: Validatable = {
            value: enterdDescription,
            required: true,
            minLength: 5,
        }
        const mandayValidatable: Validatable = {
            value: +enterdManday,
            required: true,
            min: 1,
            max: 1000,
        }
        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(mandayValidatable)
        ) {
            alert("入力値が正しくありません。再度入力してください");
            return;
        } else {
            return [enterdTitle, enterdDescription, +enterdManday];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.mandayInputElement.value = "";
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, manday] = userInput;
            projectState.addProject(title,description,manday);
            this.clearInputs();
        }
    }


}

const newPjt = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishPjtList = new ProjectList("finished");