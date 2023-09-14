import { ValidatorInterface } from "../../@shared";
import { Customer } from "../entity";
import { CustomerYupValidator } from "../validator/CustomerYupValidator";

export class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator();
  }
}
