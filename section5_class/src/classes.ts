class Department {
    // private id: string;
    // name: string;
    private employees: string[] = [];

    constructor(private readonly id: string, public name: string) {
        // this.name = name;
        // this.id = id;
    }
    describe(this: Department) {
        console.log(`Department (${this.id}): ${this.name}`);
    }
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