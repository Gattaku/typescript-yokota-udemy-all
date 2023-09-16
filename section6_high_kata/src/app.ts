type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: "Max",
    privileges: ["create-backend"],
    startDate: new Date(),
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;


function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
const addResult = add(1, "2");

type UnknownEmployee = Admin | Employee;

function printEmployeeInformatin(emp: UnknownEmployee) {
    console.log(emp.name);
    if ("privileges" in emp) {
        console.log("Privileges: " + emp.privileges);
    }
    if ("startDate" in emp) {
        console.log("StartDate: " + emp.startDate);
    }
}

printEmployeeInformatin(e1);
printEmployeeInformatin({ name: "Ogata", startDate: new Date() });

class Car {
    drive() {
        console.log("車を運転中...");
    }
}
class Truck {
    drive() {
        console.log("トラックを運転中...");
    }
    loadCargo(amount: number) {
        console.log("荷物を運搬中..." + amount);
    }
}

type Vehecle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehecle) => {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
    type: "bird";
    flyingSpeed: number;
}

interface Horse {
    type: "horse";
    runningSpeed: number;
}

type Animal = Bird | Horse;

const moveAnimal = (animal: Animal) => {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
        default:
            break;
    }
    console.log(`移動速度: ${speed}`);

}

moveAnimal({ type: "horse", runningSpeed: 10 });


// const userInput = <HTMLInputElement>document.getElementById("user-input")!;
const userInput = document.getElementById("user-input")! as HTMLInputElement;
userInput.value = "型キャストの勉強";

// const userInput = document.getElementById("user-input");
// if (userInput) {
//     (userInput as HTMLInputElement).value = "型キャストの勉強";
// }

interface ErrorContainer {
    //プロパティ名や、プロパティの数を事前に知っておく必要はない。ー＞index型という
    [prop: string]: string;
}
const errorBag: ErrorContainer = {
    email: "正しいメールアドレスではありません",
    username: "ユーザー名に記号を含めることはできません",
}


const fetchedUserData = {
    id: "u1",
    name: "user1",
    job: {
        title: "developer",
        description: "TypeScript",
    }
}
console.log(fetchedUserData?.job?.title);

