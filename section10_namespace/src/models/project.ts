namespace App {
    // status type
    export enum ProjectStatus {
        Active, Finished
    }
    
    //Project type
    export class Project {
        constructor(
            public id:string,
            public title:string,
            public description:string,
            public manday:number,
            public status: ProjectStatus
            ){}
    }
}