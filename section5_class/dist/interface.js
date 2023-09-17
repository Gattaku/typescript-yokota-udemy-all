"use strict";
class Person {
    constructor(n, age) {
        this.name = n;
        this.age = age;
    }
    greet(phrase) {
        console.log(`${phrase} ${this.name}. My age is ${this.age}`);
    }
}
let user1;
user1 = new Person("Max", 30);
user1.greet("Hello I am");
console.log(user1);
let add;
add = (n1, n2) => {
    return n1 + n2;
};
console.log(add(5, 2));
//# sourceMappingURL=interface.js.map