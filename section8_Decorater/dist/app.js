"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(text) {
    console.log("Loggerファクトリー");
    const innerFunc = (constructor) => {
        console.log(text);
        console.log(constructor);
    };
    return innerFunc;
}
function WithTemplete(template, hookId) {
    console.log("withTemplateファクトリー");
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                console.log("templateを表示");
                const hookElement = document.getElementById(hookId);
                if (hookElement) {
                    hookElement.innerHTML = template;
                    hookElement.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = "Max";
        console.log("Personオブジェクトを作成中...");
    }
};
Person = __decorate([
    Logger("ログ出力中-Person"),
    WithTemplete("<h1>デコレートファクトリーの勉強</h1>", "app")
], Person);
const pers = new Person();
console.log(pers);
function Log(target, propertyName) {
    console.log("Propertyデコレータ");
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log("Accessor デコレータ");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log("Methodデコレータ");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log("Parameterデコレータ");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("不正な値です。０以下は設定できません");
        }
    }
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const test1 = new Product("nomu", 100);
function Autobind(target, methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = "クリックしました";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector("button");
button.addEventListener("click", p.showMessage);
const registerdValidators = {};
function Required(target, propName) {
    registerdValidators[target.constructor.name] = Object.assign(Object.assign({}, registerdValidators[target.constructor.name]), { [propName]: ["required"] });
}
function PositiveNumber(target, propName) {
    registerdValidators[target.constructor.name] = Object.assign(Object.assign({}, registerdValidators[target.constructor.name]), { [propName]: ["positive"] });
}
function validate(obj) {
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
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector("form");
courseForm.addEventListener("submit", event => {
    event.preventDefault();
    const titleEl = document.getElementById("title");
    const priceEl = document.getElementById("price");
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        throw new Error("入力が正しくありません");
    }
    console.log(createdCourse);
});
//# sourceMappingURL=app.js.map