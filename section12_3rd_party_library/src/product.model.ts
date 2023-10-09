import { IsNotEmpty, IsNumber, IsPositive, Length } from "class-validator";

export class Product {
  @Length(3, 10)
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsPositive()
  price: number;

  constructor(t: string, s: number) {
    this.title = t;
    this.price = s;
  }

  getInfomation() {
    return [this.title, `${this.price}円`];
  }
}
