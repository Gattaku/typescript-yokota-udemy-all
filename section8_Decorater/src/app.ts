//test company-account-push

function Logger(text: string) {
    console.log("Loggerファクトリー");
    const innerFunc = (constructor: Function) => {
        console.log(text);
        console.log(constructor);
    }
    return innerFunc;
}

function WithTemplete(template: string, hookId: string) {
    console.log("withTemplateファクトリー");
    return function <T extends { new(...arg: any[]): { name: string } }>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log("templateを表示");
                const hookElement = document.getElementById(hookId);
                if (hookElement) {
                    hookElement.innerHTML = template;
                    hookElement.querySelector("h1")!.textContent = this.name;
                }
            }
        }
    }
}

@Logger("ログ出力中-Person")
@WithTemplete("<h1>デコレートファクトリーの勉強</h1>", "app")
class Person {
    name = "Max";

    constructor() {
        console.log("Personオブジェクトを作成中...")
    }
}

const pers = new Person();
console.log(pers);

function Log(target: any, propertyName: string | Symbol) {
    console.log("Propertyデコレータ");
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: TypedPropertyDescriptor<number>) {
    console.log("Accessor デコレータ");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: TypedPropertyDescriptor<(tax: number) => number>) {
    console.log("Methodデコレータ");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log("Parameterデコレータ");
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Log
    title: string;
    _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error("不正な値です。０以下は設定できません");
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

const test1 = new Product("nomu", 100);

function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor
}

class Printer {
    message = "クリックしました";

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);



interface ValidatorConfig {
    [prop: string]: {
        [validatableProp: string]: string[] //["required", "positive"]
    }
}

const registerdValidators: ValidatorConfig = {

}

function Required(target: any, propName: string) {
    registerdValidators[target.constructor.name] = {
        ...registerdValidators[target.constructor.name],
        [propName]: ["required"],
    }
}

function PositiveNumber(target: any, propName: string) {
    registerdValidators[target.constructor.name] = {
        ...registerdValidators[target.constructor.name],
        [propName]: ["positive"],
    }
}

function validate(obj: any) {
    const objValidatorConfig = registerdValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case "require":
                    isValid = isValid && !!obj[prop];
                    break;
                case "positive":
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;

}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", event => {
    event.preventDefault();
    const titleEl = document.getElementById("title") as HTMLInputElement;
    const priceEl = document.getElementById("price") as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    if (!validate(createdCourse)) {
        throw new Error("入力が正しくありません");
    }
    console.log(createdCourse);
})