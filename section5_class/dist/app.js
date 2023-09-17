"use strict";
class Department {
    static createEmployee(name) {
        return { name: name };
    }
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // private id: string;
        // name: string;
        this.employees = [];
        // this.name = name;
        // this.id = id;
    }
    //  {
    //     console.log(`Department (${this.id}): ${this.name}`);
    // }
    addEmployee(employee) {
        // this.id = "d2";
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
    }
    checkAdmin() {
        console.log(this.admins);
    }
    describe() {
        console.log(`Department: ${this.id} , ${this.name} `);
    }
}
class Accounting extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[0];
    }
    describe() {
        console.log(`Department: ${this.id} , ${this.name} `);
    }
    get mostRecentReport() {
        if (this.lastReport)
            return this.lastReport;
        throw new Error("レポートが見つかりません");
    }
    set mostRecentReport(value) {
        if (!value)
            throw new Error("正しい値を設定して下さい");
        this.addReport(value);
    }
    addReport(value) {
        this.reports.push(value);
        this.lastReport = value;
    }
    printReports() {
        console.log(this.reports);
    }
    printEmployee() {
        console.log(this.employees);
    }
    addEmployee(name) {
        if (name === "Max")
            return;
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
const accounting = new Accounting("d2", []);
accounting.describe();
//# sourceMappingURL=app.js.map