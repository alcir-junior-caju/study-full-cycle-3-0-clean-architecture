import { EntityAbstract } from "../../@shared";
import { NotificationError } from "../../@shared/notification";
import { ProductTypeInterface } from "./ProductInterface";

export class OtherProduct extends EntityAbstract implements ProductTypeInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  get price(): number {
    return this._price * 2;
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  validate(): boolean {
    if (!this._id) {
      this.notification.addError({
        context: "product",
        message: "Product id is required",
      });
    }
    if (!this._name) {
      this.notification.addError({
        context: "product",
        message: "Product name is required",
      });
    }
    if (this._price <= 0) {
      this.notification.addError({
        context: "product",
        message: "Product price must be greater than zero",
      });
    }
    return true;
  }
}
