import { Notification } from "../notification";

export abstract class EntityAbstract {
  protected _id: string;
  protected notification: Notification;

  constructor() {
    this.notification = new Notification();
  }

  get id(): string {
    return this._id;
  }
}
