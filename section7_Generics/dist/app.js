"use strict";
const names = ["max", "Manuel"];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("終わりました。");
    }, 2000);
});
promise.then((data) => {
    data.split(" ");
});
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "max" }, { age: 30 });
mergedObj.age;
function countAndDescribe(element) {
    let descriptionText = `値が入っていません。`;
    if (element.length > 0)
        descriptionText = `値は${element.length}個です。`;
    return [element, descriptionText];
}
console.log(countAndDescribe("お疲れ様です。Ogataさん"));
console.log(countAndDescribe([1, 2, 3, 4]));
console.log(countAndDescribe([]));
console.log(countAndDescribe({ length: 10, name: "Ogata" }));
function extractAndConvert(obj, key) {
    return `Value  : ${obj[key]}`;
}
console.log(extractAndConvert({ name: "Ogata", age: 34, ID: 123 }, "age"));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItem() {
        return [...this.data];
    }
}
const data1 = new DataStorage();
data1.addItem("data1");
data1.addItem("data2");
data1.addItem("data3");
data1.addItem("data4");
data1.removeItem("data3");
console.log(data1.getItem());
//pushを禁止する
const user = ["Max", "Manuel"];
// user.push("Ogata");
//# sourceMappingURL=app.js.map