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
    return function (_: Function) {
        console.log("templateを表示");
        const hookElement = document.getElementById(hookId);
        if (hookElement) {
            hookElement.innerHTML = template;
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