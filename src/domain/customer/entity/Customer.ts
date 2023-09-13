// Complexidade de negócio
// Domain
//  - entity
//    - customer (regra de negócio)
// -----------------------------------
// Complexidade acidental
// infra
//  - Entity / Model
//    - customer (get, set)
// -----------------------------------
// Entidade Anêmica

import { EntityAbstract } from "../../@shared";
import { NotificationError } from "../../@shared/notification";
import { Address } from "../valueObject";

export class Customer extends EntityAbstract {
  private _name: string;
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  // Auto validar a entidade
  // Devemos ter consistencia na entidade
  validate() {
    if (this._name.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Name is required",
      });
    }
    if (this.id.length === 0) {
      this.notification.addError({
        context: "customer",
        message: "Id is required",
      });
    }
  }

  get name(): string {
    return this._name;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate the customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  setAddress(address: Address) {
    this._address = address;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get address(): Address {
    return this._address;
  }
}
