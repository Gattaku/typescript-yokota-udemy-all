interface Named {
    name: string;
    outputName?: string;
}

interface Greetable extends Named {
    greet(phrase: string): void;
}
interface AgeManage {
    age: number;
}

class Person implements Greetable, AgeManage {
    name: string;
    age: number;
    constructor(n: string, age: number) {
        this.name = n;
        this.age = age;
    }
    greet(phrase: string) {
        console.log(`${phrase} ${this.name}. My age is ${this.age}`);
    }
}

let user1: Greetable;

user1 = new Person("Max", 30);
user1.greet("Hello I am");
console.log(user1);


// type AddFn = (n1: number, n2: number) => number;
interface AddFn {
    (n1: number, n2: number): number;
}

let add: AddFn;
add = (n1, n2) => {
    return n1 + n2;
}

console.log(add(5, 2));