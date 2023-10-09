// import _ from "lodash";

// console.log(_.shuffle([1, 2, 3]));

// declare const GLOVAL: string;

// console.log(GLOVAL);

import "reflect-metadata";
import { plainToClass } from "class-transformer";
import { Product } from "./product.model";
import { validate } from "class-validator";

const products = [
  { title: "商品１", price: 100 },
  { title: "商品2", price: 200 },
];
// console.log(products);

// const loadedProducts = products.map((elm) => {
//   console.log(elm);
//   return new Product(elm.title, elm.price);
// });

// loadedProducts.forEach((elm) => {
//   console.log(elm.getInfomation());
// });

// const p1 = new Product("商品１", 100);

const loadedProducts = plainToClass(Product, products);
loadedProducts.forEach((elm) => {
  console.log(elm.getInfomation());
});

const newProd = new Product("fdf", 30);
// validate(newProd).then((error) => {
//   if (error.length !== 0) {
//     console.log("validation failed. errors : ", error);
//   } else {
//     newProd.getInfomation();
//   }
// });

const checkValidation = async (newProd: Product) => {
  const result = await validate(newProd);
  if (result.length !== 0) {
    console.log("validation failed errors : ", result);
  } else {
    console.log(newProd.getInfomation());
  }
};
checkValidation(newProd);
