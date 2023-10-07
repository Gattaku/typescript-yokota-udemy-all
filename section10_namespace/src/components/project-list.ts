/// <reference path="base-component.ts" />


namespace App {
    // ProjectList Class
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget{
        assignedProject: Project[];
        constructor(private type: "active" | "finished") {
            super("project-list","app",false,`${type}-projects`);
            this.assignedProject = [];
    
            this.configure();
            this.renderContent();
        }
    
        @autobind
        dragOverHandler(event: DragEvent){
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain"){
                event.preventDefault();
                const listEl = this.element.querySelector("ul")!;
                listEl.classList.add("droppable");
            }
    
        }
    
        @autobind
        dropHandler(event: DragEvent){
            const pjtId = event.dataTransfer!.getData("text/plain");
            projectState.moveProject(pjtId,this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished)
        }
        
        @autobind
        dragLeaveHandler(_: DragEvent){
            const listEl = this.element.querySelector("ul")!;
            listEl.classList.remove("droppable");
        }
    
        
    
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("drop", this.dropHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
    
    
    
            projectState.addListener((projects:Project[])=>{ //projectListのインスタンスを作成した際に、この引数のアロー関数自体をprojectstateクラスのListenern配列に登録することで、addProjectメソッドが走るたびにここのアロー関数がよびだされる。
                // console.log("projectListのconstructorです。")
                console.log(projects)
                const relevantProject = projects.filter(prj => {
                    if (this.type === "active") return prj.status === ProjectStatus.Active
                    // console.log("finishedのレンダリング")
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
}