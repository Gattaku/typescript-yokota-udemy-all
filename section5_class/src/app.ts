abstract class Department {
    // private id: string;
    // name: string;
    protected employees: string[] = [];

    static createEmployee(name: string) {
        return { name: name };
    }

    constructor(protected readonly id: string, public name: string) {
        // this.name = name;
        // this.id = id;
    }
    abstract describe(this: Department): void;
    //  {
    //     console.log(`Department (${this.id}): ${this.name}`);
    // }
    addEmployee(employee: string) {
        // this.id = "d2";
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }

}

class ITDepartment extends Department {
    admins: string[];
    constructor(id: string, admins: string[]) {
        super(id, "IT");
        this.admins = admins
    }
    checkAdmin() {
        console.log(this.admins);
    }
    describe() {
        console.log(`Department: ${this.id} , ${this.name} `)
    }
}

class Accounting extends Department {
    private lastReport: string;
    constructor(id: string, private reports: string[]) {
        super(id, "Accounting");
        this.lastReport = reports[0]
    }
    describe() {
        console.log(`Department: ${this.id} , ${this.name} `)
    }
    get mostRecentReport() {
        if (this.lastReport) return this.lastReport;
        throw new Error("レポートが見つかりません");
    }
    set mostRecentReport(value: string) {
        if (!value) throw new Error("正しい値を設定して下さい");
        this.addReport(value);
    }
    addReport(value: string) {
        this.reports.push(value);
        this.lastReport = value;
    }
    printReports() {
        console.log(this.reports);
    }
    printEmployee() {
        console.log(this.employees);
    }
    addEmployee(name: string) {
        if (name === "Max") return;
        this.employees.push(name);
    }
}


// const accounting = new Department("d1", "Accounting");
const itDepartment = new ITDepartment("d1", ["nomu-san"]);
itDepartment.addEmployee("max");
itDepartment.addEmployee("Ricardo");
// itDepartment.employees[2] = "aaa";
console.log(itDepartment);
itDepartment.printEmployeeInformation();
itDepartment.describe();
itDepartment.checkAdmin();

const employee1 = Department.createEmployee("Max");
console.log(employee1);

const accounting = new Accounting("d2", [])
accounting.describe();