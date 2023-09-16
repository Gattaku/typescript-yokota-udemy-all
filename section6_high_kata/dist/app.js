"use strict";
var _a;
const e1 = {
    name: "Max",
    privileges: ["create-backend"],
    startDate: new Date(),
};
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
const addResult = add(1, "2");
function printEmployeeInformatin(emp) {
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
    loadCargo(amount) {
        console.log("荷物を運搬中..." + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
const useVehicle = (vehicle) => {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
};
useVehicle(v1);
useVehicle(v2);
const moveAnimal = (animal) => {
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
};
moveAnimal({ type: "horse", runningSpeed: 10 });
// const userInput = <HTMLInputElement>document.getElementById("user-input")!;
const userInput = document.getElementById("user-input");
userInput.value = "型キャストの勉強";
const errorBag = {
    email: "正しいメールアドレスではありません",
    username: "ユーザー名に記号を含めることはできません",
};
const fetchedUserData = {
    id: "u1",
    name: "user1",
    job: {
        title: "developer",
        description: "TypeScript",
    }
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
//# sourceMappingURL=app.js.map